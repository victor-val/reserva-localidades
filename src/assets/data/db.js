var firstRoute = require("./events.json");
var secondRoute = require("./event-info-68.json");
var thirdRoute = require("./event-info-184.json");

module.exports = function () {
  return {
    events: firstRoute,
    event_info_68: secondRoute,
    event_info_184: thirdRoute,
  };
};
