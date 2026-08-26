# ✍️ Appwrite — Revision Notes

## React + Appwrite Authentication + TablesDB CRUD

## 📄 PAGE 1 — Appwrite Setup & Configuration

## ⭐ Appwrite = Backend-as-a-Service

```js
React App
    │
    ↓
 Appwrite
 ┌───────────────┐
 │ Authentication│
 │ Database      │
 │ Storage       │
 └───────────────┘
 ```

## 🔧 Client Configuration

```js
import { Client, Account, TablesDB } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
```

## 🧠 Remember

```js
Client
  ↓
Connect React → Appwrite

Account
  ↓
Authentication

TablesDB
  ↓
Database / Tables / Rows
```

## Environment Variables

```js
VITE_APPWRITE_ENDPOINT
VITE_APPWRITE_PROJECT_ID
VITE_APPWRITE_DB_ID
VITE_APPWRITE_TABLE_ID
```

## ⭐ Keep Appwrite configuration separate from components

## 📄 PAGE 2 — Authentication

## 🔐 REGISTER

## Flow

```js
User enters
Name + Email + Password
        ↓
account.create()
        ↓
User Created
        ↓
createEmailPasswordSession()
        ↓
User Logged In
        ↓
Dashboard
```

## Create User

```js
await account.create({
  userId: ID.unique(),
  email,
  password,
  name,
});
```

## Login immediately

```js
await account.createEmailPasswordSession({
  email,
  password,
});
```

## ⭐ Golden Rule

- Create Account ≠ Create Session

- account.create() → creates user

- createEmailPasswordSession() → logs user in

## 🔑 LOGIN

```js
await account.createEmailPasswordSession({
  email: email.trim(),
  password,
});
```

## Success:

```js
navigate("/dashboard");
```

## Failure

```js
catch (err) {
   setError(err.message);
}
```

## Login Flow

```js
Email + Password
       ↓
Appwrite
   ┌───┴────┐
   ↓        ↓
Success   Failure
   ↓        ↓
Session   Error
   ↓
Dashboard
```

## 📄 PAGE 3 — Session & Protected Dashboard

## 👤 account.get()

```js
const currentUser = await account.get();
```

## Meaning:

- "Who is currently logged in?"

- It returns information such as:

```js
user.$id
user.name
user.email
```

## Protected Dashboard

```js
Dashboard loads
      ↓
account.get()
   ┌──┴──┐
   ↓     ↓
Success Failed
   ↓     ↓
Show UI  /login
```

## Basic idea

```js
try {
  const currentUser = await account.get();

  setUser(currentUser);

} catch {
  navigate("/login");
}
```

## ⭐ Mental Rule

```js
create()      → CREATE USER
createSession → LOGIN
account.get() → WHO AM I?
deleteSession → LOGOUT
```

## 🚪 LOGOUT

```js
await account.deleteSession({
  sessionId: "current",
});

navigate("/login");
```

## Complete Authentication Flow

```js
REGISTER
   ↓
USER CREATED
   ↓
LOGIN
   ↓
SESSION
   ↓
account.get()
   ↓
DASHBOARD
   ↓
LOGOUT
   ↓
SESSION REMOVED
   ↓
LOGIN
```

## 📄 PAGE 4 — TablesDB CRUD

## 🗄️ Database Mental Model

```js
Database
   ↓
Table
   ↓
Rows
   ↓
Data
```

## Your project

```js
Database: tododb
       ↓
Table: todos
       ↓
Rows
 ├── email
 └── todo
```

## 👀 READ — listRows()

```js
const response = await tablesDB.listRows({
  databaseId: DB_ID,
  tableId: TABLE_ID,

  queries: [
    Query.equal("email", currentUser.email),
    Query.orderDesc("$createdAt"),
  ],
});

setTodos(response.rows);
```

## Important

```js
listRows()
    ↓
GET rows
    ↓
Query filters user's data
```

## Query.equal()

```js
Query.equal("email", currentUser.email)
```

## Means

## Give me rows where email matches this user's email

## Query.orderDesc()

```js
Query.orderDesc("$createdAt")
```

## Means

- Newest rows first.

## ➕ CREATE — createRow()

```js
const response = await tablesDB.createRow({
  databaseId: DB_ID,
  tableId: TABLE_ID,
  rowId: ID.unique(),

  data: {
    email: user.email,
    todo: todo.trim(),
  },
});
```

## Flow

```js
Input
 ↓
createRow()
 ↓
Appwrite Table
 ↓
New Row
 ↓
Update React State
```

```js
setTodos((prev) => [response, ...prev]);
```

## ⭐ Important: Appwrite creates the data; React state updates the UI immediately.

## 📄 PAGE 5 — UPDATE + DELETE + Complete CRUD

## ✏️ UPDATE — updateRow()

```js
const response = await tablesDB.updateRow({
  databaseId: DB_ID,
  tableId: TABLE_ID,
  rowId: rowId,

  data: {
    todo: newText.trim(),
  },
});
```

## Flow

```js
Existing Row
     ↓
rowId
     ↓
updateRow()
     ↓
Modified Row
```

## Then update React state:

```js
setTodos((prev) =>
  prev.map((item) =>
    item.$id === rowId
      ? response
      : item
  )
);
```

## 🧠 Why .map()?

```js
Every item
   ↓
Is this the edited ID?
   ↓
YES → replace with response
NO  → keep item
```

## 🗑️ DELETE — deleteRow()

```js
await tablesDB.deleteRow({
  databaseId: DB_ID,
  tableId: TABLE_ID,
  rowId: rowId,
});
```

## Then remove it from React state:

```js
setTodos((prev) =>
  prev.filter((item) => item.$id !== rowId)
);
```

## 🧠 Why .filter()?

```js
All Todos
   ↓
Remove matching $id
   ↓
Remaining Todos
```

## ⭐ FINAL CRUD CHEAT SHEET

## This is probably the most important part to memorize:


| Operation | TablesDB Method | Purpose    |
| --------- | --------------- | ---------- |
| CREATE    | `createRow()`   | Add row    |
| READ      | `listRows()`    | Get rows   |
| UPDATE    | `updateRow()`   | Modify row |
| DELETE    | `deleteRow()`   | Remove row |

```js
                 TablesDB
                    │
        ┌───────────┼───────────┐
        ↓           ↓           ↓
      CREATE       READ       UPDATE
   createRow()   listRows()  updateRow()
                                │
                                ↓
                             DELETE
                           deleteRow()
```

## 🧠 PAGE 6 — React ↔ Appwrite Responsibility

## This is worth remembering because it prevents confusion.

```js
             REACT
              │
     ┌────────┼─────────┐
     ↓        ↓         ↓
    UI      State     Routing
     │        │         │
     └────────┼─────────┘
              ↓
          APPWRITE
              │
     ┌────────┴────────┐
     ↓                 ↓
 Authentication      Database
     │                 │
 account.create()   createRow()
 createSession()   listRows()
 account.get()     updateRow()
 deleteSession()   deleteRow()
 ```

### React handles

- Form inputs
- useState
- Loading state
- Error display
- Rendering
- Navigation

## Appwrite handles:

- User accounts 

- Authentication sessions

- Database persistence

- Tables and rows

## ⭐ YOUR APPWRITE MENTAL MODEL

## Don't try to remember the entire Dashboard component

## Remember this

```js
              APPWRITE
                  │
       ┌──────────┴──────────┐
       │                     │
   ACCOUNT                TABLESDB
       │                     │
       │                     │
   Register              CREATE
   Login                 READ
   Session               UPDATE
   Current User          DELETE
   Logout
```

### Authentication

```js
account.create()
```

↓

### Create user

```js
account.createEmailPasswordSession()
```

↓

## Login / create session

```js
account.get()
```
↓

### Get current user

```js
account.deleteSession({
  sessionId: "current"
})
```

↓

### Logout

### Database

```js
tablesDB.createRow()
tablesDB.listRows()
tablesDB.updateRow()
tablesDB.deleteRow()
```

↓

### CRUD

