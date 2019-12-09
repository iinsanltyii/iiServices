

module.exports.run = async (bot, message, args) => {

    // !tempban username time reason

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I'm sorry but you aren't able to do that.");

    var user = message.guild.member(message.mentions.users.first());

    if(!user) return message.channel.send("Tempban a server member by doing this: !tempban @username <time> <reason>");

    if(user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("This user is a mod/admin, I can't do that.");

}

module.exports.help = {
    name: "tempban"
}