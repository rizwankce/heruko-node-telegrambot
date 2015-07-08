var Bot = require('node-telegram-bot');
var unirest = require('unirest');
var algoliasearch = require('algoliasearch');

var client = algoliasearch('applicationID', '0H4SMABBSG');
var index = client.initIndex('Post_production');


var bot = new Bot({
  token: '84341850:AAEZgrBw8p8O6obczuhfibEY_hoy9nHxWis'
})
.on('message', function (message) {
  console.log(message);
  index.search(message.text, function searchDone(err, content) {
    console.log(err, content);
  });
  var caps = message.text.toUpperCase();
  var answer = {
      chat_id : message.chat.id,
      text : "You told be to do something, so I took your input and made it all caps. Look: " + caps
  };
    bot.sendMessage(answer,function(){
    console.log("sucess of the india");
  });
})
.start();
