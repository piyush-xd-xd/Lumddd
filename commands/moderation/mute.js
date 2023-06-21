const { MessageEmbed, Permissions } = require("discord.js");
const ms = require(`ms`);

module.exports = {
  name: "mute",
  aliases: ['timeout', 'stfu'],
  category: 'moderation',
  usage: "mute <user> [time] [reason]",
  description: "Mute a user",
  run: async(client, message, args, prefix) => {

    if (!message.member.permissions.has(Permissions.FLAGS.TIMEOUT_MEMBERS)) {
      return;
    }


let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} mention a user to mute`)]})


    let reason = args.slice(2).join(' ');
        if(!reason) reason = `No Reason provided`;

        let time = args[1];
        if(!time) time = '7days';

        let dur = ms(time);

  if(user.isCommunicationDisabled()) return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} That user is already muted`)]})

    if(user.id === message.member.id) return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} You can't mute yourself`)]})

    if(user.id === message.guild.ownerId) return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} You can't mute Server Owner bruh`)]})  

      if(user.id === client.user.id) return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} Hey I know your are dumb why are u proving it!`)]})

    if(user.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} I can't mute admins`)]})


    if(!user.manageable) return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} I don't have enough permissions to mute that user`)]})

    user.timeout(dur,`${message.author.username} ID: ${message.author.id} | ${reason}`)

            await user.send({content: `⚠️ You have been muted!`, embeds: [ new MessageEmbed().setColor(client.color).setDescription(`Guild: ${message.guild.name}\nMod: ${message.author.username}\nReason: ${reason}`)]}).catch(()=>{})
    
        return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.tick} ${user.user.tag} has been muted\n${client.emoji.list}Reason: ${reason}`)]})


    
  }
}
