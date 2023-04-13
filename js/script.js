document.addEventListener("DOMContentLoaded", function() {

    const inpField = document.querySelector(".input-input");
    const btnAdd = document.querySelector(".button-add");
    const listWrapper = document.querySelector(".output");

    let arrayTasks;

    if (localStorage.tasks) {
        arrayTasks = JSON.parse(localStorage.getItem("tasks"));
    } else {
        arrayTasks = [];
    }

    function newTask (taskText) {
        this.taskText = taskText;
        this.status = false;
    }

    const refreshLocalSt = () => {
        localStorage.setItem("tasks", JSON.stringify(arrayTasks));
    }

    const addTask = () => {
        arrayTasks.push(new newTask(inpField.value));
        refreshLocalSt();
        showTasks();
        inpField.value = null;
    }

    const createRow = (elem,index) => {
        return `
        <div class="task-row ${elem.status ? "task-row--checked" : ""}" tabindex="0">
            <span>${index + 1}</span>
            <h3 class="task-title">${elem.taskText}</h3>
            <button class="button button-aqua button-change" data-index = "${index}">Change</button>
            <input type="checkbox" class="task-status" ${elem.status ? "checked" : ""} data-index=${index}>
            <button class="button button-red button-delete" data-index = "${index}">Delete</button>
        </div>
        `;
    }


    const showTasks = () => {

        listWrapper.innerHTML = "";

        arrayTasks.forEach((elem, index) => {
            listWrapper.innerHTML += createRow(elem, index);
        });

        const checkTask = document.querySelectorAll(".task-status");
        const btnDelete = document.querySelectorAll(".button-delete");
        const btnChange = document.querySelectorAll(".button-change");

        checkTask.forEach(elem => {
            elem.addEventListener("change", checkedTask);
        });

        btnDelete.forEach(elem => {
            elem.addEventListener("click", deleteTask);
        });

        btnChange.forEach(elem => {
            elem.addEventListener("click", changeTask);
        });
    }

    function checkedTask () {
        arrayTasks[this.dataset.index].status = !arrayTasks[this.dataset.index].status;
        refreshLocalSt();
        showTasks();
    }

    
    function deleteTask () {
        arrayTasks.splice(this.dataset.index, 1);
        refreshLocalSt();
        showTasks();
    }

    function changeTask (elem) {
        let newTasks = prompt("Repair the name of tasks");
        arrayTasks[this.dataset.index].taskText = newTasks;
        refreshLocalSt();
        showTasks();
    }

    showTasks();

    btnAdd.addEventListener("click", function() {
        addTask();
    })

    document.addEventListener("keyup", function(elem) {
        if (elem.key == "Enter" || elem.code == "Enter") {
            addTask();
        }
    })
})