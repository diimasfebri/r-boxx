const express = require('express')
const bcrypt = require('bcrypt')


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
    const { sub, role, username } = verifyToken(token)
    if (!sub || !role || !username) throw new Error('UNAUTHORIZED')
    const newToken = generateToken(sub, { role, username })
    return res.status(200).send({ message: 'SUCCESS', token: newToken, role, username })
  } catch (e) {
    return errorHandler(e, res)
  }
})

router.post('/signup', async (req, res) => {
  const {
    body: { name, username, password, role }
  } = req
  try {
    if (typeof username !== 'string' && username.length === 0)
      throw new Error('INVALID_REQUEST')
    if (password.length === 0 && typeof password !== 'string')
      throw new Error('INVALID_REQUEST')
    if (name.length === 0 && typeof name !== 'string')
      throw new Error('INVALID_REQUEST')
    if (role.length === 0 && typeof role !== 'string')
      throw new Error('INVALID_REQUEST')
    //INPUT DATA KE DATABASE
    const newAkun = new user({
      name, username, password, role, create_date: new Date()
    })
    await newAkun.save()
    return res.send({ message: 'SUCCESS', user: newAkun })
  } catch (e) {
    const { message } = e
    if (message === 'INVALID_REQUEST') res.status(404).send({ message })
    else res.status(500).send({ message })
  }
})


router.post('/signin', async (req, res) => {
  const {
    body: { username, password }
  } = req
  try {
    //CEK
    const attendee = await user.findOne({ username }).exec()
    if (!attendee) throw new Error('USER_NOT_FOUND')
    if (password !== attendee.password)
      throw new Error('PASSWORD_NOT_FOUND')
    // mengambil id dari mongodb nya langsung 
    const token = generateToken(user._id.toString(), { role: user.role, username })
    return  res.status(200).send({  message: 'SUCCESS', token, user: attendee._id, name: attendee.name , role: attendee.role 
    })

  } catch (e) {
    const { message } = e
    if (message === 'INVALID_REQUEST') res.status(404).send({ message })
    else res.status(500).send({ message })
  }
})


module.exports = router