const express = require("express");
const mongoose = require("mongoose");
const toDoListRouter = require("./router/listRouter");
const path = require("path");
const config = require("./config/config")

// middleware
const app = express();

app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", "views");
app.set("view engine", "ejs");

app.use(toDoListRouter);

//listen to port
const port = process.env.PORT || 9696;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(config.databaseURL, options)
.then(()=>{
    app.listen(port);
    // app is listening to port
    console.log(`listening on ${port} the coolest port in the world`);
});