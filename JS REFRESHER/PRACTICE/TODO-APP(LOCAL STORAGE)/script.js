document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // 👉 “Get tasks from localStorage.
    // 👉 Convert it to an array.
    // 👉 If nothing exists, create an empty array instead.”
    //“It retrieves tasks from localStorage, parses them into a JavaScript array, and defaults to an empty array if no tasks exist.”


    tasks.forEach(task => renderTask(task));
    // 👉 For each task
    // 👉 Call the function renderTask
    // 👉 And pass the current task as argument
    //“It loops through all tasks and calls renderTask for each one to display them in the UI.”
    function renderTask(task) {
        // Passing task allows:
        // Access to task.text
        // Access to task.id
        // Access to task.completed

        //“The task parameter allows the renderTask function to receive and display specific task data instead of relying on global variables.”

        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        if (task.completed) li.classList.add("completed");
        li.innerHTML = `<span>${task.text}</span>
            <button class="delete-btn">Delete</button>`;
        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTasks();
        })
        li.querySelector(".delete-btn").addEventListener("click", (e) => {
            e.stopPropagation(); //prevent toggle from firing
            tasks = tasks.filter((t) => t.id !== task.id);
            li.remove();
            saveTasks();
        })
        todoList.appendChild(li);
    }
    addTaskBtn.addEventListener("click", () => {
        function renderTask(task) {
            // Passing task allows:
            // Access to task.text
            // Access to task.id
            // Access to task.completed

            //“The task parameter allows the renderTask function to receive and display specific task data instead of relying on global variables.”

            const li = document.createElement("li");
            li.setAttribute("data-id", task.id);
            if (task.completed) li.classList.add("completed");
            li.innerHTML = `<span>${task.text}</span>
            <button class="delete-btn">Delete</button>`;
            li.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON') return;
                task.completed = !task.completed;
                li.classList.toggle("completed");
                saveTasks();
            })
            li.querySelector(".delete-btn").addEventListener("click", (e) => {
                e.stopPropagation(); //prevent toggle from firing
                tasks = tasks.filter((t) => t.id !== task.id);
                li.remove();
                saveTasks();
            })
            todoList.appendChild(li);
        }
        const taskText = todoInput.value.trim();

        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        }

        // | Property  | Why Needed                   |
        // | --------- | ---------------------------- |
        // | id        | To delete/edit specific task |
        // | text      | To display content           |
        // | completed | To track status              |

        //“It creates a new task object with a unique id, the task text entered by the user, and a default completed status of false.”

        tasks.push(newTask); //👉 Add the newly created task into the tasks array.
        saveTask(); //👉 The updated tasks array is saved in localStorage
        renderTask(newTask); //👉 The task is shown on screen instantly and No need to reload page









        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
        //“The saveTask function converts the tasks array into a JSON string and stores it in localStorage so that tasks persist even after page reload.”


    })



})