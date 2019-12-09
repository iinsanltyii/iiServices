const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // !announce Title // message // colour // channel

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I'm sorry but you aren't able to do that.");

    var splitser = "//";

    if (args[0] == null) {

        var useMessage = new discord.RichEmbed()
            .setTitle("**Announcement Instructions**")
            .setColor("#fcba03")
            .setDescription(`Make an announcement by doing this: \n !announce Title ${splitser} Message ${splitser} Colour ${splitser} Channel`);

        return message.channel.send(useMessage);

    }

    args = args.join(" ").split(splitser);

    if (args[2] == undefined) args[2] = "#eeeeee";
    if (args[3] == undefined) args[3] = "general";

    var options = {

        title: args[0] || "Instructions",
        message: args[1] || "No message was given.",
        colour: args[2].trim(),
        channel: args[3].trim()

    }

    var announcer = message.author;

    var announceEmbed = new discord.RichEmbed()
        .setTitle("Announcement:")
        .setColor(options.colour)
        .setDescription(`Message from ${announcer} \n\n ${options.title} \n\n ${options.message} \n`)
        .setTimestamp();

        var announceChannel = message.guild.channels.find(`name`, options.channel);
        if (!announceChannel) return message.channel.send("I can't find the announcement channel.");

        announceChannel.send(announceEmbed);

}

module.exports.help = {
    name: "announce"
}