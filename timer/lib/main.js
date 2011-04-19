var notifications = require("notifications");

//Timer
const timer = require("timer");
const preferences = require("preferences-service");

if (!preferences.has("man_timer_enable"))
	preferences.set("man_timer_enable", 1);
if (!preferences.has("man_timer_interval"))
	preferences.set("man_timer_interval", 60000);
if (!preferences.has("man_timer_title"))
	preferences.set("man_timer_title", "Notificate");
if (!preferences.has("man_timer_text"))
	preferences.set("man_timer_text", "Hello, man, stood up, drink some water !");

var event_id;
event_id = timer.setInterval(function(data){
	var myDate = new Date();
	console.log("timer interval running, "+myDate.getTime()/1000);
	notifications.notify({
	title:preferences.get("man_timer_title"),
	data:"",
	onClick: function (data) {
    		console.log(data);
  	},
	text:preferences.get("man_timer_text")});
},
preferences.get("man_timer_interval"));


const widgets = require("widget");
var self = require("self");
 
// A basic click-able image widget.
widgets.Widget({
  id: "google-link",
  label: "Good man !",
  contentURL: self.data.url("timer.ico"),
  onClick: function() {
	if(preferences.get("man_timer_enable") == 1){
		preferences.set("man_timer_enable", 0);
		console.log("timer interval stop");
		timer.clearInterval(event_id);
	}else{
		preferences.set("man_timer_enable", 1);
		console.log("timer interval start");
		event_id = timer.setInterval(function(data){
			var myDate = new Date();
			console.log("timer interval running, "+myDate.getTime()/1000);
			notifications.notify({
			title:preferences.get("man_timer_title"),
			data:"",
			onClick: function (data) {
    				console.log(data);
  			},
			text:preferences.get("man_timer_text")});
		},
		preferences.get("man_timer_interval"));
	}
  }
});

