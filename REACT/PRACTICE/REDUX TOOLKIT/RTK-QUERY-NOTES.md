# 📌 Redux Toolkit Query (RTK Query)

## 1. What is RTK Query?

- RTK Query is a data-fetching and caching tool included in the Redux Toolkit ecosystem.

It helps manage:

- API requests
- Loading states
- Errors
- Server data
- Caching
- Refetching

## Memory Trick

```js
RTK Query
    ↓
Fetch + Cache
    ↓
Server Data
```

## 2. Why RTK Query?

- With createAsyncThunk, you manually manage:

```js
Thunk
 ↓
pending
 ↓
fulfilled
 ↓
rejected
 ↓
loading / error / data
```

## With RTK Query:

```js
API Endpoint
     ↓
RTK Query
     ↓
Data + Loading + Error
     ↓
Component
```

- It removes much of the repetitive API-fetching code.

## 3. Create an API Slice

```js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
```

## Important

```js
createApi()
    ↓
Create API Slice

fetchBaseQuery()
    ↓
Configure HTTP requests

builder.query()
    ↓
GET/read data

useGetUsersQuery()
    ↓
Use API in Component
```

## 4. Add API Slice to Store

```js
import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./userApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
```

## Remember

### RTK Query needs:

```js
reducer
+
middleware
```

## 5. Use in Component

```js
import { useGetUsersQuery } from "./userApi";

const Users = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useGetUsersQuery();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading users</p>;

  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

## 6. Query vs Mutation

### Query

- Used for reading/fetching data.

```js
builder.query({
  query: () => "/users",
});
```

### Memory:

```js
Query
  ↓
GET / READ
```

## Mutation

- Used for creating/updating/deleting data.

```js
builder.mutation({
  query: (user) => ({
    url: "/users",
    method: "POST",
    body: user,
  }),
});
```

## Memory:

```js
Mutation
   ↓
CREATE
UPDATE
DELETE
```

## 7. createAsyncThunk vs RTK Query

| `createAsyncThunk`                     | RTK Query                       |
| -------------------------------------- | ------------------------------- |
| General async logic                    | API/data fetching               |
| More manual code                       | Less boilerplate                |
| You manage loading/error/data          | RTK Query provides them         |
| You manage caching yourself            | Built-in caching                |
| Flexible for arbitrary async workflows | Specialized for server/API data |

## Simple Memory Trick

```js
createAsyncThunk
       ↓
"Run this async logic"

RTK Query
       ↓
"Fetch and manage this API data"
```

## ⭐ 2-Minute Revision

```js
RTK QUERY
    ↓
API DATA FETCHING + CACHING
```

```js
createApi()
     ↓
API Slice

fetchBaseQuery()
     ↓
HTTP Requests

builder.query()
     ↓
GET / READ

builder.mutation()
     ↓
CREATE / UPDATE / DELETE

useGetUsersQuery()
     ↓
Component
```

## Final Memory Trick

```js
createAsyncThunk
      ↓
Manual Async Logic


RTK Query
      ↓
API + Cache + Loading + Error
```
