const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const myModules = require('./lib/myModules')
const urlShortenerData = require('./models/urlShortener')
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
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req,res)=>{
  res.render('index')
})


//responseLink為收到連結時的存入資料庫並產生短網址的路由
//responsepage為回傳短網址給使用者觀看的路由
app.post('/responseLink' , (req,res)=>{
  //獲取原始網址
  let url = req.body.url
  //做個小驗證，如果不是url格式則回傳錯誤訊息
  if(!url.includes('ftp') && !url.includes('http')){
    return res.send('this is not a valid URL!')
  }
  //若url最後一個字不是'/'，則新增'/'
  if(url[url.length - 1] !== '/'){ url += '/'}

  let  shortUrl = myModules.getFiveRandomChar()
  //如果短網址與原網址相同，則再度生成
  while (url === ('http://localhost:3000/shorturl/' + shortUrl)){
    shortUrl = myModules.getFiveRandomChar()
  }

  //生成五位亂數短網址，重新導回responsepage網頁並利用query字串的方式讓responsepage也能獲取短網址變數
  urlShortenerData.create({url , shortUrl})
    .then(() => res.redirect(`/responsepage?shortUrl=${shortUrl}`))
    .catch(error => console.log(error))
  
})

app.get('/responsepage',(req,res)=>{
  const shortUrl = req.query.shortUrl
  res.render('responsepage', { shortUrl })
})

app.get('/shorturl/:shortUrl' , (req,res)=>{
  const shortUrl = req.params.shortUrl
  urlShortenerData.find({ shortUrl: shortUrl })
  .lean()
  .then(data=> res.redirect(`${data[0].url}`))
})







app.listen(3000,()=>{
  console.log('server is opening')
  console.log('http://localhost:3000')
})