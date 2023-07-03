//myModules為存放後端的函式

//getFiveRandomCharUrl函式功能:產生五位亂數英數字(包含大小寫及數字)
function getFiveRandomChar(){
  let answer = '' 
  const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  

  for(let i = 0 ; i < 5 ;i++){
    const randomIndex = Math.floor(Math.random() * char.length) 
    answer += char[randomIndex]
  }
  return answer
}



module.exports = {
  getFiveRandomChar
}