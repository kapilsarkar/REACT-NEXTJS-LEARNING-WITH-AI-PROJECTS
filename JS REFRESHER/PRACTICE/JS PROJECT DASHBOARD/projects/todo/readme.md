# 📝 Vanilla JavaScript Todo App

A simple and clean Todo List application built using HTML, CSS, and Vanilla JavaScript.

This application allows users to:
- Add new tasks
- Mark tasks as completed
- Delete tasks
- Persist data using browser localStorage

All tasks remain saved even after refreshing the page.

---

## 🚀 Features

- Add new tasks
- Toggle task completion
- Delete tasks
- Data persistence using localStorage
- Instant UI updates (no page reload required)

---

## 🧠 Core Logic Overview

### 1️⃣ Loading Tasks from localStorage

```js
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((task) => renderTask(task));
```
- Retrieves saved tasks from localStorage

- Converts stored JSON string into a JavaScript array

- Defaults to an empty array if no data exists

- Renders each stored task in the UI

### 2️⃣ Saving Tasks

```js

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

```
- Converts the tasks array into a JSON string

- Stores it in localStorage

- Ensures tasks persist after page reload

### 3️⃣ Task Object Structure

Each task is stored as an object:

```js
const newTask = {
  id: Date.now(),
  text: taskText,
  completed: false,
};

```
| Property  | Purpose                         |
| --------- | ------------------------------- |
| id        | Unique identifier for each task |
| text      | Stores task content             |
| completed | Tracks completion status        |


- The unique id allows precise deletion and state updates.

### 4️⃣ Adding a New Task

```js
tasks.push(newTask);
saveTasks();
renderTask(newTask);
```
- Adds the new task to the tasks array

- Saves updated tasks to localStorage

- Instantly renders the task without refreshing the page

### 5️⃣ Editing a Task

- When the Edit button is clicked:

    - The task text is replaced with an input field

    - The button changes to Save

- After saving:

  - The task object is updated

  - Changes are stored in localStorage

  - The UI switches back to display mode

This enables full in-place editing functionality.


### 6️⃣ Toggling Completion

- Clicking on a task (excluding buttons):

- Toggles the completed property

- Updates the visual state using a CSS class

- Saves changes to localStorage


