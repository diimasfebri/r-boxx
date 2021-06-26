const express = require('express')

const member = require('../model/membermodel')

const router = express.Router()

router.post('/newmember', async (req, res) => {
  const {
    body: { name, NIK, }
  } = req
  try {
    if (typeof name !== 'string' || name.length === 0)
      throw new Error('INVALID_REQUEST')
    if (NIK.length === 0)
      throw new Error('INVALID_REQUEST')
    //INPUT DATA KE DATABASE
    const newMember = new member({
      name, NIK, rewards: null, transaction: null, create_date: new Date()
    })
    await newMember.save()
    return res.send({ message: 'SUCCESS', member: newMember })
  } catch (e) {
    const { message } = e
    if (message === 'INVALID_REQUEST') res.status(404).send({ message })
    else res.status(500).send({ message })
  }
})

router.post('/memberinput', async (req, res) => {
  const {
    body: { NIK , }
  } = req
  try {
    //CEK
    const attendee = await member.findOne({ NIK }).exec()
    if (!attendee)
      throw new Error('USER_NOT_FOUND')
    // mengambil id dari mongodb nya langsung 
    return res.send({
      message: 'SUCCESS',  NIK: attendee.NIK, 
    })

  } catch (e) {
    const { message } = e
    if (message === 'INVALID_REQUEST') res.status(404).send({ message })
    else res.status(500).send({ message })
  }
})

router.get('/', async  (req, res) => {
  try {
    const {
      query: { id }
    } = req  
    if (!id) throw new Error('UNAUTHORIZED')
    //ngambil semua data dari database ke variabel "members"
    const members = await member.find({ u_id: id }).exec()
    //kita tambahhkan field "editMode" agar dapat diedit di frontend. "_doc" tempat menyimpan data members, memang dari mongoDB
    return res.send({ message: 'SUCCESS', members: members  .map((member) => ({ ...member._doc, editMode: false })) })
  } catch (e) {
    const { message } = e
    if (message === 'UNAUTHORIZED') res.status(401).send({ message })
    return res.status(500).send({ message })
  }
})
module.exports = router