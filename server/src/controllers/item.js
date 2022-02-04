const { item, list } = require("../../models")
const _ = require("lodash")

exports.getItems = async (req, res) => {
  try {
    const listName = _.startCase(_.toLower(req.params.listName))

    let data = await list.findOne({
      where: { name: listName },
      include: {
        model: item,
        as: "listItem",
        attributes: {
          exclude: ["createdAt"],
        },
      },
      attributes: ["id", "name"],
    })
    if (!data) {
      data = {
        name: listName,
        listItem: [],
      }
    }
    res.status(200).send({
      status: "success",
      data,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "Failed",
      message: "Failed get todolist",
    })
  }
}

exports.updateItem = async (req, res) => {
  try {
    console.log(req.body)
    const id = req.params.idItem
    await item.update({ ...req.body }, { where: { id } })
    res.status(200).send({
      status: "succes",
      message: "Item updated",
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "Failed",
      message: "Item update failed",
    })
  }
}

exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.idItem
    await item.destroy({
      where: { id },
    })
    res.status(200).send({
      status: "Success",
      message: "Item deleted",
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "Failed",
      message: "Delete item failed",
    })
  }
}
