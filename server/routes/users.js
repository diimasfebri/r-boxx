const express = require('express')

const user = require('../model/usermodel')

const router = express.Router()

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
    if (!attendee)
      throw new Error('USER_NOT_FOUND')
    if (password !== attendee.password)
      throw new Error('PASSWORD_NOT_FOUND')
    // mengambil id dari mongodb nya langsung 
    return res.send({
      message: 'SUCCESS', user: attendee._id, nama: attendee.name , role: attendee.role 
    })

  } catch (e) {
    const { message } = e
    if (message === 'INVALID_REQUEST') res.status(404).send({ message })
    else res.status(500).send({ message })
  }
})

router.get('/', async (req, res)=>{
	try{
		const {
			query: { id }
		} = req
		console.log(req)
		let payload = null
		if (id) payload = await taskModel.findById(id).exec()
		else payload = await taskModel.find({}).exec()
		res.send(payload)
	}catch(e){
		res.status(400).send(e.message)
	}
})

module.exports = router