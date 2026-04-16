const todoForm = document.querySelector("#todo-form");
const taskInput = document.querySelector("#task-input");
const errorMessage = document.querySelector("#error-message");
const taskList = document.querySelector("#task-list");
const pendingCount = document.querySelector("#pending-count");

let tasks = [];
let nextId = 1;

function updatePendingCount() {
  const pendingTasks = tasks.filter((task) => !task.completed);
  pendingCount.textContent = pendingTasks.length;
}

function showError(message) {
  errorMessage.textContent = message;
}

function clearError() {
  errorMessage.textContent = "";
}

function renderEmptyState() {
  if (tasks.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.classList.add("empty-state");
    emptyMessage.textContent = "No hay tareas todavía.";
    taskList.append(emptyMessage);
  }
}

function renderTasks() {
  taskList.textContent = "";

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    if (task.completed) {
      taskItem.classList.add("completed");
    }

    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    const taskText = document.createElement("p");
    taskText.classList.add("task-text");
    taskText.textContent = task.text;

    taskContent.append(taskText);

    const actions = document.createElement("div");
    actions.classList.add("task-actions");

    const statusButton = document.createElement("button");
    statusButton.classList.add("status-btn");
    statusButton.textContent = task.completed ? "Desmarcar" : "Completar";
    statusButton.setAttribute("type", "button");

    statusButton.addEventListener("click", () => {
      toggleTask(task.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Eliminar";
    deleteButton.setAttribute("type", "button");

    deleteButton.addEventListener("click", () => {
      deleteTask(task.id);
    });

    actions.append(statusButton, deleteButton);
    taskItem.append(taskContent, actions);
    taskList.append(taskItem);
  });

  renderEmptyState();
  updatePendingCount();
}

function addTask(taskText) {
  const newTask = {
    id: nextId,
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  nextId += 1;

  renderTasks();
}

function toggleTask(taskId) {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        completed: !task.completed
      };
    }

    return task;
  });

  renderTasks();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    showError("No puedes agregar una tarea vacía.");
    return;
  }

  clearError();
  addTask(taskText);
  taskInput.value = "";
  taskInput.focus();
});

renderTasks();