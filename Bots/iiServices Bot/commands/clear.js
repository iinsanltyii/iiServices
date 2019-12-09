const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // !clear 21

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have the ability to do this!");

    if (!args[0]) return message.reply("please give a total amount of messages you want to delete.");

    if(Number.isInteger(parseInt(args[0]))){

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => { 

            if(args[0]  == 0) {

                message.channel.send(`I can't delete 0 messages!`).then(msg => msg.delete(3000));

            } else if (args[0] == 1) {

                message.channel.send(`I have successfully deleted 1 message.`).then(msg => msg.delete(3000));

            } else {

            message.channel.send(`I have successfully deleted ${args[0]} messages.`).then(msg => msg.delete(3000));

            }
        });

    } else {
        return message.reply("give a number.");
    }


}

module.exports.help = {
    name: "clear"
}