var bot;
module.exports = function (mainBot) {
    bot = mainBot;
    require("./callbacks")(bot);
}