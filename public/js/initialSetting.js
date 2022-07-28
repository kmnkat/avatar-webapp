//function for initial data for the first use from json file
console.log("script starts");
function creatingFirstLocalStorage() {
  $.getJSON("./data/chosenElements.json", function (chosenItems) {
    $.each(chosenItems, function (key, value) {
      if (!window.localStorage.getItem(key)) {
        window.localStorage.setItem(key, value);
      }
    });
  });
}
creatingFirstLocalStorage();
