const { MessageEmbed , Permissions , MessageActionRow , MessageButton } = require("discord.js");

module.exports = {
  name: "unlockall",
  category: "moderation",
  aliases: [],
  flame: false,
  run: async(client, message, prefix) => {

    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      return;
    }
    if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.channel.send({embeds : [
            new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} I don't have adequate permissions.`)
        ]})
      
        let count = 0;
        message.guild.channels.cache.forEach(c => {
            c.permissionOverwrites.edit(message.guild.id,{
                SEND_MESSAGES : true
            }).catch(() => { });
            count++;
        });
        return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.tick} Unlocked ${count} channels.`)]})
    }
    
  }