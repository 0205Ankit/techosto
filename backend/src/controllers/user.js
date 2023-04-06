const { default: axios } = require('axios')
const User = require('../db/User')
const logger = require('../helpers/logger')
const { default: mongoose } = require('mongoose')

class UserController {
  static async getUsers(_req, res) {
    try {
      const allUsers = await User.find({})

      return res.status(200).json(allUsers)
    } catch (error) {
      logger.error(error)
      return res.status(400).json(error)
    }
  }

  static async updateLike(req, res) {
    const userId = req.params.id

    try {
      const updatedUser = await User.updateOne({ _id: userId }, { like: true })

      res.status(200).json(updatedUser)
    } catch (error) {
      logger.error(error)
      res.status(500).json(error)
    }
  }

  static async removeLike(req, res) {
    const userId = req.params.id

    try {
      const updatedUser = await User.updateOne({ _id: userId }, { like: false })

      res.status(200).json(updatedUser)
    } catch (error) {
      logger.error(error)
      res.status(500).json(error)
    }
  }

  static async UpdateUser(req, res) {
    const data = req.body;
    const userId = req.params.id

    try {
      const updatedUser = await User.updateOne({ _id: userId }, data)

      res.status(200).json(updatedUser)
    } catch (error) {
      logger.error(error)
      res.status(500).json(error)
    }
  }

  static async deleteUser(req, res) {
    const userId = req.params.id;

    try {

      await User.deleteOne({ _id: userId })

      logger.info(`Deleted user with id: ${userId}`)
      return res.sendStatus(202)
    } catch (error) {
      logger.error(error)
      res.status(500).json(error)
    }
  }

  static async refreshUserList(_req, res) {
    try {
      logger.info("Deleting all users")
      await User.deleteMany({})

      logger.info("Deleted all Users, now inserting new list")

      const userRes = await axios.get('https://jsonplaceholder.typicode.com/users')
      const serializeUserData = serializeData(userRes.data)

      const insertedData = await User.insertMany(serializeUserData)
      res.send(insertedData)
    } catch (error) {
      logger.error(error)
      res.status(500).json(error)
    }
  }
}

function serializeData(data) {
  return data.map((item) => ({
    _id: new mongoose.Types.ObjectId(),
    name: item.name,
    email: item.email,
    username: item.username,
    website: item.website,
    phone: item.phone
  }))
}

module.exports = UserController
