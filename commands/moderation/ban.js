const { MessageEmbed, Permissions } = require("discord.js")

module.exports = {
    name : `ban`,
    aliases : [`fuckban`, "hackban"],
    description : "Ban a user from the server",
    usage : "ban <user> [reason]",
    flame : false,
    category: 'moderation',
    run : async(client,message,args,prefix) => {

    if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return;
    }


      
      const em = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`${client.emoji.cross} mention a user to ban`)
      
        if(!args[0])
        {
            return message.channel.send({embeds : [em]})
        }
          
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        let reason = args.slice(1).join(' ');
        if(!reason) reason = `No Reason provided`;

        if(user.id === message.guild.ownerId) return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} You can't Ban the server owner`)]})

      if(user.id === client.user.id) return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} Hey I know your are dumb why are u proving it!`)]})
        if(client.config.owner.includes(user.id)) return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} I can't ban my owner`)]})

        if(user.id == message.member.id) return message.channel.send({emebds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} You can't ban yourself`)]})
      
        if(!user.bannable) return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} I don't have enough permissions to ban that user`)]})
        message.guild.members.ban(user.id,{reason : `${message.author.username} ID: ${message.author.id} | ${reason}`})
        await user.send({content: `⚠️ You have been banned!`, embeds: [ new MessageEmbed().setColor(client.color).setDescription(`Guild: ${message.guild.name}\nMod: ${message.author.username}\nReason: ${reason}`)]}).catch(()=>{})
        return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.tick} ${user.user.tag} has been banned\n${client.emoji.list}Reason: ${reason}`)]}) 
      
    }
        }