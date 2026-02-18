document.addEventListener("DOMContentLoaded", () => {
    //alert("hello");

    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => renderTask(task))

    addTaskButton.addEventListener("click", function () {
        const taskText = todoInput.value.trim();
        if (taskText === "") return

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,

        }

        tasks.push(newTask);
        saveTasks();
        todoInput.value = ""; //clear input
        console.log(tasks);
    })

    function renderTask(task) {
        console.log(task);
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

})