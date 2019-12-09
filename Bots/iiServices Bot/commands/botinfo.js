const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var botIcon = bot.user.displayAvatarURL;

    var botEmbed = new discord.RichEmbed()
        .setDescription("**Discord Bot Information**")
        .setColor("#ff33e0")
        .setThumbnail(botIcon)
        .setFooter("BETA | Made by iinsanltyii")
        .addField("Bot name", bot.user.username)
        .addField("Created on", bot.user.createdAt);

    return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "botinfo"
}