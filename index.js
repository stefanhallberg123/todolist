import express from "express";
import mongoose from "mongoose";
import router from "./router/listRouter";
import path from "path";
import config from "./config/config";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(router);

const port = process.env.PORT || 9696;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(config.databaseURL, options).then(() => {
  app.listen(port);
  console.log(`listening on ${port} the coolest port in the world`);
});
