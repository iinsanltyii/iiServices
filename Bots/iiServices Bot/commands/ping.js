module.exports.run = async (bot, message, args) => {

    message.channel.send("Pong! " + (message.createdTimestamp - Date.now()) + "ms");

}

module.exports.help = {
    name: "ping"
}