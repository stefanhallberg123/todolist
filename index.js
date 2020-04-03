import express from "express";
import mongoose from "mongoose";
import router from "./router/listRouter";
import path from "path";
import config from "./config/config";

const app = express();

app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(router);


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const port = process.env.PORT || 1996;

mongoose.connect(config.databaseURL, options).then(() => {
  app.listen(port);
  console.log(`listening on ${port} the coolest port in the world`);
});
