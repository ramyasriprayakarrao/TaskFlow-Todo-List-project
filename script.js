// TaskFlow To-Do List — tasks are saved in this browser using LocalStorage.

const STORAGE_KEY = "taskflow_tasks_v1";

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const emptyTitle = document.getElementById("emptyTitle");
const emptyMessage = document.getElementById("emptyMessage");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = loadTasks();
let currentFilter = "all";

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Could not read saved tasks:", error);
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function updateDate() {
  const now = new Date();
  document.getElementById("todayLabel").textContent =
    now.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  document.getElementById("dateLabel").textContent =
    now.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function createTask(text) {
  return {
    id: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now() + Math.random()),
    text,
    completed: false,
    createdAt: Date.now()
  };
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (!text) {
    taskInput.focus();
    return;
  }
  tasks.unshift(createTask(text));
  saveTasks();
  taskInput.value = "";
  taskInput.focus();
  renderTasks();
});

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(item => item.id === id);
  if (!task) return;
  const updatedText = prompt("Edit your task:", task.text);
  if (updatedText === null) return;
  const cleanText = updatedText.trim();
  if (!cleanText) {
    alert("Task cannot be empty.");
    return;
  }
  task.text = cleanText;
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function visibleTasks() {
  if (currentFilter === "active") return tasks.filter(task => !task.completed);
  if (currentFilter === "completed") return tasks.filter(task => task.completed);
  return tasks;
}

function makeActionButton(label, symbol, className, action, id) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `icon-button ${className}`;
  button.textContent = symbol;
  button.setAttribute("aria-label", label);
  button.title = label;
  button.addEventListener("click", () => action(id));
  return button;
}

function renderTasks() {
  taskList.innerHTML = "";
  const shownTasks = visibleTasks();

  shownTasks.forEach(task => {
    const item = document.createElement("li");
    item.className = `task-item${task.completed ? " completed" : ""}`;

    const check = document.createElement("button");
    check.type = "button";
    check.className = "check-button";
    check.textContent = task.completed ? "✓" : "";
    check.setAttribute("aria-label", task.completed ? "Mark as active" : "Mark as completed");
    check.addEventListener("click", () => toggleTask(task.id));

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "task-actions";
    if (!task.completed) {
      actions.appendChild(makeActionButton("Edit task", "✎", "edit", editTask, task.id));
    }
    actions.appendChild(makeActionButton("Delete task", "×", "delete", deleteTask, task.id));

    item.append(check, text, actions);
    taskList.appendChild(item);
  });

  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const active = total - completed;

  document.getElementById("totalCount").textContent = total;
  document.getElementById("activeCount").textContent = active;
  document.getElementById("completedCount").textContent = completed;
  document.getElementById("allFilterCount").textContent = total;
  document.getElementById("activeFilterCount").textContent = active;
  document.getElementById("completedFilterCount").textContent = completed;
  document.getElementById("remainingText").textContent = `${active} ${active === 1 ? "task" : "tasks"} left`;

  filterButtons.forEach(button => {
    const selected = button.dataset.filter === currentFilter;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  const isEmpty = shownTasks.length === 0;
  emptyState.hidden = !isEmpty;
  if (isEmpty) {
    if (currentFilter === "active" && total > 0) {
      emptyTitle.textContent = "All caught up!";
      emptyMessage.textContent = "You have no active tasks right now.";
    } else if (currentFilter === "completed" && total > 0) {
      emptyTitle.textContent = "Nothing completed yet";
      emptyMessage.textContent = "Finish a task and it will appear here.";
    } else {
      emptyTitle.textContent = "Your list is clear!";
      emptyMessage.textContent = "Add a task above and take the first step.";
    }
  }
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    renderTasks();
  });
});

document.getElementById("clearCompleted").addEventListener("click", () => {
  const completedCount = tasks.filter(task => task.completed).length;
  if (completedCount === 0) return;
  const confirmed = confirm(`Delete ${completedCount} completed ${completedCount === 1 ? "task" : "tasks"}?`);
  if (!confirmed) return;
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
});

updateDate();
renderTasks();
