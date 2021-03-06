const config = require("./config.json");
const { sendEmbed, sendError } = require("./send.js");

exports.pick = (message, messageID, emoji, winnerAmount) => {
    if (/(?<=:)\d+/.test(emoji)) {
        var newEmoji = emoji.match(/(?<=:)\d+/g).toString();
    }
    else {
        var newEmoji = emoji;
    }
    
    // Fetch message
    message.channel.messages.fetch(messageID).then(pickMessage => {
        // Get reactions with emoji
        pickMessage.reactions.cache.get(newEmoji).users.fetch().then(users => {

            // If winner amount is too much
            if (winnerAmount > 20) {
                sendError(message.channel, "Too many winners", `There is a maximum of 20 winners.`);
                return;
            }
            // If not enough reactions for winner amount
            if (winnerAmount > users.size) {
                // Grammar for one winner
                if (users.size === 1) {
                    sendError(message.channel, "Too many winners", `There is only ${users.size} reaction.`);
                }
                // Grammar for more than one winner
                else {
                    sendError(message.channel, "Too many winners", `There are only ${users.size} reactions.`);
                }
                return;
            }

            // More than 1 winner
            if (winnerAmount > 1) {
                // Random winners
                const winners = users.random(winnerAmount);

                const winnersFields = [];

                // More than 10 winners, inline fields
                if (winnerAmount > 10) {
                    for (i in winners) {
                        winnersFields.push({ name: `${winners[i].username}#${winners[i].discriminator}`, value: `${winners[i].toString()}`, inline: true });
                    }
                }
                // Less than 10 winners, no inline
                else {
                    for (i in winners) {
                        winnersFields.push({ name: `${winners[i].username}#${winners[i].discriminator}`, value: `${winners[i].toString()}` });
                    }
                }

                sendEmbed(message.channel, `${winnerAmount} winners`, emoji, winnersFields, messageID, message.guild.iconURL());
            }
            // 1 winner
            else {
                // One random winner
                const winner = users.random();

                sendEmbed(message.channel, "Winner", "", { name: `${winner.username}#${winner.discriminator}`, value: `${emoji} ${winner.toString()}` }, messageID, winner.avatarURL());
            }
        });
    })
    .catch(err => {
        console.log(err);
        sendError(message.channel, "Could not get reactions", `Could not get reactions from message ID ${messageID} in this channel.\nUse \`${config.prefix}help\` for help.`);
    });
}