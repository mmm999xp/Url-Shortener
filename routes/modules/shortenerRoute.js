const express = require('express')
const router = express.Router()
const urlShortenerData = require('../../models/urlShortener')
const myModules = require('../../lib/myModules')

//responseLink為收到連結時的存入資料庫並產生短網址的路由
//responsepage為回傳短網址給使用者觀看的路由
router.post('/responseLink', (req, res) => {
  //獲取原始網址
  let url = req.body.url
  //做個小驗證，如果不是url格式則回傳錯誤訊息
  if (!url.includes('ftp') && !url.includes('http')) {
    return res.send('this is not a valid URL!')
  }
  //若url最後一個字不是'/'，則新增'/'
  if (url[url.length - 1] !== '/') { url += '/' }

  let shortUrlRandom = myModules.getFiveRandomChar()
  //如果短網址與原網址相同，則再度生成
  while (url === ('http://localhost:3000/' + shortUrlRandom)) {
    shortUrlRandom = myModules.getFiveRandomChar()
  }

  //如果輸入已經存在資料庫的網址，則直接回傳資料庫中該網址的的五位亂數
  urlShortenerData.findOne({ url: url })
  .lean()
  .then((data) => {
    console.log(data)
    //如果有資料，不必新增進資料庫，重新導回responsepage網頁並利用query字串的方式讓responsepage也能獲取短網址變數
    if(data){
      //url = data.url
      res.redirect(`/responsepage?shortUrl=${data.shortUrlRandom}`)
    } else {
      //如果找不到資料生成五位亂數短網址，重新導回responsepage網頁並利用query字串的方式讓responsepage也能獲取短網址變數
      urlShortenerData.create({ url, shortUrlRandom })
        .then(() => res.redirect(`/responsepage?shortUrl=${shortUrlRandom}`))
        .catch(error => console.log(error))
    }
  })
  .catch(error => console.log(error))
 


  

})

router.get('/responsepage', (req, res) => {
  const shortUrlRandom = req.query.shortUrl
  res.render('responsepage', { shortUrlRandom })
})

router.get('/:shortUrlRandom', (req, res) => {
  const shortUrlRandom = req.params.shortUrlRandom
  urlShortenerData.find({ shortUrlRandom: shortUrlRandom })
    .lean()
    .then(data => res.redirect(`${data[0].url}`))
    .catch(error => console.log(error))
})


module.exports = router