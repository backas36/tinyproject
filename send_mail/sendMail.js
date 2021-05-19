const mailgun = require("mailgun-js");
const fs = require('fs');
const DOMAIN = 'sandboxd4a40f661f4147b08c1dbee345c0b581.mailgun.org';
const api_key = 'key-68872e8beec5c2daac3308e624b2e0d2'
const mg = mailgun({apiKey:api_key, domain: DOMAIN});

const data = fs.readFileSync('./mail_list.txt','utf8')
const emails = data.split('\n')
  .filter(email=> email !=='')
  .map(email=>({
    to:email.split(' ')[0],
    name:email.split(' ')[1]
  }))
  //如果沒有用 ()包起來，js 不能理解我們要回傳的是 object

const subjectTemplate = `Long time no see, {{name}}`
const messageTemplate = `
  Hello, {{name}}
  How are you today?
`
// 寄給 emails[index] 
const sendEmailIndex = (index) => {
  if (index >= emails.length) return 
  // 如果 index 超過 emails 長度 就不執行
  let {to,name} = emails[index]
  console.log(`sending email to ${to} now ...`)
  send(
    to,
    subjectTemplate.replace('{{name}}', name),
    messageTemplate.replace('{{name}}', name),
    function (err, body) {
      if (err) {
        return console.log('QQ', err)
      }
      console.log(body)
      sendEmailIndex(index +1 )
    }
  )
}

const send = (to, subject, text, callback) => {
  const data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to,
    subject,
    text
  };
  mg.messages().send(data, function (error, body) {
    callback(error,body)
  });
}

sendEmailIndex(0)