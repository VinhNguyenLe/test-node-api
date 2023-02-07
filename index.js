const express = require("express")
const bodyParser = require("body-parser")
const router = require("./routers/account")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const path = require("path")

dotenv.config()

const app = express()
const MONGO_DB = process.env.MONGO_DB
const PORT = process.env.PORT

app.use("/public", express.static(path.join(__dirname, "/public")))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.set("strictQuery", true)
mongoose
  .connect(MONGO_DB)
  .then(console.log("DB connected"))
  .catch((err) => console.log(err))

app.use("/api/account", router)

app.use("/", (req, res) => {
  const pathURL = path.join(__dirname, "index.html")
  res.sendFile(pathURL)
})

app.listen(PORT, () => {
  console.log("http://localhost:3000")
})
