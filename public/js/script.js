//FETCHING DATA

let chosenCategory = "hair";
function renderNewElements() {
  $.getJSON("./data/creatorElements.json", function (data) {
    $.each(data, function (key, val) {
      if (key === chosenCategory) {
        data[key].forEach(function (singleEl) {
          let url = singleEl.url;
          let alt = singleEl.alt;
          let div = document.createElement("div");
          div.classList.add("img-to-choose");
          div.innerHTML = `<img src=${url} alt=${alt}/>`;
          imgContainer.appendChild(div);
        });
      }
    });
  });
}

// BUTTONS - STYLE AND FUNCTIONALITY

const downloadBtn = document.getElementById("download-btn");
const circleBtns = document.querySelectorAll("div.circle-btns > button");
const rectBtns = document.querySelectorAll("div.rect-btns > button");
const allMenuBtns = Array.prototype.concat.call(circleBtns, rectBtns);

const instruction = document.getElementById("new-instruction");

allMenuBtns.forEach(function (buttonList) {
  buttonList.forEach(function (anyButton) {
    anyButton.addEventListener("click", function (e) {
      circleBtns.forEach((circleBtn) => {
        circleBtn.classList.remove("carousel-btn-act");
      });
      rectBtns.forEach((rectBtn) => {
        rectBtn.classList.remove("carousel-btn-act");
      });
      if (e.target.parentElement.nodeName == "BUTTON") {
        e.target.parentElement.classList.add("carousel-btn-act");
        chosenCategory = e.target.parentElement.id;
      } else {
        e.target.classList.add("carousel-btn-act");
        chosenCategory = e.target.id;
      }
      setInstruction();
      imgContainer.innerHTML = "";
      renderNewElements();
      console.log();
    });
  });
});
function setInstruction() {
  instruction.classList.remove("animation-on-showing");
  instruction.innerHTML = `<span id="new-instruction">${chosenCategory}</span>`;
  instruction.classList.add("animation-on-showing");
}

// ARROWS - FUNCTIONALITY

const imgContainer = document.querySelector(".carousel-choosing");

function scrollLeft() {
  imgContainer.scrollBy(-100, 0);
}

function scrollRight() {
  imgContainer.scrollBy(100, 0);
  //checking if it's the end of gallery
  if (
    imgContainer.offsetWidth + imgContainer.scrollLeft >=
    imgContainer.scrollWidth
  ) {
    imgContainer.scrollBy(-imgContainer.scrollWidth, 0);
  }
}

let Arrowleft = document.getElementById("arrow-l");
let ArrowRight = document.getElementById("arrow-r");

Arrowleft.addEventListener("click", scrollLeft);
ArrowRight.addEventListener("click", scrollRight);

// SHOW IMAGES IN THE GALLERY

document.addEventListener("DOMContentLoaded", renderNewElements);

function renderNewElements() {
  $.getJSON("./data/creatorElements.json", function (data) {
    $.each(data, function (key, val) {
      if (key === chosenCategory) {
        data[key].forEach(function (singleEl) {
          let url = singleEl.url;
          let alt = singleEl.alt;
          let div = document.createElement("div");
          div.classList.add("img-to-choose");
          let img = document.createElement("img");
          img.src = `${url}`;
          img.addEventListener("click", function () {
            console.log("click");
          });
          div.appendChild(img);
          imgContainer.appendChild(div);
        });
      }
    });
  });

  const imagesDisplayed = document.querySelectorAll(".img-to-choose-item");
  imagesDisplayed.forEach(function (image) {
    image.addEventListener("click", function (e) {
      console.log("click");
      e.preventDefault();
      let previousChosen = document.querySelector(".chosen-carousel-item");

      if (previousChosen) {
        previousChosen.classList.remove("chosen-carousel-item");
      }

      e.target.parentElement.classList.add("chosen-carousel-item");
      console.log(e.target.alt);
    });
  });
}

// DOWNLOAD IMAGE

const imageToDownload = document.getElementById("user-image");
const downloadButton = document.getElementById("download-btn");

downloadButton.addEventListener("click", function (e) {
  e.preventDefault();
  domtoimage.toBlob(imageToDownload).then(function (blob) {
    window.saveAs(blob, "my-avatar.png");
  });
});
