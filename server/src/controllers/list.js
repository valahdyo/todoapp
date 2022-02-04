const { item, list } = require("../../models")
const _ = require("lodash")

exports.createTodo = async (req, res) => {
  try {
    const listName = _.startCase(_.toLower(req.params.listName))
    let newList = await list.findOne({ where: { name: listName } })

    if (!newList) {
      await list.create({ name: listName })
    }
    let foundList = await list.findOne({ where: { name: listName } })
    const data = await item.create({ ...req.body, idList: foundList.id })
    res.status(200).send({
      status: "success",
      message: "Create to do list success",
    })
  } catch (error) {
    console.log(error)
    res.status(501).send({
      status: "Failed",
      message: "Create to do list failed",
    })
  }
}

exports.checkList = async (req, res) => {
  try {
    const listName = _.startCase(_.toLower(req.params.listName))
    const newList = await list.findOne({ where: { name: listName } })

    if (!newList) {
      await list.create({ name: listName })
    }

    res.status(200).send({
      status: "Succes",
      message: "List created / found",
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "Failed",
      message: "List check failed",
    })
  }
}
