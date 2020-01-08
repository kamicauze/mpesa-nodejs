function pad2(n) { return n < 10 ? '0' + n : n }

const shortcode= '174379'
const passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
date = new Date()
let timestamp = date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2( date.getDate()) + pad2( date.getHours() ) + pad2( date.getMinutes() ) + pad2( date.getSeconds() );

let passwordgen = Buffer.from(shortcode+passkey+timestamp).toString('base64') 

// console.log(passwordgen)

module.exports.password = passwordgen

module.exports.timestamp = timestamp

