/**
 * Source http://www.ibm.com/watson/developercloud/doc/conversation/develop-app.html
 */

// Example 1: sets up service wrapper, sends initial message, and 
// receives response.

var ConversationV1 = require('watson-developer-cloud/conversation/v1');

// Set up Conversation service wrapper.
// XXX: dont hack me please!
var conversation = new ConversationV1({
  username: 'a6823086-f499-426b-a2ba-8987b4d38e93', // replace with username from service key
  password: 'qMqfoaLt0nXP', // replace with password from service key
  // I need to grab from the URL?
  // XXX: https://console.ng.bluemix.net/services/9291282b-758b-4d37-a7c4-60849740e8af?paneId=credentials&ace_config=%7B%22orgGuid%22%3A%22b23fd269-6222-4cba-9bd5-294703b3c04e%22%2C%22spaceGuid%22%3A%22731965c8-7248-4f2c-9c51-6e9dfefedceb%22%2C%22redirect%22%3A%22https%3A%2F%2Fconsole.ng.bluemix.net%2Fdashboard%2Fapps%22%2C%22bluemixUIVersion%22%3A%22Atlas%22%7D
  path: { workspace_id: 'a12b3de8-683b-4ecb-8bdf-8f46cc59ec69' }, // replace with workspace ID
  version_date: '2016-07-11'
});


function ask(message, callback, context) {
  conversation.message({
    input: {
      text: message,
      context: context
    }
  }, function (err, response) {
      if (err) {
        console.error(err.message)
        throw err;
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