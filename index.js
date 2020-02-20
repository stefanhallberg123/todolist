const express = require("express");
const mongoose = require("mongoose");
const ToDoList = require("./router/listRouter");
const path = require("path");
const config = require("./config/config");
const bodyParser = require("")

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const app = express();

app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(ToDoList);

const port = process.env.PORT || 9696;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(config.databaseURL, options).then(() => {
  app.listen(port);
  console.log(`listening on ${port} the coolest port in the world`);
});
