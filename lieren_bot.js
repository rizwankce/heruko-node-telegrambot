var Bot = require('node-telegram-bot');
var unirest = require('unirest');
var algoliasearch = require('algoliasearch');
var http = require('http');

var client = algoliasearch('0H4SMABBSG', '9670d2d619b9d07859448d7628eea5f3');
var index = client.initIndex('Post_production');


var bot = new Bot({
  token: '84341850:AAEZgrBw8p8O6obczuhfibEY_hoy9nHxWis'
})
.on('message', function (message) {
  console.log(message);
  if (message.text) {
    index.search(message.text, function searchDone(err, content) {
      console.log("search results "+content);
      if (err) {
        var answer = {
            chat_id : message.chat.id,
            disable_web_page_preview : true,
            text : "Oh Snap! I coudn't find any results from Product hunt. Check back later"
        };
      }
      else if (content.hits.length > 0){
        var hits = content.hits;
        var answerText = "\n";
        var length = hits.length > 5 ? 5 : hits.length;
        for (var i = 0; i < length; i++) {
          j = i+1;
          answerText = answerText + "\n"+j+". "+ hits[i].name + " - "+hits[i].tagline +"\n"+ hits[i].url+"\n";
        }
        var answer = {
            chat_id : message.chat.id,
            disable_web_page_preview : true,
            text : "Here you go! Top five results for "+message.text+ answerText
        };


      }
      else {
        var answer = {
            chat_id : message.chat.id,
            disable_web_page_preview : true,
            text : "Oh Snap! I coudn't find any results from Product hunt. Check back later"
        };
      }
      bot.sendMessage(answer,function(){
        console.log("\n Message has been sent \n with text"+answer.text);
        console.log("\n chat id"+answer.chat_id);
      });
    });
  }
  else {
    var answer = {
      chat_id : message.chat.id,
      disable_web_page_preview : true,
      text : "Hey trying to trick me or what? Send me some search text so that i can search on bahalf of you."
    };
    bot.sendMessage(answer,function(){
    console.log("Message has been sent"+answer);
    });
  }

})
.start();


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Node.js\n');
}).listen(process.env.PORT || 5000);
console.log('Server running at http://127.0.0.1:'+process.env.PORT);
