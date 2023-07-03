const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes/index')
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
require('./config/mongoose')


const app = express()
app.engine('hbs',exphbs({defaultLayout: 'main',extname:'.hbs'}))
app.set('view engine' , 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(routes)


app.listen(3000,()=>{
  console.log('server is opening')
  console.log('http://localhost:3000')
})