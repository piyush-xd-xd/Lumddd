const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "unmute",
  aliases: ['untimeout'],
  category: 'moderation',
  usage: "unmute <user> [reason]",
  description: "Unmute a user",
  run: async(client, message, args, prefix) => {

    if (!message.member.permissions.has(Permissions.FLAGS.TIMEOUT_MEMBERS)) {
      return;
    }


    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} mention a user to unmute`)]})

    let reason = args.slice(1).join(' ');
        if(!reason) reason = 'No Reason provided';


            if(user.id === client.user.id) return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} Hey I know your are dumb why u are proving it!`)]})
    
        if(user.id === message.guild.ownerId) return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} You can't even mute Server Owner and talking of unmuting them ?`)]})

    if(!user.isCommunicationDisabled()) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} That user is not already muted`)]})

    if(!user.manageable) return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} I don't have enough permissions to unmute that user`)]})

    user.timeout(0,`${message.author.username} ID: ${message.author.id} | ${reason} ${reason}`);

                await user.send({content: `⚠️ You have been unmuted!`, embeds: [ new MessageEmbed().setColor(client.color).setDescription(`Guild: ${message.guild.name}\nMod: ${message.author.username}\nReason: ${reason}`)]}).catch(()=>{})
    
        return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.tick} ${user.user.tag} has been unmuted\n${client.emoji.list}Reason: ${reason}`)]})

    
  }
}