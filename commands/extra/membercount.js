const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "membercount",
  aliases: ['mc'],
  description: 'Server membercount',
  usage: 'membercount',
  category: "extra",
  flame: false,
  run: async(client, message, prefix) => {

    const e = new MessageEmbed()
    .setTitle("Members")
.setDescription(`${message.guild.members.cache.size}`)
.setColor(client.color)
    .setTimestamp()
   return message.channel.send({embeds: [e]})

    
  }
}