const { MessageEmbed } = require("discord.js");

module.exports = {
    name : "restart",
    aliases : ['reboot'],
    category : 'flame',
    flame: true,
    run: async(client, message, prefix) => {

      message.channel.send({embeds: [new MessageEmbed().setAuthor(`${client.user.username}`, client.user.displayAvatarURL()).setDescription(`Client Restarting...`).setColor(client.color)]})

      return client.cluster.respawnAll();
      
      
    }
}