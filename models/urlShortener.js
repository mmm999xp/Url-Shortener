const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlShortenerSchema = new Schema({
  url:{
    type:String,
    required: true
  },
  shortUrlRandom:{
    type: String
  }
})
module.exports = mongoose.model('UrlData',urlShortenerSchema)
