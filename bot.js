const config = require("./config.json");
const { Client, Intents, MessageEmbed } = require("discord.js");
const { sendEmbed, sendError } = require("./send.js");

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS);
const client = new Client({ intents: myIntents});

client.once("ready", () => {
    console.log("Reaction Picker started!");
});

client.on("messageCreate", message => {
    if (message.author.bot) return;
    if (message.content.startsWith(config.prefix)) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if (command === "pick") {
            // 1 - message ID; 2 - emoji
            if (args.length === 2) {
                const messageID = args[0];
                const emoji = args[1];


            }
            // 1 - message ID; 2 - emoji; 3 - amount of winners
            if (args.length === 3) {
                const messageID = args[0];
                const emoji = args[1];
                const winnerAmount = args[2];


            }
            else {
                sendError(message.channel, "Incorrect Usage", `Usage: \`${config.prefix}pick <message ID> <emoji> [# of winners]\``);
                return;
            }
        }
        else if (command === "help") {
            const options = args.join(" ").split(",");
            const picked = options[Math.floor(Math.random() * options.length)];
            const embed = new MessageEmbed()
                .setTitle("Reaction Picker")
                .setDescription(`I've picked: ${picked}`)
                .setColor("#0099ff");
            message.channel.send({ embeds: [embed] });
        }
    }
});

client.login(config.token);