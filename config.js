require(`dotenv`).config();
const config = {
    "token" : "" || process.env.token,
    "prefix" : "&" || process.env.prefix,
    "webhook_error" : "" || process.env.webhook_error,
    "mongoURL" : "" || process.env.mongourl,
    "owner" : ["1089263710322827295", '911894386634276905'],
    "gban_channel" : "1019462854274977863",
    "support" : "https://discord.gg/XFmcRsMgd5",
    "invite": "https://discord.com/oauth2/authorize?client_id=1114237806374572032&permissions=8&scope=bot%20applications.commands",
    "guildJoin" : "1119501663590432830",
    "guildLeave" : "1119501664781606972"
}
module.exports = config;