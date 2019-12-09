const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    try {

    var text = "**iiServices Bot** \n\n **__Commands:__** \n !serverinfo - displays all the available information about iiServices Communications server. \n !botinfo - displays all available information about me. \n !help - displays all available commands. \n !invite - provides a server invite link. \n !kick <@username> <reason> - kicks a member from the server. \n !ban <@username> <reason> - bans a member from the server."
    
    message.author.send(text);

    return message.reply("**check your DMs!**")
        
    } catch (error) {
        message.channel.send("Something went wrong.");
    }

}

module.exports.help = {
    name: "help"
}