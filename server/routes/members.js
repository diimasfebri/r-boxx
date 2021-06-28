const express = require('express')

const member = require('../model/membermodel')

const router = express.Router()


//buat bikin member baru
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
    return res.status(200).send({ message: 'SUCCESS', member: newMember })
  } catch (e) {
    const { message } = e
    if (message === 'INVALID_REQUEST') res.status(404).send({ message })
    else res.status(500).send({ message })
  }
})

//buat edit member
router.put('/edit', async (req, res) => {
  const {
    body: { name, NIK, transaction , rewards },
    params: { _id },
    query : { id } 
  }
  
   = req

  try {
    //cek id 
    const issuer = await member.findById({ _id }).exec()
    if (!issuer) throw new Error('MEMBER_NOT_FOUND')
    if (typeof name === 'string') issuer.name = name 
    if (typeof NIK === 'string') issuer.NIK = NIK
    if (typeof transaction === 'string') issuer.transaction = transaction
    if (typeof rewards === 'string') issuer.rewards = rewards
    if (id !== issuer.u_id) throw new Error('UNAUTHORIZED')
    //script untuk update data 
    await member.updateOne({ _id }, {
      //"task" sudah mencakup notes,titles,is_done seperti script diatas
      $set: issuer 
    }).exec()
    return res.status(200).send({ message: 'SUCCESS', member: issuer })
  } catch (e) {
    const {message} = e
    if (message === 'TASK_NOT_FOUND') res.status(404).send({ message })
    else res.status(500).send({message})
  }
})

//buat cari member 
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
    return res.status(200).send({
      message: 'SUCCESS',  NIK: attendee.NIK, 
    })

  } catch (e) {
    const { message } = e
    if (message === 'INVALID_REQUEST') res.status(404).send({ message })
    else res.status(500).send({ message })
  }
})

//buat delete member
router.delete('/delete/:_id', async (req, res) => {
  const {
    params: { _id },
    query : { id }
  } = req
  try {
    //cek id
    if (!id) throw new Error('UNAUTHORIZED')
    //script delete task
    const issuer = await member.findById({ _id }).exec()
    if (!issuer) throw new Error('issuer_NOT_FOUND')
    if (id !== issuer.u_id) throw new Error('UNAUTHORIZED')
    await member.deleteOne({ _id }).exec()
    return  res.status(200).send({ message : 'SUCCESS'})
  } 
  catch (e) { 
    const{message} = e
    if (message === 'TASK_NOT_FOUND') res.status(404).send({ message })
    else res.status(500).send({message})
  }
})

//buat load member
router.get('/', async  (res) => {
  try {
    const payload = {}
    const memberPipeline = []
    const members = await member.aggregate(memberPipeline).exec()
    payload.members = members
    return res.send({ message: 'SUCCESS', payload })
  } catch (e) {
    const { message } = e
    if (message === 'UNAUTHORIZED') res.status(401).send({ message })
    return res.status(500).send({ message })
  }
})
module.exports = router