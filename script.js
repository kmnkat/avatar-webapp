const downloadBtn = document.getElementById("download-btn");

const circleBtns = document.querySelectorAll("div.circle-btns > button");
const rectBtns = document.querySelectorAll("div.rect-btns > button");
const allMenuBtns = Array.prototype.concat.call(circleBtns, rectBtns);

let chosenCategory = "style";

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
    });
  });
});
function setInstruction() {
  instruction.classList.remove("animation-on-showing");
  instruction.innerHTML = `<span id="new-instruction">${chosenCategory}</span>`;
  instruction.classList.add("animation-on-showing");
}
