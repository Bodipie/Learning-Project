//======================Local Storage=========================
let tasks = loadTasks();

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const data = localStorage.getItem("tasks");
  return data
    ? JSON.parse(data)
    : {
      toDo: [],
      inProgress: [],
      complete: [],
    };
}

//======================Task Mover=========================
let toDo = document.getElementById("container1");
let inProgress = document.getElementById("container2");
let finished = document.getElementById("container3");

let selected = null;

const containers = {
  container1: "toDo",
  container2: "inProgress",
  container3: "complete",
};

[toDo, inProgress, finished].forEach((container) => {
  container.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  container.addEventListener("drop", function (e) {
    if (selected) {
      const oldSection = containers[selected.parentElement.id];
      const newSection = containers[container.id];
      const taskText = selected.textContent;

      tasks[oldSection] = tasks[oldSection].filter((t) => t !== taskText);
      tasks[newSection].push(taskText);

      container.appendChild(selected);
      selected = null;

      saveTasks();
    }
  });
});

//======================Task Add=========================
function handleData(event) {
  event.preventDefault();
  console.log("hi", event);

  const input = document.getElementById('input');
  const taskText = input.value.trim();

  if (taskText === '') {
    alert("Please Enter Valid Task");
    return;
  }

  const newTask = document.createElement('div');
  newTask.className = 'item';
  newTask.draggable = true;
  newTask.textContent = taskText;

  newTask.addEventListener("dragstart", function (e) {
    selected = e.target;
  });

  const container = document.getElementById("container1");
  container.appendChild(newTask);

  tasks.toDo.push(taskText);
  saveTasks();

  input.value = '';
  input.focus();
}

//======================Page Load Task Renderer=========================
window.onload = function () {
  for (const containerId in containers) {
    const sectionKey = containers[containerId];
    const container = document.getElementById(containerId);

    let titleText = "";

    if (sectionKey === "toDo") titleText = "To Do";
    else if (sectionKey === "inProgress") titleText = "In Progress";
    else if (sectionKey === "complete") titleText = "Complete";

    container.innerHTML = `
      <h2 class="containerTitle">${titleText}</h2>
      <div class="break"></div>
    `;

    tasks[sectionKey].forEach((taskText) => {
      const task = document.createElement("div");
      task.className = "item";
      task.draggable = true;
      task.textContent = taskText;

      task.addEventListener("dragstart", function (e) {
        selected = e.target;
      });

      container.appendChild(task);
    });
  }
};