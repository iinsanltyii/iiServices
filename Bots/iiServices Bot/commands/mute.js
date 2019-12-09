const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    // !mute username 1h

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I'm sorry but you aren't able to do that.");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!user) return message.channel.send("Please enter a server member or this user is not in this server.");

    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("This user is a mod/admin, I can't do that.");

    var muteRole = message.guild.roles.find("name", "MUTED");

    if (!muteRole) return message.channel.send("I can't find the role 'MUTED'.");

    var muteTime = args[1];

    if(!muteTime) return message.channel.send("Please enter a proper mute time.");

    await (user.addRole(muteRole.id));

    message.channel.send(`${user} has been successfully muted for a duration of ${muteTime}.`);

    setTimeout(function () {

        user.removeRole(muteRole.id);

        message.channel.send(`${user} has been successfully auto-unmuted after a mute duration of ${muteTime}.`);

    }, ms(muteTime));

}

module.exports.help = {
    name: "mute"
}