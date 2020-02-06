const express = require("express");
const ToDoList = require("../model/todolist");

const router = express.Router();

router.get("/createtodo")
    .get((req, res) => res.render("createtodo"));

router.post("/createtodo", async (req, res)=> {
    console.log(req.body)
    await new ToDoList ({ item: req.body.item }).save();
        // save((err, success)=> res.send(err._message));
        // res.redirect("/todolist");
    });

router.get("/todolist", async (req, res) => {
    const newTodo = await ToDoList.find();
    res.render("todolist", {newTodo});
});

router.get("/delete/:id", async (req,res) =>{
    console.log(req.params.id);
    await ToDoList
    .deleteOne({_id:req.params.id});
    res.redirect("/todolist");
});

router.get("/update/:id", async (req,res) =>{
    const update = await ToDoList.findById({_id:req.params.id});
    res.render("edit", {update})
});

router.post("/update/:id", async (req,res)=>{
   await ToDoList
   .updateOne({_id: req.params.id}, 
    {$set: {item: req.body.item}});
    res.redirect("/todolist");
});

module.exports = router;