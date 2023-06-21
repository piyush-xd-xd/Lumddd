const { MessageEmbed , MessageActionRow , MessageButton } = require(`discord.js`);
module.exports = {
    name: `banner`,
    description: 'Get the banner of a specific user or server',
    usage: 'banner <user/server> [user mention]-> (if user banner)',
    flame: false,
    category: 'extra',
    run : async(client,message,args,prefix) => {
        if(!args[0])
        {
            return message.channel.send({embeds : [new MessageEmbed().setTimestamp().setColor(`#2f3136`).setDescription(`${client.emoji.cross} Please Provide the Arguments

\`${prefix}banner server\`\n\`${prefix}banner user <user mention>\``)]})
                }

    let opt = args[0]

      if(opt === `server`) {
        if(!message.guild.banner){
                return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} No banner found.`)]})
      }
        else{
                let em = new MessageEmbed()
                  .setColor(client.color)
                  .setDescription(`[Download](${message.guild.bannerURL({dynamic : true , size : 4096 , format : 'gif'})})`)
                  .setImage(message.guild.bannerURL({dynamic : true , size : 4096})).setAuthor({name : `${message.guild.name}`})
          .setFooter({text : `Requested By : ${message.author.tag}` , iconURL : message.author.displayAvatarURL({dynamic : true})})
                return message.channel.send({embeds : [em]})                                                     
       }
      }
    if(opt === `user`) {
      
      const user = message.mentions.users.first() || client.users.cache.get(args[1]) || message.author

        let banner = false
      
        try {
            await user.fetch().then(user => {
                if(user.banner){
                    banner = user.bannerURL({
                        dynamic : true,
                        size : 4096
                    })
                }
            }).catch(() => {})
        } catch(e){
            console.log(e)
        }
        if(banner) {
            const em = new MessageEmbed().setColor(client.color).setAuthor({name : `${user.tag}`, iconURL : client.user.displayAvatarURL({dynamic : true})}).setImage(banner).setFooter({text : `Requested By : ${message.author.tag}`,iconURL : message.author.displayAvatarURL({dynamic : true})}).setDescription(`[PNG](${user.bannerURL({dynamic : true,size : 4096,format : "png"})}) | [JPG](${user.bannerURL({dynamic : true,size : 4096,format : "jpg"})}) | [GIF](${user.bannerURL({dynamic : true,size : 4096,format : "gif"})})`)
            return message.channel.send({embeds : [em]})
        }
        else{
            message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} No banner found.`)]})
        }
    }
      
    }
}