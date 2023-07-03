const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

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
app.engine('hbs',exphbs({defaultLayout: 'main',extname:'.hbs'}))
app.set('view engine' , 'hbs')



app.get('/', (req,res)=>{
  res.render('index')
})

app.listen(3000,()=>{
  console.log('server is opening')
  console.log('http://localhost:3000')
})