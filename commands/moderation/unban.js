const { MessageEmbed, Permissions } = require("discord.js")

module.exports = {
    name : `unban`,
    description : "Unban a user from the server",
    usage : "unban <user> [reason]",
    flame : false,
    category: 'moderation',
    run : async(client,message,args,prefix) => {

      if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return;
      }

      
            const em = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`${client.emoji.cross} provide a user id to unban`)
      
        if(!args[0])
        {
            return message.channel.send({embeds : [em]})
        }

      const bans = await message.guild.bans.fetch().catch(() => { });
        let reason = args.slice(1).join(' ');
        if(!reason) reason = `No Reason provided`;

        let user = bans.map(x => x.user).find(u => u.id === args[0]);

      if(!user){
            return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} user not found in bans`)]})  
      }
      message.guild.members.unban(user ? user.id : args[0],`${message.author.username} ID: ${message.author.id} | ${reason}`)
      return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.tick} ${user.tag} has been unbanned\n${client.emoji.list}Reason: ${reason}`)]})

    }
}