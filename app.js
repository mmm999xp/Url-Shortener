const express = require('express')
const app = express()

app.get('/', (req,res)=>{
  res.send('This is my URL shortener !')
})

app.listen(3000,()=>{
  console.log('server is opening')
  console.log('http://localhost:3000')
})