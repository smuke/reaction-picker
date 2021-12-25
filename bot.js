const config = require("./config.json");
const { Client, Intents, MessageEmbed } = require("discord.js");
const { sendEmbed, sendError } = require("./send.js");
const { pick } = require("./pick");

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS);
const client = new Client({ intents: myIntents});

client.once("ready", () => {
    console.log("Reaction Picker started!");

    client.user.setActivity(`${config.prefix}pick <msg ID> <emoji>`);
    setInterval(setActivity, 300000);
});

function setActivity() {
    client.user.setActivity(`${config.prefix}pick`);
}

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

                pick(message, messageID, emoji, 1);
            }
            // 1 - message ID; 2 - emoji; 3 - amount of winners
            else if (args.length === 3) {
                const messageID = args[0];
                const emoji = args[1];
                const winnerAmount = args[2];

                pick(message, messageID, emoji, winnerAmount);
            }
            // Inccorrect usage
            else {
                sendError(message.channel, "Incorrect Usage", `Usage: \`${config.prefix}pick <message ID> <emoji> [# of winners]\``);
                return;
            }
        }
        else if (command === "help") {
            sendEmbed(
                message.channel,
                "", 
                "",
                [
                    { name: "Usage", value: `To pick reaction winners from a message, use:\n\`${config.prefix}pick <message ID> <emoji> [# of winners]\`` },
                    { name: "Examples", value: `${config.prefix}pick 909958870426861579 <:EZ:855901750379806780>\n${config.prefix}pick 909958516712820836 :grin: 2`},
                    { name: "Links", value: "*<:pepega:739989836592709684> [How do I find the message ID?](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)*\n[Invite Bot](https://discord.com/oauth2/authorize?client_id=768252137108537374&scope=bot&permissions=8) - [GitHub](https://github.com/smuke/)\n" }
                ],
                {}
            );
        }
    }
});

client.login(config.token);