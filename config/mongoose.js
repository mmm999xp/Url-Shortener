const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })


const db = mongoose.connection
db.on('error', () => {
  console.log('MongoDB Error !')
})
db.once('open', () => {
  console.log('MongoDB Connecrted !')
})

module.exports = db