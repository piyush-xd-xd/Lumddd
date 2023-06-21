const { MessageEmbed , MessageButton , MessageActionRow } = require(`discord.js`);
const os = require("os");

module.exports = {
  name: 'statistics',
  aliases: ['stats', 'st'],
  category: 'extra',
  flame: false,
  run: async(client, message, prefix) => {

const osType = os.type();
const osArch = os.arch();
const totalMem = os.totalmem();
const freeMem = os.freemem();
const usedMem = totalMem - freeMem;

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

uram = formatBytes(usedMem)
tram = formatBytes(totalMem)

    
const textCh = client.channels.cache.filter(
    channel => channel.type === 'GUILD_TEXT'
  );

const voiceCh = client.channels.cache.filter(
    channel => channel.type === 'GUILD_VOICE'
  );

const stCh = client.channels.cache.filter(
    channel => channel.type === 'GUILD_STAGE_VOICE'
  );

const stat = new MessageEmbed()
    .setColor(client.color)
    .setAuthor({name: client.user.tag, iconURL: client.user.displayAvatarURL()})
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`**[Arbor](https://discord.com/api/oauth2/authorize?client_id=1118146378904915989&permissions=8&scope=bot)**\nThese statistics are only for the cluster \`${client.cluster.id}\` and **not** for the whole bot`)
    .addFields([
      {
        name: `__Arbor Info__`,
        value: `**Cluster:** \`Cluster${client.cluster.id}\`\n**Shards:** 2\n**Servers:** ${client.guilds.cache.size}\n**Users:** ${client.users.cache.size}\n**Websocket Latency:** ${client.ws.ping}\n**Total Commands:** ${client.commands.size}`
      },
      {
        name: `__Channels__`,
        value: `<:YU_channel:1121026421071036418> ${textCh.size} | <:voice:1121026393959051344> ${voiceCh.size} | <:stage:1121027470573973604> ${stCh.size}`
      },
      {
        name: `__System__`,
        value: `**Arch:** ${osArch}\n**Os:** ${osType}\n**Ram:** ${uram} / ${tram}`
      }
    ])
    return message.channel.send({embeds: [stat]})

  }
}