const widgets = require("widget");
const tabs = require("tabs");


const data = require("self").data;
var panel = require("panel").Panel({
  contentURL: data.url("calc.html"),
  width:350,
  height:250,
});
 

var widget = widgets.Widget({
  id: "mozilla-link",
  label: "Mozilla Calc",
  contentURL: data.url("calc.ico"),
  onClick: function() {
    panel.show();
  }
});

console.log("The add-on is running.");
