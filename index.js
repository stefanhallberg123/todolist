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

const dbUrl = process.env.MONGO_ATLAS_URL;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(config, dbUrl, options).then(() => {
  app.listen(port);
  console.log(`listening on ${port} the coolest port in the world`);
});
