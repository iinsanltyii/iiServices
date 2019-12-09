const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var icon = message.guild.iconURL;

    var serverEmbed = new discord.RichEmbed()
        .setDescription("**Server Information**")
        .setColor("#ff33e0")
        .setThumbnail(icon)
        .addField("Server name", message.guild.name)
        .addField("Joined", message.member.joinedAt)
        .addField("Total members", message.guild.memberCount);

    return message.channel.send(serverEmbed);

}

module.exports.help = {
    name: "serverinfo"
}