// Import the APIs we need.
var contextMenu = require("context-menu");
var request = require("request");
var selection = require("selection");
 
exports.main = function(options, callbacks) {
  //console.log(options.loadReason);
 
  // Create a new context menu item.
  var menuItem = contextMenu.Item({
 
    label: "Translate Selection",
 
    // Show this item when a selection exists.
 
    context: contextMenu.SelectionContext(),
 
    // When this item is clicked, post a message to the item with the
    // selected text and current URL.
    contentScript: 'on("click", function () {' +
                   '  var text = window.getSelection().toString();' +
                   '  postMessage(text);' +
                   '});',
 
    // When we receive the message, call the Google Translate API with the
    // selected text and replace it with the translation.
    onMessage: function (text) {
      if (text.length == 0) {
        throw ("Text to translate must not be empty");
      }
      //console.log("input: " + text)
      var req = request.Request({
        url: "http://ajax.googleapis.com/ajax/services/language/translate",
        content: {
          v: "1.0",
          q: text,
          langpair: "|zh"
        },
        onComplete: function (response) {
          translated = response.json.responseData.translatedText;
          //console.log("output: " + translated)
          selection.text = translated;
        }
      });
      req.get();
    }
  });
};
 
exports.onUnload = function (reason) {
  //console.log(reason);
};
