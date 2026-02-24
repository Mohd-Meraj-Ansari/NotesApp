let parentDiv = document.getElementById("parent");
let form = document.getElementById("taskForm");
let modal = document.querySelector(".modal");

let h5 = document.getElementById("cardheading");
let p = document.getElementById("cardtext");

let themeBtn = document.getElementById("themeBtn");

let taskName;
let taskDesc;

let isDark = false;
let isEditMode = false;
let currentEditingCard = null;

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function changeTheme() {
  let headerSection = document.getElementById("header");

  isDark = !isDark;

  if (isDark) {
    themeBtn.innerText = "Light Mode";
    document.body.classList.add("dark");
    headerSection.style.backgroundColor = "black";
    headerSection.style.color = "white";
  } else {
    themeBtn.innerText = "Dark Mode";
    document.body.classList.remove("dark");
    headerSection.style.backgroundColor = "white";
    headerSection.style.color = "black";
  }

  applyThemeToCards();
}

function applyThemeToCards() {
  document.querySelectorAll(".outercard .card").forEach((card) => {
    if (isDark) {
      card.classList.add("dark");
    } else {
      card.classList.remove("dark");
    }
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  taskName = e.target.taskName.value;
  taskDesc = e.target.taskDesc.value;

  if (taskName.trim() && taskDesc.trim()) {
    if (isEditMode) {
      updateCard();
    } else {
      let newTask = {
        id: Date.now(),
        title: taskName,
        desc: taskDesc,
      };

      tasks.push(newTask);
      saveToLocalStorage();
      renderTasks();
    }

    form.reset();
  } else {
    alert("Please enter both fields");
  }
});

modal.addEventListener("hidden.bs.modal", () => {
  form.reset();
});

function createCard(task) {
  let outerCard = document.createElement("div");
  outerCard.classList.add("outercard");
  outerCard.dataset.id = task.id;

  let cardDiv = document.createElement("div");
  cardDiv.classList.add("card", "border-2");
  cardDiv.dataset.id = task.id;

  let contentDiv = document.createElement("div");
  contentDiv.classList.add("card-body", "rounded-3");

  let header = document.createElement("h5");
  header.classList.add("card-title", "text-truncate");
  header.textContent = task.title;

  let para = document.createElement("p");
  para.classList.add("card-text", "truncate-multiline");
  para.textContent = task.desc;

  let hr = document.createElement("hr");

  let lowerDiv = document.createElement("div");
  lowerDiv.classList.add("d-flex", "gap-3", "p-2");

  let editIcon = document.createElement("i");
  editIcon.classList.add("fa-solid", "fa-pen-to-square");
  editIcon.setAttribute("title", "Edit");

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash-can");
  deleteIcon.setAttribute("title", "Delete");

  editIcon.addEventListener("click", (event) => {
    event.stopPropagation();

    form.taskName.value = header.textContent;
    form.taskDesc.value = para.textContent;

    isEditMode = true;
    currentEditingCard = outerCard;

    const modalElement = document.getElementById("staticBackdrop");
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);

    modalInstance.show();
  });
  deleteIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    let id = outerCard.dataset.id;
    tasks = tasks.filter((task) => task.id != id);
    saveToLocalStorage();
    renderTasks();
  });

  cardDiv.addEventListener("click", () => {
    h5.textContent = header.textContent;
    p.textContent = para.textContent;

    const modalElement = document.getElementById("displayModal");
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);

    modalInstance.show();
  });

  lowerDiv.appendChild(editIcon);
  lowerDiv.appendChild(deleteIcon);

  contentDiv.appendChild(header);
  contentDiv.appendChild(hr);
  contentDiv.appendChild(para);

  cardDiv.appendChild(contentDiv);
  contentDiv.appendChild(lowerDiv);
  outerCard.appendChild(cardDiv);

  parentDiv.appendChild(outerCard);

  applyThemeToCards();
}

function updateCard() {
  if (currentEditingCard) {
    let id = currentEditingCard.dataset.id;

    tasks = tasks.map((task) =>
      task.id == id ? { ...task, title: taskName, desc: taskDesc } : task,
    );

    saveToLocalStorage();
    renderTasks();

    isEditMode = false;
    currentEditingCard = null;

    const modalElement = document.getElementById("staticBackdrop");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  }
}

function renderTasks() {
  parentDiv.innerHTML = "";

  tasks.forEach((task) => {
    createCard(task);
  });

  applyThemeToCards();
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();
