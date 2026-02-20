document.addEventListener("DOMContentLoaded", () => {

    const todoInput = document.getElementById("todo-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");
    const clearAllBtn = document.getElementById("clear-all-btn");

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => renderTask(task));

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTask(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);

        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span>${task.text}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;

        const span = li.querySelector("span");
        const editBtn = li.querySelector(".edit-btn");

        li.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON" || e.target.tagName === "INPUT") return;
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTasks();
        });

        editBtn.addEventListener("click", (e) => {
            e.stopPropagation();

            if (editBtn.textContent === "Edit") {
                const input = document.createElement("input");
                input.type = "text";
                input.value = task.text;

                li.replaceChild(input, span);
                editBtn.textContent = "Save";
            } else {
                const input = li.querySelector("input");
                const updatedText = input.value.trim();
                if (!updatedText) return;

                task.text = updatedText;
                saveTasks();

                const newSpan = document.createElement("span");
                newSpan.textContent = updatedText;

                li.replaceChild(newSpan, input);
                editBtn.textContent = "Edit";
            }
        });

        li.querySelector(".delete-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            saveTasks();
        });

        todoList.appendChild(li);
    }

    addTaskBtn.addEventListener("click", () => {
        const taskText = todoInput.value.trim();
        if (!taskText) return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };

        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoInput.value = "";
    });

    // ✅ CLEAR ALL BUTTON (Now in correct scope)
    clearAllBtn.addEventListener("click", () => {
        if (tasks.length === 0) return;

        const confirmDelete = confirm("Are you sure you want to delete all tasks?");

        if (confirmDelete) {
            tasks = [];
            saveTasks();
            todoList.innerHTML = "";
        }
    });

});