const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    return message.channel.send("https://discord.gg/ZxUMEa7");

}

module.exports.help = {
    name: "invite"
}