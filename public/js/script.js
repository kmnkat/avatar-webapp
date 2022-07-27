let chosenCategory = "hair";

// FETCHING DATA - SETTING INITIAL VALUES FOR PORTRAIT ELEMENTS
function initialData() {
  console.log("initialization");
  $.getJSON("./data/chosenElements.json", function (chosenItems) {
    if (!localStorage.getItem("userItems")) {
      localStorage.setItem("userItems", JSON.stringify(chosenItems));
      console.log("initial set");
    }

    console.log(chosenItems);
    $.each(chosenItems, function (key, val) {
      //setting initial chosen data
      if (key === chosenCategory) {
        let image = document.querySelector(`img[alt="${val}"]`);
        image.parentElement.classList.add("chosen-carousel-item");
      }

      $.getJSON("./data/creatorElements.json", function (dataItem) {
        $.each(dataItem[key], function (value) {
          if (dataItem[key][value].alt === val) {
            //console.log("TRY TO SET " + val);
            creatingImgByGivenAlt(val, key);
            //console.log(key + " created");
          }
        });
      });
    });
  });
}

function creatingImgByGivenAlt(altVal, elementCategory) {
  $.getJSON("./data/creatorElements.json", function (item) {
    //console.log(item[elementCategory][0].url);
    $.each(item[elementCategory], function (data, values) {
      if (values.alt === altVal) {
        let copyOfImg = document.createElement("img");
        copyOfImg.src = values.url;
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

// SHOW IMAGES IN THE GALLERY
// render images for for the first page load
document.addEventListener("DOMContentLoaded", renderNewElements);

function renderNewElements() {
  // loading data from json file to the gallery
  $.getJSON("./data/creatorElements.json", function (data) {
    $.each(data, function (key, val) {
      if (key === chosenCategory) {
        data[key].forEach(function (singleEl) {
          let url = singleEl.url;
          let alt = singleEl.alt;
          // creating container div
          let container = document.createElement("div");
          container.classList.add("img-to-choose");
          container.id = `${alt}`;
          // creating img
          let img = document.createElement("img");
          img.src = `${url}`;
          img.alt = `${alt}`;
          let copy = document.createElement("img");
          copy.src = `${url}`;
          container.appendChild(img);
          container.addEventListener("click", function (e) {
            chosenItem(e.target);
            console.log("I set by clicking: " + e.target.id);
            //console.log(copy);
            settingNewCreatorEl(copy, chosenCategory, img.alt);
          });

          imgContainer.appendChild(container);
        });
      }
    });
  });
  initialData();
}

//set the background to chosen elements
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
  $.getJSON("./data/chosenElements.json", function (itemToChangeData) {
    if (altText != itemToChangeData[imageCategory]) {
      itemToChangeData[imageCategory] = altText;
      console.log(
        "JSON new " + imageCategory + " is " + itemToChangeData[imageCategory]
      );
    }
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
