const moment = require(`moment`);
require(`moment-duration-format`);
const { MessageEmbed } = require(`discord.js`);

module.exports = {
  name: "uptime",
  category: "info",
  aliases: [],
  run: async (client, message, prefix) => {
    const time = moment.duration(message.client.uptime).format(`D[days], H[hrs], m[mins], s[secs]`);

    const embed = new MessageEmbed()
      .setAuthor("Arbor's Uptime", "https://cdn.discordapp.com/avatars/1114237806374572032/fc8895c1c15e85591c9e46557d3dba6b.webp?size=512")
      .setDescription(`Uptime: ${time}`)
      .setColor(client.embedColor)
      .setThumbnail(message.author.displayAvatarURL());

    return message.channel.send({ embeds: [embed] });
  }
};
