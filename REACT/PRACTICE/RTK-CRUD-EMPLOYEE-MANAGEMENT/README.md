# 👨‍💼 Employee Management System — Redux Toolkit + Async Thunk

A CRUD-based Employee Management System built with **React** and **Redux Toolkit**.

This project demonstrates how to manage **asynchronous CRUD operations** using `createAsyncThunk`, including:

- ➕ Create Employee
- 📖 Read Employees
- ✏️ Update Employee
- 🗑️ Delete Employee
- ⏳ Loading States
- ❌ Error Handling
- 🔄 Redux State Updates
- 🌐 API Integration

---

## 🛠️ Tech Stack

- React
- Redux Toolkit
- React Redux
- `createAsyncThunk`
- REST API
- JavaScript
- CSS / Tailwind CSS

---

const initialState = {
  employees: [],
  loading: false,
  error: null,
};