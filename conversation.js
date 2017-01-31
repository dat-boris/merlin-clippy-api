/**
 * Source http://www.ibm.com/watson/developercloud/doc/conversation/develop-app.html
 */

// Example 1: sets up service wrapper, sends initial message, and
// receives response.

var ConversationV1 = require('watson-developer-cloud/conversation/v1');

// Set up Conversation service wrapper.
var conversation = new ConversationV1({
  username: process.env.WATSON_USERNAME,
  password: process.env.WATSON_PASSWORD,
  path: { workspace_id: process.env.WATSON_WORKSPACE },
  version_date: '2016-07-11'
});


function ask(message, callback, context) {
  console.log("Sending message: '"+message+"'");
  conversation.message({
    input: {
      text: message,
      context: context
    }
  }, function (err, response) {
      if (err) {
        console.error(JSON.stringify(err));
        callback(null, {}, null);
      }

      // If an intent was detected, log it out to the console.
      // if (response.intents.length > 0) {
      //   console.log('Detected intent: #' + response.intents[0].intent);
      // }

      // Display the output from dialog, if any.
      if (response.output.text.length != 0) {
        callback(response.output.text.join(''), response.context)
        return;
      }
      callback(null, response.context, response);
  })
}

module.exports.ask = ask;


if (!module.parent) {
  var prompt = require('prompt-sync')();
  // Start conversation with empty message.

  function processMsg(msg, context) {
    if (msg) {
      console.log(msg + '\n');
    }

    // Prompt for the next round of input.
    var newMessageFromUser = prompt('>> ');
    ask(newMessageFromUser, processMsg, context);
  }

  // start the conversation
  ask('hello', processMsg);
}