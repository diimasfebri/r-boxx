const express = require('express')

const member = require('../model/membermodel')

const router = express.Router()

router.post('/newmember', async (req, res) => {
  const {
    body: { name, NIK, rewards }
  } = req
  try {
    if (typeof name !== 'string' || name.length === 0)
      throw new Error('INVALID_REQUEST')
    if (NIK.length === 0 && typeof NIK !== 'integer')
      throw new Error('INVALID_REQUEST')
    //INPUT DATA KE DATABASE
    const newMember = new member({
      name, NIK, rewards, create_date: new Date()
    })
    await newMember.save()
    return res.send({ message: 'SUCCESS', member: newMember })
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