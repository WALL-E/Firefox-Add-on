const widgets = require("widget");
 
widgets.Widget({
  id: "addons-link",
  label: "Add-on Developer",
  contentURL: "https://static.addons.mozilla.net/img/favicon.ico",
  onClick: function() {
    require("tabs").open({url: "https://addons.mozilla.org/en-US/developers/"});
  }
});

