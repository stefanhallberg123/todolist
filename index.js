const express = require("express");
const mongoose = require("mongoose");
const ToDoList = require("./router/listRouter");
const path = require("path");
const config = require("./config/config");

// middleware
const app = express();


app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));

// underst route
app.use(ToDoList);

app.use(express.static(path.join(__dirname, "public")));

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