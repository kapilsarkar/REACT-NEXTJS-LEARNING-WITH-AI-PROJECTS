# 📌 NewUserCard.jsx — Supabase Notes

## 💡 Purpose

## NewUserCard.jsx displays one database record and provides:

- ✏️ Edit

- 🗑️ Delete

- The important Supabase concept here is DELETE.

## 1️⃣ Props

```js
const NewUserCard = ({ user, onDelete }) => {
```

- user → one record fetched from the newuser table.

- onDelete → callback function received from Home.jsx.

## 2️⃣ DELETE Operation

```js
const { error } = await supabase
  .from("newuser")
  .delete()
  .eq("id", user.id);
```

## Breakdown

```js
.from("newuser")
      ↓
Select table

.delete()
      ↓
Delete operation

.eq("id", user.id)
      ↓
Delete only the matching row
```

## Important API

```js
supabase
  .from("table")
  .delete()
  .eq("column", value);
```

## Equivalent SQL idea:

```js
DELETE FROM newuser
WHERE id = user.id;
```

## 3️⃣ Error Handling

```js
if (error) {
  console.log(error);
}
```

## Supabase commonly returns:

```js
{ data, error }
```

## For this DELETE operation, we only need error because we aren't using returned data.

```js
const { error } = await ...
```

## 4️⃣ Updating React State After Delete

- If deletion succeeds:

```js
if (onDelete) {
  onDelete(user.id);
}
```

## Why?

- Supabase deletes the database record, but React's existing state doesn't automatically know that.

## So

```js
Delete from Database
        ↓
onDelete(user.id)
        ↓
Home.jsx updates state
        ↓
Card disappears from UI
```

## Home.jsx:

```js
const handleDelete = (id) => {
  setNewUser((prevNewUser) =>
    prevNewUser.filter((item) => item.id !== id)
  );
};
```

## 5️⃣ Edit Button

```js
<Link to={`/${user.id}`}>
  Edit
</Link>
```

- The user's id is placed into the URL.

- Example:

```js
/user id → 15
       ↓
/15
       ↓
Update.jsx
```

## This connects with your /:id route in App.jsx.

## 🧠 Complete Flow

```js
Home.jsx
   ↓
Pass user + onDelete
   ↓
NewUserCard.jsx
   ↓
User clicks Delete
   ↓
.from("newuser")
.delete()
.eq("id", user.id)
   ↓
Supabase deletes database row
   ↓
onDelete(user.id)
   ↓
Home.jsx updates React state
   ↓
Card disappears
```

## ⭐ Key Supabase Concepts From This Component

| Concept       | API                  |
| ------------- | -------------------- |
| Select table  | `.from("newuser")`   |
| Delete record | `.delete()`          |
| Filter record | `.eq("id", user.id)` |
| Handle error  | `{ error }`          |
| Sync UI       | `onDelete()`         |

## 🔑 One-Line Revision

- .delete().eq() deletes the matching database row; after successful deletion, onDelete() updates React state so the UI reflects the change.

## 🔥 CRUD So Far

```js
CREATE  → .insert()
READ    → .select()
UPDATE  → .update()
DELETE  → .delete()

FILTER  → .eq()
SORT    → .order()
```
