const express = require("express")
const AccountModel = require("../models/Account")

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const allData = await AccountModel.find()

    return res.status(200).send(allData)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const data = await AccountModel.findById(req.params.id)

    if (data) {
      return res.status(200).send(data)
    }
    res.status(404).send("404 not found!")
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body
    const havedUsername = await AccountModel.findOne({ username })

    if (havedUsername !== null) {
      return res.status(409).json("The username existed!")
    }

    await AccountModel.create({ username, password })

    res.json(`Register with username: ${username} successful!`)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body

    const havedUsername = await AccountModel.findOne({ username })

    if (havedUsername) {
      if (havedUsername.password === password) {
        res.json(havedUsername)
      } else {
        res.status(400).json("Wrong password!")
      }
    } else {
      res.status(400).json("Username doesn't exists!")
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const { password } = req.body
    if (req.params.id) {
      const updateUser = await AccountModel.findByIdAndUpdate(req.params.id, {
        password,
      })
      return res.status(200).json(`Update new password for user ${updateUser.username} successful!`)
    }
    res.status(400).json("User doesn't exists!")
  } catch (error) {
    res.status(500).json(error)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const { password } = req.body
    if (req.params.id) {
      const updateUser = await AccountModel.findByIdAndDelete(req.params.id, {
        password,
      })
      return res.status(200).json(`Delete user ${updateUser.username} successful!`)
    }
    res.status(400).json("User doesn't exists!")
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
