const config = require("./config.json");
const { Client, Intents, MessageEmbed } = require("discord.js");

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS);
const client = new Client({ intents: myIntents});

client.once("ready", () => {
    console.log("Reaction Picker started!")
})

client.login(config.token);