const express = require("express")
const router = require("./src/routes")
const cors = require("cors")
const app = express()

require("dotenv").config()

app.use(express.json())
app.use(cors())
app.use("/api/v1/", router)

let port = process.env.PORT
if (port == null || port == "") {
  port = 5000
}
app.listen(port, () => {
  console.log(`Server has started on port ${port}`)
})
