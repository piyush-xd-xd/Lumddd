const { MessageEmbed, MessageButton, MessageActionRow } = require(`discord.js`);

module.exports = {
  name: 'botinfo',
  aliases: ['about', 'bi'],
  category: 'extra',
  flame: false,
  run: async (client, message, prefix) => {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Invite")
        .setStyle('LINK')
        .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`),
      new MessageButton()
        .setLabel("Support")
        .setStyle('LINK')
        .setURL("https://discord.gg/KekWdGFNy8")
    );

    const ping = Math.round(message.client.ws.ping);
    const bi = new MessageEmbed()
      .setAuthor({ name: 'Arbor', iconURL: 'https://cdn.discordapp.com/avatars/1114237806374572032/fc8895c1c15e85591c9e46557d3dba6b.webp?size=512' })
      .setDescription('Hey, I am Arbor\nA powerful security bot. Which will keep you and your server safe from Nukers and Wizzers.\n\n')
      .setThumbnail(message.author.displayAvatarURL())
      .setImage('https://cdn.discordapp.com/attachments/1120635906496417868/1121025428858081391/Picsart_23-06-21_16-04-37-122.jpg')
      .setColor(client.embedColor)
      .addFields(
        { name: 'Server Count', value: `${client.guilds.cache.size}`, inline: false },
        { name: 'User Count', value: `${client.users.cache.size}`, inline: false },
        { name: 'Bot Ping', value: `${ping}ms`, inline: false },
        { name: 'Devloper', value: '[Piyush_xD?](http://discord.com/users/1089263710322827295)', inline: true },
        { name: 'Team', value: '[Yashh](http://discord.com/users/931189125833453608)', inline: true }
      );

    return message.channel.send({ embeds: [bi], components: [row] });
  }
};
