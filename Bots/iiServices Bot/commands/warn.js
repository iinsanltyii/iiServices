const discord = require("discord.js");
const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    // !warn username reason

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I'm sorry but you aren't able to do that.");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!user) return message.channel.send("Please enter a server member or this user is not in this server.");

    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("This user is a mod/admin, I can't do that.");

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send("Please enter a proper reason.");

    if (!warns[user.id]) warns[user.id] = {
        warns: 0
    };

    warns[user.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    var warnEmbed = new discord.RichEmbed()
        .setDescription("**Warn**")
        .setColor("#ffef40")
        .addField("Warned user", user)
        .addField("Warned by", message.author)
        .addField("Total warnings", warns[user.id].warns)
        .addField("Reason", reason);

    var warnChannel = message.guild.channels.find(`name`, "mod-logs");
    if (!warnChannel) return message.guild.send("I can't find this channel.");

    warnChannel.send(warnEmbed);

    if (warns[user.id].warns == 2) {

        message.guild.member(user).kick(reason);
        message.channel.send(`${user} has been kicked.`);

    }

}

module.exports.help = {
    name: "warn"
}