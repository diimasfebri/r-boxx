const { Schema, model } = require('mongoose')

const membersSchema = Schema({
  name: {
    type: String,
    required: true
  },
  NIK: {
    type: String,
    required: true
  },
  transaction: {
    type: String,
    required: false,
  }, 
  rewards: {
    type: Number,
    required:false
  },
  create_date: {
    type: Date,
    default: Date.now()
  }

})
module.exports = model('members', membersSchema)