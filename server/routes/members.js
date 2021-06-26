const express = require('express')

const member = require('../model/membermodel')

const router = express.Router()

router.get('/', async (req, res) => {
  const {
    query: { sort, license, material, customer, supplier, status, min_date, max_date, limit, skip, export_excel }
  } = req
  try {
    const payload = {}

    const scalePipeline = [
      {
        $match: {
          $expr: {
            $and: [
              { $ne: ['$deleted', true] }
            ]
          }
        }
      },
    ]
    if (export_excel && scales.length) {
      const xlsx = officegen({
        type: 'xlsx'
      })
      const sheet = xlsx.makeNewSheet()
      if (scales[0].entry_weight) {
        sheet.data[0] = [
          'Nomor Record',
          'Tanggal Masuk',
          'Tanggal Keluar',
          'Nomor Polisi',
          'Material',
          'Customer',
          'Supplier',
          'Bruto',
          'Tara',
          'Netto'
        ]
        const filteredData = scales.filter(a => a.status === 'completed')
        for (let i = 0; i < filteredData.length; i++) {
          const data = filteredData[i]
          sheet.data[i + 1] = [
            data.record,
            formatDate(data.entry_date),
            formatDate(data.exit_date),
            data.license,
            data.material,
            data.customer,
            data.supplier,
            data.entry_weight > data.exit_weight ? data.entry_weight : data.exit_weight,
            data.entry_weight > data.exit_weight ? data.exit_weight : data.entry_weight,
            Math.abs(data.entry_weight - data.exit_weight),
          ]
          if (i === filteredData.length - 1) {
            const name = `export.xlsx`
            res.writeHead(200, {
              'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              'Content-disposition': `attachment; filename=${name}`
            })
            xlsx.generate(res)
          }
        }
      } else {
        sheet.data[0] = [
          'Nomor Record',
          'Tanggal Timbang',
          'Material',
          'Customer',
          'Supplier',
          'Berat',
        ]
        for (let i = 0; i < scales.length; i++) {
          const data = scales[i]
          sheet.data[i + 1] = [
            data.record,
            formatDate(data.entry_date),
            data.material,
            data.customer,
            data.supplier,
            data.weight
          ]
          if (i === scales.length - 1) {
            const name = `export.xlsx`
            res.writeHead(200, {
              'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              'Content-disposition': `attachment; filename=${name}`
            })
            xlsx.generate(res)
          }
        }
      }}
   return res.status(200).send({ message: 'SUCCESS', payload })
      } catch (e) {
  return errorHandler(e, res)
}
})

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