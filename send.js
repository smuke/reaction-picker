const { MessageEmbed } = require("discord.js");

exports.sendEmbed = (channel, title, message, fields, messageID, image) => {
    if (fields != undefined) {
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(message)
            .setFields(fields)
            .setColor("#2a2a2a")

        if (image) {
            embed.setThumbnail(image);
        }
        if (messageID.length > 0) {
            embed.setTimestamp();
            embed.setFooter("Msg ID " + messageID);
            channel.send({ embeds: [embed], reply: { messageReference: messageID } });
        }
        else {
            channel.send({ embeds: [embed] });
        }
    }
    else {
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(message)
            .setColor("#2a2a2a")
            
        if (image) {
            embed.setThumbnail(image);
        }
        if (messageID.length > 0) {
            embed.setTimestamp();
            embed.setFooter("Msg ID " + messageID);
            channel.send({ embeds: [embed], reply: { messageReference: messageID } });
        }
        else {
            channel.send({ embeds: [embed] });
        }
    }
}

exports.sendError = (channel, title, message) => {
    const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(message)
        .setColor("#E83A3A");
    channel.send({ embeds: [embed] });
}