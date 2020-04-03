const express = require("express");
const toDoList = require("../model/todolist");
if (process.env.NODE_ENV !== "production") require("dotenv").config({ path: "./.env" })

const router = express.Router();

router
  .route("/createtodo")
  .get((req, res) => res.render("createtodo"))

  .post(async (req, res) => {
    await new toDoList({ item: req.body.item }).save((error, success) => {
      if (error) {
        console.log(error);
        res.send(error._message);
      } else {
        res.redirect("/todolist");
      }
    });
  });

router.get("/todolist", async (req, res) => {
  const sorted = req.query.sort;

  const currentPage = req.query.page || 1;
  const items = 5;
  const allTodos = await toDoList.find();
  const amountTodos = await toDoList.find()
    .skip((currentPage - 1) * items)
    .limit(items)
    .sort({ item: sorted });
  const pageCount = Math.ceil(allTodos.length / items);

  res.render("todolist", { amountTodos, pageCount, currentPage });
});

router.get("/delete/:id", async (req, res) => {
  await toDoList.deleteOne({ _id: req.params.id });
  res.redirect("/todolist");
});

router
  .route("/update/:id")
  .get(async (req, res) => {
    const update = await toDoList.findById({ _id: req.params.id });
    res.render("edit", { update });
  })

  .post(async (req, res) => {
    await toDoList.updateOne(
      { _id: req.params.id },
      { $set: { item: req.body.item } }
    );
    res.redirect("/todolist");
  });

module.exports = router;
