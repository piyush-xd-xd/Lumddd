const { MessageEmbed , MessageActionRow , MessageSelectMenu , MessageButton } = require(`discord.js`);
module.exports = {
    name : `whitelist`,
    description: 'Whitelist a user from the antinuke module',
    usage: 'whitelist <add/remove/show> <user>',
    aliases : ["wl"],
    category : "antinuke",
    run : async(client,message,args,prefix) => {

            let chudap = await client.data.get(`setup_${message.guild.id}`);
        if(!chudap || chudap == null) { await client.data.set(`setup_${message.guild.id}`,`none`) }

          

          let db = await client.data.get(`wlUser_${message.guild.id}`)
        let wl = []
        let an = []

    if(db == null || !db) { await client.data.set(`wlUser_${message.guild.id}`, []) }
    else { db.forEach(x => wl.push(`${client.emoji.dot} <@${x}> | [\`${x}\`]`)); 
    db.forEach(x => an.push(x))
         }

              
      if(!client.config.owner.includes(message.author.id) && message.guild.ownerId !== message.author.id)
      {
            return message.channel.send('Only the guild owner can use the Antinuke Commands.')
      }

if(chudap === `none`) {
  return message.channel.send(`Antinuke is not enabled.`)
} else {

  let opt = args[0]

  if(!opt) {
    return message.channel.send(`Please provide the arguments- \`add/remove/show\``)
  }


  if(opt === `show`) {
       

          let em = new MessageEmbed()
   .setColor(`#2f3136`)
                            if(wl.length === 0) { em.addFields([{name : `__**Total Whitelisted Users**__: \`[${wl.length}]\`` , value : `There aren't any users in the whitelist.`}])}
                            else { em.setDescription(`__**Total Whitelisted Users**__: \`${wl.length}\``+"\n"+`${wl.join(`\n`)}`) }

    return message.channel.send({embeds: [em]})
    
  }

  if(opt === `add`) {

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[1])

    if(!user) {
return message.channel.send(`You didn't provide any user.`)
    }

    if(an.includes(user.id)) {
      return message.channel.send({embeds: [new MessageEmbed().setColor(client.color).setDescription(`<@${user.id}> is already whitelisted.`)]})
    }
    an.push(user.id);
    await client.data.set(`wlUser_${message.guild.id}`,an)
    return message.channel.send({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.tick} | SuccessFully Added ${user} to my whitelist.`)]})
          
  }


  if(opt === `remove`) {
    
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[1])

    if(!user) {
return message.channel.send(`You didn't provide any user.`)
    }
    if(!an.includes(user.id)) {
      return message.channel.send({embeds: [new MessageEmbed().setColor(client.color).setDescription(`<@${user.id}> is not whitelisted.`)]})
         }
                            let bccc = an.filter(x => x !== user.id);
    await client.data.set(`wlUser_${message.guild.id}`, bccc)
    return message.channel.send({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.tick} | SuccessFully Removed ${user} from my whitelist.`)]})
    
  }


  
}      
    }
}