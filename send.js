const { MessageEmbed } = require("discord.js");

exports.sendEmbed = (channel, title, message, fields, messageID) => {
    if (fields != undefined) {
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(message)
            .setFields(fields)
            .setColor("#2a2a2a")
            .setFooter(`Message ID: ${messageID}`);

        channel.send({ embeds: [embed] });
    }
    else {
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(message)
            .setColor("#2a2a2a")
            .setFooter(`Message ID: ${messageID}`);
            
        channel.send({ embeds: [embed] });
    }
}

exports.sendError = (channel, title, message) => {
    const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(message)
        .setColor("#E83A3A");
    channel.send({ embeds: [embed] });
}