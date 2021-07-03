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
      name, NIK, rewards: 0, transaction: 0, create_date: new Date()
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
router.put('/member-edit/:_id', async (req, res) => {
  const {
    body: { name, NIK},
    params: { _id },
  }= req
  try {
    //cek id 
    const issuer = await member.findOne({ _id }).exec()
    if (!issuer) throw new Error('MEMBER_NOT_FOUND')
    if (typeof name === 'string') issuer.name = name 
    if (typeof NIK === 'string') issuer.NIK = NIK
    //script untuk update data 
    await member.updateOne({ _id }, {
      //"task" sudah mencakup notes,titles,is_done seperti script diatas
      $set: {...issuer} 
    }).exec()
    return res.status(200).send({ message: 'SUCCESS', member: issuer })
  } catch (e) {
    const {message} = e
    if (message === 'TASK_NOT_FOUND') res.status(404).send({ message })
    else res.status(500).send({message})
  }
})

//buat delete member
router.delete('/:_id', async (req, res) => {
  const {
    params: { _id },
  } = req
  try {
    //script delete task
    const issuer = await member.findById({ _id }).exec()
    if (!issuer) throw new Error('issuer_NOT_FOUND')
    await member.deleteOne({ _id }).exec()
    return  res.status(200).send({ message : 'SUCCESS'})
  } 
  catch (e) { 
    const{message} = e
    if (message === 'TASK_NOT_FOUND') res.status(404).send({ message })
    else res.status(500).send({message})
  }
})

//buat cari member 
router.get('/memberinput', async (req, res) => {
  const {
    query: { query }
  } = req
  try {
    if (!query) throw new Error ('INVALID REQUEST')
    const regex = query.split(' ').map((a) => `(${a})`).join('|')
    const membersPipeline = [
      {
        $match: {
          $expr: {
            $and: [
              {
                $or: [
                  {
                    $regexMatch: {
                      input: '$name',
                      options: 'i',
                      regex
                    }
                  },
                  {
                    $regexMatch: {
                      input: '$NIK',
                      options: 'i',
                      regex
                    }
                  }
                ]
              },
            ]
          },
        }
      }
    ] 
    const members = await member.aggregate(membersPipeline).exec()
    return res.status(200).send({message: 'SUCCESS',  members })

  } catch (e) {
    const { message } = e
    if (message === 'INVALID_REQUEST') res.status(404).send({ message })
    else res.status(500).send({ message })
  }
})


// buat load member
router.get('/', async  (req, res) => {
  try {
    const payload = {}
    const memberPipeline = [{
      $match: {
        $expr: {
          //$ne untuk mencari id yang tidak null, untuk di sebarkan 
          $ne: ['$_id', null]
        }
      }
    }]
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