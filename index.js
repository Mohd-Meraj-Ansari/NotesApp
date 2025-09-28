let addButton = document.getElementById("add");
let parentDiv = document.getElementById("parent");
let form = document.getElementById("taskForm");
let modal = document.querySelector(".modal");
let h5 = document.getElementById("cardheading");
let p = document.getElementById("cardtext");
let card = document.getElementsByClassName("card");
let themeBtn = document.getElementById("themeBtn");
// let closeBtn = document.getElementById("getModalCloseBtn");
let removeBtn = document.getElementById("getModalCloseBtn");
let cardArray = [];

let formData = new FormData(form);
let taskName;
let taskDesc;

let isDark = false;

function changeTheme() {
  cardArray = document.querySelectorAll(".outercard");
  console.log(cardArray);
  if (isDark == true) {
    themeBtn.innerText = "Light";
    document.querySelector("body").removeAttribute("class");
    if (cardArray.length != 0) {
      cardArray.forEach((card) => {
        card.children[0].classList.remove("dark");
      });
    }
    isDark = false;
  } else {
    themeBtn.innerText = "Dark";
    document.querySelector("body").setAttribute("class", "dark");

    if (cardArray.length != 0) {
      cardArray.forEach((card) => {
        card.children[0].classList.add("dark");
      });
    }
    isDark = true;
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  taskName = e.target.taskName.value;
  taskDesc = e.target.taskDesc.value;
  // console.log(taskName);
  // console.log(taskDesc);

  // if (taskName && taskDesc) {
  //   const modalElement = document.getElementById("staticBackdrop");
  //   const modalInstance = bootstrap.Modal.getInstance(modalElement);
  //   document.activeElement.blur();
  //   modalInstance.hide();
  // }
  addCard();
  form.reset();
});

modal.addEventListener("hidden.bs.modal", () => {
  form.reset();
});

function addCard() {
  let outerCard = document.createElement("div");
  outerCard.classList.add("outercard");

  let cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.classList.add("border-2");
  // cardDiv.setAttribute("data-name", taskName);
  // cardDiv.setAttribute("data-desc", taskDesc);

  let contentDiv = document.createElement("div");
  contentDiv.classList.add("card-body");

  let header = document.createElement("h5");
  header.classList.add("card-title");
  header.classList.add("text-truncate");

  let headerContent = document.createTextNode(taskName);
  header.append(headerContent);

  let para = document.createElement("p");
  para.classList.add("card-text");
  para.classList.add("truncate-multiline");

  let paraContent = document.createTextNode(taskDesc);
  para.append(paraContent);

  let hr = document.createElement("hr");

  let lowerDiv = document.createElement("div");
  // <i class="fa-solid fa-trash-can"></i>
  let icon = document.createElement("i");
  icon.classList.add("fa-solid");
  icon.classList.add("fa-trash-can");
  icon.setAttribute("title", "remove");

  lowerDiv.appendChild(icon);
  contentDiv.appendChild(header);
  contentDiv.appendChild(hr);
  contentDiv.appendChild(para);

  cardDiv.appendChild(contentDiv);
  outerCard.appendChild(cardDiv);
  outerCard.appendChild(lowerDiv);
  parentDiv.append(outerCard);

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      let getTitle = card.querySelector("h5").textContent;
      let getDescription = card.querySelector("p").textContent;

      // console.log(getTitle);
      // console.log(getDescription);

      h5.textContent = getTitle;
      p.textContent = getDescription;

      const modalElement = document.getElementById("displayModal");
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);

      document.activeElement.blur();
      modalInstance.show();
      modalElement.focus();
    });
  });

  icon.addEventListener("click", (event) => {
    event.stopPropagation();
    let cardCard = icon.closest(".outercard");
    cardCard.remove();
  });
}
