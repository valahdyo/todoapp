const express = require("express")

const router = express.Router()

//Import Controller
const { createTodo, checkList } = require("../controllers/list")
const { getItems, updateItem, deleteItem } = require("../controllers/item")

router.post("/create/:listName", createTodo)
router.get("/list/:listName", checkList)
router.get("/items/:listName", getItems)
router.patch("/item/:idItem", updateItem)
router.delete("/item/:idItem", deleteItem)

module.exports = router
