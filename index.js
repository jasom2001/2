const { Client, Collection, Intents } from "discord.js";
const { config } from "./utils/config.js";
const { importCommands } from "./utils/importCommands.js";
const { messageCreate } from "./utils/messageCreate.js";

const { TOKEN, PREFIX } = config;

const client = new Client({
  restTimeOffset: 0,
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES
  ]
});

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();

/**
 * Client events
 */
client.on("ready", () => {
  console.log(`${client.user.username} 已啟動!`);
  client.user.setActivity(`${PREFIX}help`, { type: "LISTENING" });
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);

/**
 * Import commands
 */
importCommands(client);

/**
 * Message event
 */
messageCreate(client);
