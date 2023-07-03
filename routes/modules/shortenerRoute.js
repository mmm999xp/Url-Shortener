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

  let shortUrl = myModules.getFiveRandomChar()
  //如果短網址與原網址相同，則再度生成
  while (url === ('http://localhost:3000/shorturl/' + shortUrl)) {
    shortUrl = myModules.getFiveRandomChar()
  }

  //生成五位亂數短網址，重新導回responsepage網頁並利用query字串的方式讓responsepage也能獲取短網址變數
  urlShortenerData.create({ url, shortUrl })
    .then(() => res.redirect(`/responsepage?shortUrl=${shortUrl}`))
    .catch(error => console.log(error))

})

router.get('/responsepage', (req, res) => {
  const shortUrl = req.query.shortUrl
  res.render('responsepage', { shortUrl })
})

router.get('/shorturl/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl
  urlShortenerData.find({ shortUrl: shortUrl })
    .lean()
    .then(data => res.redirect(`${data[0].url}`))
})


module.exports = router