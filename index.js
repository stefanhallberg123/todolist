const express = require("express");
const mongoose = require("mongoose");
const ToDoList = require("./router/listRouter");
const path = require("path");
const config = require("./config/config");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

const { app, port } = require("./src/server");
const dbConfig = require("./config/config");

if (process.env.NODE_ENV == "prduction") {
  dbConfig.databaseURL = process.env.MONGO_ATLAS_URL;
} else {
  const dbConfig = require("./config/config");
}

