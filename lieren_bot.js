var Bot = require('node-telegram-bot');
var unirest = require('unirest');
var algoliasearch = require('algoliasearch');

var client = algoliasearch('0H4SMABBSG', '9670d2d619b9d07859448d7628eea5f3');
var index = client.initIndex('Post_production');


var bot = new Bot({
  token: '84341850:AAEZgrBw8p8O6obczuhfibEY_hoy9nHxWis'
})
.on('message', function (message) {
  console.log(message);
  index.search(message.text, function searchDone(err, content) {
    console.log(err, content);
    var hits = content.hits;
    var answerText = "\n";
    for (var i = 0; i < 5; i++) {
      j = i+1;
      answerText = answerText + "\n"+j+". "+ hits[i].name + " - "+hits[i].tagline +"\n"+ hits[i].url+"\n";
    }
    var answer = {
        chat_id : message.chat.id,
        disable_web_page_preview : true,
        text : "Here you go! Top five results for "+message.text+ answerText
    };
      bot.sendMessage(answer,function(){
      console.log("sucess of the india");
  });
  var caps = message.text.toUpperCase();

  });
})
.start();
