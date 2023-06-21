const { MessageEmbed } = require(`discord.js`);
module.exports = {
    name: `avatar`,
    aliases: ['av','pfp'],
    description: "Get a user's avatar",
    usage: `avatar <user>`,
    Flame: false,
    category: 'extra',
    run: async(client,message,args,prefix) => {
      
      user = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author
        

        let emb = new MessageEmbed().setColor(client.color).setImage(user.displayAvatarURL({dynamic : true ,size : 512})).addFields([
            {
                name : `${user.username}'s Avatar`,
                value : `[PNG](${user.displayAvatarURL({dynamic : true , format : 'png'})}) | [JPG](${user.displayAvatarURL({dynamic : true , format : 'jpg'})}) | [GIF](${user.displayAvatarURL({dynamic : true , format : 'gif'})})`
            }
        ]).setFooter({text : `Requested By: ${message.author.tag}` , iconURL : message.author.displayAvatarURL({dynamic : true})})
        return message.channel.send({embeds : [emb]})
    }
      }