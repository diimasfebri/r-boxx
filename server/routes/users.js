const express = require('express')
const bcrypt = require('bcrypt')

const { promisify } = require('util')
const { generateToken, verifyToken } = require('../plugins/tokens')

const hash = promisify(bcrypt.hash)
const compare = promisify(bcrypt.compare)
const genSalt = promisify(bcrypt.genSalt)

// const { generateToken, verifyToken } = require('../plugins/tokens')

const user = require('../model/usermodel')


const router = express.Router()

router.post('/refresh-token', async (req, res) => {
  const {
    body: { token }
  } = req
  try {
    if (!token) throw new Error('INVALID_REQUEST')
    const { sub,  username } = verifyToken(token)
    if (!sub  || !username) throw new Error('UNAUTHORIZED')
    const newToken = generateToken(sub, { username })
    return res.status(200).send({ message: 'SUCCESS', token: newToken,  username })
  } catch (e) {
    return errorHandler(e, res)
  }
})

router.post('/signup', async (req, res) => {
  const {
    body: { name, username, password }
  } = req
  try {
    const count = await user.find({}).countDocuments().exec()
    if (!count) {
      if (
        typeof username !== 'string' || !username.length ||
        typeof password !== 'string' || !password.length
      ) throw new Error('INVALID_REQUEST')
      const salt = await genSalt(10)
      const newUser = new user({
        name,
        username,
        password: await hash(password, salt),
        create_date: new Date()
      })
      await newUser.save()
      return res.status(200).send({ message: 'SUCCESS', user :newUser  })
    } else {
      if (
        typeof username !== 'string' || !username.length ||
        typeof password !== 'string' || !password.length 
      ) throw new Error('INVALID_REQUEST')
      if (await user.findOne({ username }).exec()) throw new Error('USER_ALREADY_EXIST')
      const salt = await genSalt(10)
      const NewUser = new user({
        name,
        username,
        password: await hash(password, salt),
        create_date: new Date()
      })
      await NewUser.save()
      return res.status(200).send({ message: 'SUCCESS' })
    }
  } catch (e) {
    const { message } = e
    if (message === 'INVALID_REQUEST') res.status(404).send({ message })
    else res.status(500).send({ message })  }
})
router.post('/signin', async (req, res) => {
  const {
    body: { username, password }
  } = req
  try {
    if (!username || !password) throw new Error('INVALID_REQUEST')
    const attendee = await user.findOne({ username }).exec()
    if (!attendee) throw new Error('INVALID_COMBINATION')
    if (!await compare(password, attendee.password)) throw new Error('INVALID_COMBINATION')
    const token = generateToken(attendee._id.toString(), { username })
    return res.status(200).send({ message: 'SUCCESS', token, user: attendee._id, name: attendee.name })
  } catch (e) {
    const { message } = e
    if (message === 'INVALID_REQUEST') res.status(404).send({ message })
    else res.status(500).send({ message })  }
})

module.exports = router