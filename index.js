const { Client , Collection , MessageEmbed , WebhookClient , ShardingManager } = require("discord.js");
const { mongoURL , token , webhook_error } = require("./config.js");
const { Database } = require("quickmongo");
const ascii = require("ascii-table");
const Commandtable = new ascii().setHeading("Message Commands","Status");
const EventsTable = new ascii().setHeading("Client Events","Status");
const { readdirSync } = require("fs")

const { ClusterClient, getInfo } = require('discord-hybrid-sharding');

const client = new Client({intents : ["GUILDS","GUILD_MEMBERS","GUILD_MESSAGES","GUILD_INVITES","GUILD_EMOJIS_AND_STICKERS","GUILD_BANS","GUILD_WEBHOOKS","GUILD_PRESENCES","MESSAGE_CONTENT"],
    partials : ["CHANNEL","GUILD_MEMBER","MESSAGE","REACTION","USER"],
    allowedMentions : {
        repliedUser : true,
        parse : ["everyone","roles","users"]
    },
	shards: getInfo().SHARD_LIST,
      shardCount: getInfo().TOTAL_SHARDS,
});
client.cluster = new ClusterClient(client);

module.exports = client;
client.commands = new Collection();
client.cools = new Collection();
client.data = new Database(mongoURL);
client.logger = require(`./assets/logger.js`);
//logschannel,roles,idsetc
client.data.connect();
client.logger.log("Database Connected", "ready")
client.config = require(`./config.js`);
client.emoji = require(`./assets/emojis.json`);
client.color = '#2f3136';

  readdirSync(`./commands/`).forEach(d => {
    const c = readdirSync(`./commands/${d}`).filter(f => f.endsWith('.js'));
    for(const f of c) {
        const cmd = require(`./commands/${d}/${f}`);
        client.commands.set(cmd.name,cmd)
        Commandtable.addRow(cmd.name,"✅");
    }
});
console.log(Commandtable.toString());

readdirSync("./events/").forEach(e => {
    require(`./events/${e}`)(client);
    let eve = e.split(".")[0];
    EventsTable.addRow(eve,"✅");
});
console.log(EventsTable.toString());

const web = new WebhookClient({ url: webhook_error }); 

process.on('unhandledRejection', (error) => {
  web.send(`\`\`\`js\n${error}\`\`\``)
});

client.login(token);