const express = require('express')
const mongoose = require('mongoose')

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error' , ()=>{
  console.log('MongoDB Error !')
})
db.once('open' , ()=>{
  console.log('MongoDB Connecrted !')
})






const app = express()

app.get('/', (req,res)=>{
  res.send('This is my URL shortener !')
})

app.listen(3000,()=>{
  console.log('server is opening')
  console.log('http://localhost:3000')
})