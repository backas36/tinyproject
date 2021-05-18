const request = require('request')
const url = 'https://pda.5284.gov.taipei/MQS/route.jsp?rid='

const getBusData = (number, callback) => {
  request.get(url + number, (err,res)=>{
    if (err) {
      callback(err)
    }
    callback(null, res.body)
  })
}

//找整串 bus <td> </td>
getBusData(15112, (err,html)=> {
  if(err){
    return console.log(err)
  }
  let result = getStopInfo(html)
  console.log(result.join('\n'))
})

//找整頁的 bus ,<td></td> 放入陣列
const getStopInfo = (html) => {
  let result = []
  let start = 0
  let end, str
  while (start >=0) {
    
    start = html.indexOf('<tr class="ttego',start+1  )
    end = html.indexOf('</a>',start)
    let str = html.slice(start,end)
    //str = str.replace(/<\/td>/g,'')

    // 抓取進站時間，但網站已不能用了 Ｔ．Ｔ
    //let lastSymbol = str.lastIndexOf('>')
    ////let stopInfo = str.slice(lastSymbol + 1, str.length)
 
    //let newStr = str.slice(0, lastSymbol)

    let data = parseData(str)

    result.push(data['公車站名'] + ' ' + data['動態'] )
  }
  //console.log(html)
  return result
}

const parseData = (str) => {
    
    let lastSymbol = str.lastIndexOf('>')
    let stopName = str.slice(lastSymbol + 1, str.length)
    return {
      公車站名:stopName,
      動態:''
    }
}