const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("I couldn't find any files.");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`The file ${f} is loaded!`);

        bot.commands.set(fileGet.help.name, fileGet);

    })

});

bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`)

    bot.user.setActivity("iiServices", { type: "WATCHING" });

});

bot.on("guildMemberAdd", member =>{

    var role = member.guild.roles.find("name", "Member");

    if (!role) return;

    member.addRole(role);

    const channel = member.guild.channels.find("name", "mod-logs");

    if (!channel) return;

    channel.send(`${member} just joined the server!`);

});

bot.on("message", async message => {

    // Als bot bericht stuurt stuur dan return
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);


    var commands = bot.commands.get(command.slice(prefix.length));

    if(commands) commands.run(bot,message, arguments);


    // if (command === `${prefix}hi`) {

    //   return message.channel.send("Hello!");

    // }

    // if (command === `${prefix}botinfo`) {

    //     var botIcon = bot.user.displayAvatarURL;

    //     var botEmbed = new discord.RichEmbed()
    //         .setDescription("**Discord Bot Information**")
    //         .setColor("#ff33e0")
    //         .setThumbnail(botIcon)
    //         .setFooter("BETA | Made by iinsanltyii")
    //         .addField("Bot name", bot.user.username)
    //         .addField("Created on", bot.user.createdAt);

    //     return message.channel.send(botEmbed);

    // }

    // if (command === `${prefix}serverinfo`) {

    //     var icon = message.guild.iconURL;

    //     var serverEmbed = new discord.RichEmbed()
    //         .setDescription("**Server Information**")
    //         .setColor("#ff33e0")
    //         .setThumbnail(icon)
    //         .addField("Server name", message.guild.name)
    //         .addField("Joined", message.member.joinedAt)
    //         .addField("Total members", message.guild.memberCount);

    //     return message.channel.send(serverEmbed);

    // }

    if (command === `${prefix}kick`) {

    //     !kick @iinsanltyii#4710 redenen hier.

         var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

         if (!kickUser) return message.channel.send("I can't find this user");

         var reason = arguments.join(" ").slice(22);

         if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I'm sorry but you aren't able to do that.");

         if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That user is a mod/admin, I can't do that.");

         var kick = new discord.RichEmbed()
             .setDescription("**Kick**")
             .setColor("#fc8c03")
             .addField("Kicked user", kickUser)
             .addField("Kicked by", message.author)
             .addField("Reason", reason);

         var kickChannel = message.guild.channels.find(`name`, "mod-logs");
         if (!kickChannel) return message.guild.send("I can't find this channel.");

         message.guild.member(kickUser).kick(reason);

         kickChannel.send(kick);

         return;

     }

    if (command === `${prefix}ban`) {

        var banUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

        if (!banUser) return message.channel.send("I can't find this user");

        var reason = arguments.join(" ").slice(22);

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I'm sorry but you aren't able to do that.");

        if (banUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That user is a mod/admin, I can't do that.");

        var ban = new discord.RichEmbed()
            .setDescription("**Ban**")
            .setColor("#fc0000")
            .addField("Banned user", banUser)
            .addField("Banned by", message.author)
            .addField("Reason", reason);

        var banChannel = message.guild.channels.find(`name`, "mod-logs");
        if (!banChannel) return message.guild.send("I can't find this channel.");

        message.guild.member(banUser).ban(reason);

        banChannel.send(ban);

        return;

    }

});


bot.on("message", async message => {

    // Als bot bericht stuurt stuur dan return
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    // if (command === `${prefix}invite`) {

    //     return message.channel.send("https://discord.gg/ZxUMEa7");

    // }

});

bot.on("message", async message => {

    // Als bot bericht stuurt stuur dan return
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

});


bot.login(process.env.token);