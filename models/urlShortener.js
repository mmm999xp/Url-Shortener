const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlShortenerSchema = new Schema({
  url:{
    type:String,
    required: true
  }
})
module.exports = mongoose.model('UrlData',urlShortenerSchema)
