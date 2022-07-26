$(document).ready(function () {
  alert("jQuery Works");
});

// BUTTONS - STYLE AND FUNCTIONALITY

const downloadBtn = document.getElementById("download-btn");
const circleBtns = document.querySelectorAll("div.circle-btns > button");
const rectBtns = document.querySelectorAll("div.rect-btns > button");
const allMenuBtns = Array.prototype.concat.call(circleBtns, rectBtns);

let chosenCategory = "hair";

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
  const req = new XMLHttpRequest();
  req.open("GET", dataAboutImagesUrl, true);
  req.send();
  req.onload = function () {
    const json = JSON.parse(req.responseText).record;

    json[chosenCategory].forEach(function (element) {
      let url = element.url;
      let alt = element.alt;
      let div = document.createElement("div");
      div.classList.add("img-to-choose");
      div.innerHTML = `<img src=${url} alt=${alt}/>`;
      imgContainer.appendChild(div);
    });
    const imagesDisplayed = document.querySelectorAll(".img-to-choose");
    imagesDisplayed.forEach(function (image) {
      image.addEventListener("click", function (e) {
        e.preventDefault();
        let previousChosen = document.querySelector(".chosen-carousel-item");

        if (previousChosen) {
          previousChosen.classList.remove("chosen-carousel-item");
        }

        e.target.parentElement.classList.add("chosen-carousel-item");
        console.log(e.target.alt);
      });
    });
  };
}

// DOWNLOAD IMAGE

const imageToDownload = document.getElementById("slogan");

const domtoimg = document.createElement("script");
domtoimg.type = "text/javascript";
domtoimg.src =
  "https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.js";
document.head.appendChild(domtoimg);

domtoimage
  .toPng(imageToDownload)
  .then(function (dataUrl) {
    var img = new Image();
    img.src = dataUrl;
    document.body.appendChild(img);
  })
  .catch(function (error) {
    console.error("oops, something went wrong!", error);
  });
