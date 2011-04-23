exports.main = function() {
	var widgets = require('widget');
	const data = require('self').data;
	const preferences = require("preferences-service");
	var selection = require("selection");
	var clipboard = require("clipboard");
	if (!preferences.has("enable_selected"))
        	preferences.set("enable_selected", false);
 
	//selection
	function myListener() {
		console.log(selection.text);
		clipboard.set(selection.text);
	}

	function toggleActivation() {
		annotatorIsOn = preferences.get("enable_selected");
		annotatorIsOn = !annotatorIsOn;
        	preferences.set("enable_selected", annotatorIsOn);
		if(annotatorIsOn == true){
			console.log('activate');
			selection.on('select', myListener);
			widget.contentURL = data.url('widget/pencil-on.png');
		}else{
			console.log('deactivate');
			selection.removeListener('select', myListener);
			widget.contentURL = data.url('widget/pencil-off.png');
		}  
		return annotatorIsOn;
	}
 
	//widget
	widget = widgets.Widget({
		label: 'selected',
		contentURL: data.url('widget/pencil-off.png'),
		contentScriptWhen: 'ready',
		contentScriptFile: data.url('widget/widget.js'),
		onMessage: function(message) {
			if (message == 'left-click') {
				toggleActivation();
        		}
			if (message == 'init-click'){
				annotatorIsOn = preferences.get("enable_selected");
				if(annotatorIsOn == true){
					console.log('activate');
					selection.on('select', myListener);
					widget.contentURL = data.url('widget/pencil-on.png');
				}
			}
		}
	});
}
