var commands = {}
var bot;
module.exports = function (mainBot) {
    bot = mainBot;
    commands.start = require("./start")(bot);
}