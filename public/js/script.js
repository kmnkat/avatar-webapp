let chosenCategory = "hair";

// FETCHING DATA - SETTING INITIAL VALUES FOR PORTRAIT ELEMENTS
function initialData() {
  console.log("initialization");
  //setting initial data for the first use
  creatingFirstLocalStorage();

  for (const key in localStorage) {
    //setting portraits elements (based on local storage)
    if (localStorage.hasOwnProperty(key)) {
      creatingImgByGivenAlt(localStorage.getItem(key), key);
    }
  }
}
//function for initial data for the first use from json file
function creatingFirstLocalStorage() {
  $.getJSON("./data/chosenElements.json", function (chosenItems) {
    $.each(chosenItems, function (key, value) {
      if (!window.localStorage.getItem(key)) {
        window.localStorage.setItem(key, value);
      }
    });
  });
}

//function to create element based on limited data from the local storage or json file
function creatingImgByGivenAlt(altVal, elementCategory) {
  $.getJSON("./data/creatorElements.json", function (item) {
    $.each(item[elementCategory], function (data, values) {
      if (values.alt === altVal) {
        let copyOfImg = document.createElement("img");
        copyOfImg.src = values.url;
        copyOfImg.alt = values.alt;
        settingNewCreatorEl(copyOfImg, elementCategory, altVal);
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

// BUTTONS - CHOOSE THE CATEGORY
allMenuBtns.forEach(function (buttonList) {
  buttonList.forEach(function (anyButton) {
    anyButton.addEventListener("click", function (e) {
      circleBtns.forEach((circleBtn) => {
        // set active btn
        circleBtn.classList.remove("carousel-btn-act");
      });
      rectBtns.forEach((rectBtn) => {
        rectBtn.classList.remove("carousel-btn-act");
      });
      // set new value for chosen category
      // - if image is clicked
      if (e.target.parentElement.nodeName == "BUTTON") {
        e.target.parentElement.classList.add("carousel-btn-act");
        chosenCategory = e.target.parentElement.id;
      }
      // - if button itself is clicked
      else {
        e.target.classList.add("carousel-btn-act");
        chosenCategory = e.target.id;
      }
      // if the chosen category has changed, render new images and set new instruction
      if (instruction.innerText != chosenCategory) {
        setInstruction();
        imgContainer.innerHTML = "";
        renderNewElements();
      }
    });
  });
});

// setting a new instruction text
function setInstruction() {
  instruction.classList.remove("animation-on-showing");
  instruction.innerHTML = `<span id="new-instruction">${chosenCategory}</span>`;
  instruction.classList.add("animation-on-showing");
}

// SHOW IMAGES IN THE GALLERY
// render images for for the page load
document.addEventListener("DOMContentLoaded", renderNewElements);

function renderNewElements() {
  // loading data from json file to the carousel gallery
  $.getJSON("./data/creatorElements.json", function (data) {
    $.each(data, function (key, val) {
      if (key === chosenCategory) {
        data[key].forEach(function (singleEl) {
          let url = singleEl.url;
          let alt = singleEl.alt;
          // creating container div
          let container = document.createElement("div");
          container.classList.add("img-to-choose");
          container.classList.add(`${key}-miniature`);
          // creating img
          let img = document.createElement("img");
          img.src = `${url}`;
          img.alt = `${alt}`;
          //highlight if it's an item from local storage
          if (img.alt === localStorage.getItem(key)) {
            container.classList.add("chosen-carousel-item");
          }
          // creating copy to set as a portrait element
          let copy = document.createElement("img");
          copy.src = `${url}`;
          container.appendChild(img);
          // add event listener to each image div (change portrait element on click)
          container.addEventListener("click", function (e) {
            chosenItem(e.target);
            settingNewCreatorEl(copy, chosenCategory, img.alt);
          });

          imgContainer.appendChild(container);
        });
      }
    });
  });

  initialData();
}

//set the background to the chosen element (carousel gallery)
function chosenItem(element) {
  let previousChosen = document.querySelector(".chosen-carousel-item");
  if (previousChosen) {
    previousChosen.classList.remove("chosen-carousel-item");
  }
  element.classList.add("chosen-carousel-item");
}

//set the chosen element to portrait area
function settingNewCreatorEl(image, imageCategory, altText) {
  let choosingId = `${imageCategory}-creator`;
  let choosingArea = document.getElementById(choosingId);
  choosingArea.innerHTML = "";
  choosingArea.appendChild(image);
  for (let key in localStorage) {
    if (key == imageCategory) {
      window.localStorage.setItem(imageCategory, altText);
    }
  }
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

// ARROWS - FUNCTIONALITY

const imgContainer = document.querySelector(".carousel-choosing");

function scrollLeft() {
  imgContainer.scrollBy(-100, 0);
}
// scrolling functions
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
// scrolling functions as arrows' event listeners
let Arrowleft = document.getElementById("arrow-l");
let ArrowRight = document.getElementById("arrow-r");

Arrowleft.addEventListener("click", scrollLeft);
ArrowRight.addEventListener("click", scrollRight);
