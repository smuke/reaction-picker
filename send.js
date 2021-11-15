const { MessageEmbed } = require("discord.js");

exports.sendEmbed = channel => {
    const embed = new MessageEmbed()
        .setTitle("Reaction Picker")
        .setDescription("I've picked: " + picked)
        .setColor("#0099ff");
    channel.send({ embeds: [embed] });
}

exports.sendError = (channel, title, message) => {
    const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(message)
        .setColor("#0099ff");
    channel.send({ embeds: [embed] });
}