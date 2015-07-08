var unirest = require('unirest');

var BASE_URL = "https://api.telegram.org/bot84341850:AAEZgrBw8p8O6obczuhfibEY_hoy9nHxWis/";
var POLLING_URL = BASE_URL + "getUpdates?offset=:offset:&timeout=60";
var SEND_MESSAGE_URL = BASE_URL + "sendMessage";

function poll(offset) {
    var url = POLLING_URL.replace(":offset:", offset);

    unirest.get(url)
        .end(function(response) {
            var body = response.raw_body;
            if (response.status == 200) {
                var jsonData = JSON.parse(body);
                var result = jsonData.result;

                if (result.length > 0) {
                    for (i in result) {
                        if (runCommand(result[i].message)) continue;
                    }

                    max_offset = parseInt(result[result.length - 1].update_id) + 1; // update max offset
                }
                poll(max_offset);
            }
        });
};
var dosth = function(message) {
    var caps = message.text.toUpperCase();
    var answer = {
        chat_id : message.chat.id,
        text : "You told be to do something, so I took your input and made it all caps. Look: " + caps
    };

    unirest.post(SEND_MESSAGE_URL)
        .send(answer)
        .end(function (response) {
            if (response.status == 200) console.log("Successfully sent message to " + message.chat.id);
        });
};

var COMMANDS = {
    "dosth" : dosth
};

var runCommand = function(message) {
    var msgtext = message.text;
    console.log("RunCommand inside");
    if (msgtext.indexOf("/") != 0) return false; // no slash at beginning?
    var command = msgtext.substring(1, msgtext.indexOf(" "));
    if (COMMANDS[command] == null) return false; // not a valid command?
    COMMANDS[command](message);
    return true;
}
