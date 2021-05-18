const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxd4a40f661f4147b08c1dbee345c0b581.mailgun.org';
const api_key = '639b31af330cdeeb231aa262ca9125ae-6ae2ecad-1c64744e'
const mg = mailgun({apiKey:api_key, domain: DOMAIN});


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

send('backas36+ashi@gmail.com','主旨','this is 內容', function(error,data){
  if (error) {
    return console.log(error)
  }
  console.log(data)
})