import express from "express";
import mongoose from "mongoose";
import ToDoList from "./router/listRouter";
import path from "path";
import config from "./config/config";
import bodyParser from "body-parser";
import fs from "fs";
import ejs from "ejs"

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

function ejs2html({ path, outPath, data, options }) {
  fs.readFile(path, "utf8", function(err, data) {
    if (err) {
      console.log(err);
      return false;
    }
    ejs.renderFile(path, data, options, (err, html) => {
      if (err) {
        console.log(err);
        return false;
      }
      fs.writeFile(outPath, html, function(err) {
        if (err) {
          console.log(err);
          return false;
        }
        return true;
      });
    });
  });
}

ejs2html({
  path: `${__dirname}/views/todolist.ejs`,
  outPath: `${__dirname}/public/index.html`
});
