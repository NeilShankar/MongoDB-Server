const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
   Key: String,
   Data: Array,
   DataType: String
})

const Data = mongoose.model('Data', schema)

module.exports = {Data , schema}