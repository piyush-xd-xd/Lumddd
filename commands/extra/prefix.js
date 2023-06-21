const { MessageEmbed } = require("discord.js")

module.exports = {
  name: 'prefix',
  description: 'Change or reset the bot prefix',
  usage: 'prefix <new prefix/reset>',
  category: 'extra',
  aliases: ['setprefix'],
  flame: false,
  run: async(client, message, args, prefix) => {

    if(!message.member.permissions.has(`MANAGE_GUILD`)) {
      return;
    }


    if(!args[0])
        { return message.channel.send({embeds : [new MessageEmbed().setDescription(`${client.emoji.info} My current prefix for the server is: \`${prefix}\`\nCommand Usage: \`prefix <new prefix/reset>\``).setColor(client.color)]}) }

        if(args[0] === client.config.prefix || args[0] === 'reset'){
            client.data.delete(`prefix_${message.guild.id}`);
            return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.tick} Prefix was set back to - \`${client.config.prefix}\``)]})
        }

    if(args[0].length > 3)
        {
            return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} You cannot use args with more than 3 characters.`)]})
        }

    if(args[1])
        {
            return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} You cannot set double args as a prefix.`)]})
        }

   client.data.set(`prefix_${message.guild.id}`,args[0]);
        return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.tick} Set the prefix to - \`${args[0]}\``)]})

    
  }
}