const express = require("express");
const app = express();
//static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/images", express.static(__dirname + "public/images"));
app.use("/data", express.static(__dirname + "public/data"));

//set up server
app.listen(3000);
// -views
app.set("views", "./views");
app.set("view engine", "ejs");
// -pages
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/creator", (req, res) => {
  res.render("creator");
});

//external scripts
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));
app.use(
  "/filesaver",
  express.static(__dirname + "/node_modules/file-saver/dist/")
);
app.use(
  "/domtoimage",
  express.static(__dirname + "/node_modules/dom-to-image/dist/")
);

// //fetching data

// const fs = require("fs");

// fs.readFile(
//   __dirname + "/public/data/creatorElements.json",
//   "utf8",
//   (err, jsonString) => {
//     if (err) {
//       console.log("File read failed:", err);
//       return;
//     }
//     console.log("File data:", jsonString);
//   }
// );
