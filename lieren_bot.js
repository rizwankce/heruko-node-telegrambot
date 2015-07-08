var Bot = require('node-telegram-bot');

var bot = new Bot({
  token: '84341850:AAEZgrBw8p8O6obczuhfibEY_hoy9nHxWis'
})
.on('message', function (message) {
  console.log(message);
})
.start();
