const { MessageEmbed , MessageButton , MessageActionRow } = require(`discord.js`);
module.exports = {
    name : "antinuke",
    aliases : ["an"],
    flame : false,
    category: 'antinuke',
    run : async(client, message, args, prefix) => {


      let chudap = await client.data.get(`setup_${message.guild.id}`);
        if(!chudap || chudap == null) { await client.data.set(`setup_${message.guild.id}`,`none`) }
      if(!client.config.owner.includes(message.author.id) && message.guild.ownerId !== message.author.id)
      {
            return message.channel.send('Only the guild owner can use the Antinuke Commands.')
        }

      if(!args[0]) {
         
         if(chudap == `none`) {


const en = new MessageButton().setLabel("Enable").setStyle('SUCCESS').setCustomId(`lulli_setup`).setEmoji(client.emoji.tick)
const dis = new MessageButton().setLabel("Disable").setStyle('DANGER').setCustomId(`lund_setup`).setEmoji(client.emoji.cross).setDisabled(true)
      
      

        const loda = new MessageActionRow().addComponents(en, dis)
        
        return message.channel.send({embeds: [ new MessageEmbed().setFooter(`Flare Security`).setTitle(`Antinuke`).setColor(client.color).setDescription(`**${client.emoji.antinuke} Configure the antinuke setup**\n${client.emoji.dot} High speed server security\n${client.emoji.dot} Low latency to react through events\n${client.emoji.dot} One click setup wizard`)], components: [loda]})
         }

        if (chudap == `lmao`) {
          const en = new MessageButton().setLabel("Enable").setStyle('SUCCESS').setCustomId(`lulli_setup`).setEmoji(client.emoji.tick).setDisabled(true)
const dis = new MessageButton().setLabel("Disable").setStyle('DANGER').setCustomId(`lund_setup`).setEmoji(client.emoji.cross)
const lemao = new MessageActionRow().addComponents(en, dis)
        
        return message.channel.send({embeds: [ new MessageEmbed().setFooter(`Flare Security`).setTitle(`Antinuke`).setColor(client.color).setDescription(`**${client.emoji.antinuke} Configure the antinuke setup**\n${client.emoji.dot} High speed server security\n${client.emoji.dot} Low latency to react through events\n${client.emoji.dot} One click setup wizard`)], components: [lemao]})


        }
      }

      
      let opt = args[0]

      if(opt === `enable`) {  

        if(chudap == `lmao`) 
          {
                return message.channel.send(`Security is already enabled.`)
                    }
        if(chudap == `none`) {
                      client.data.set(`setup_${message.guild.id}`,`lmao`)
            return message.channel.send({embeds: [ new MessageEmbed().setFooter(`Flare Security`).setColor(client.color).setTitle(`Antinuke`).setDescription(`${client.emoji.tick} **The Antinuke setup has been completed.**\n\n*Move my role above for the antinuke to work properly*`)]})
          
        }
      }
      if(opt === `disable`) {
        if(chudap == `none`) {
          return message.channel.send(`Security is not enabled.`)
        }  
        if(chudap == `lmao`) {
          client.data.set(`setup_${message.guild.id}`, `none`)
          return message.channel.send({embeds: [ new MessageEmbed().setFooter(`Flare Security`).setColor(client.color).setTitle(`Antinuke`).setDescription(`${client.emoji.tick} **Successfully deleted Antinuke setup data.**\n\n*Your server is now not being protected by me*`)]})
        }
      }
  
      
    }
}