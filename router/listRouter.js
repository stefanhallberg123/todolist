const express = require("express");
const ToDoList = require("../model/todolist");

const router = express.Router();

// get and post create new todo and read old
router
  .route("/createtodo")
  .get((req, res) => res.render("createtodo"))

  .post(async (req, res) => {
    await new ToDoList({ item: req.body.item }).save((error, success) => {
      if (error) {
        console.log(error);
        res.send(error._message);
      } else {
        res.redirect("/todolist");
      }
    });
  });
// get done todos and sort
router.get("/todolist", async (req, res) => {
  const sorted = req.query.sort;
  // const newTodo = await ToDoList.find().sort({ item: sorted });

  const currentPage = req.query.page || 1;
  const items = 3;
  const allTodos = await ToDoList.find();
  const amountTodos = await ToDoList.find()
    .skip((currentPage - 1) * items)
    .limit(items)
    .sort({ item: sorted });
  const pageCount = Math.ceil(allTodos.length / items);

  res.render("todolist", { amountTodos, pageCount, currentPage });
});
// delete todo on id
router.get("/delete/:id", async (req, res) => {
  await ToDoList.deleteOne({ _id: req.params.id });
  res.redirect("/todolist");
});

// update and get updated todos
router
  .route("/update/:id")
  .get(async (req, res) => {
    const update = await ToDoList.findById({ _id: req.params.id });
    res.render("edit", { update });
  })

  .post(async (req, res) => {
    await ToDoList.updateOne(
      { _id: req.params.id },
      { $set: { item: req.body.item } }
    );
    res.redirect("/todolist");
  });

module.exports = router;
