const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    name : `lock`,
    flame : false,
    description: 'Lock a channel',
    usage: "lock <channel>",
    category : 'moderation',
    run : async(client,message,args,prefix) => {

      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      return;
      }
      
        let ch = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first() || message.channel;
      
  
        ch.permissionOverwrites.edit(message.guild.id,{SEND_MESSAGES : false}).then(x => {
        return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.tick} ${ch} is now locked for \`@everyone\``)]}); });
        
    }
}