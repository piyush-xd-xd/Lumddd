const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js")

module.exports = {

    name : `help`,
    aliases : ['h', 'commands'],
    flame : false,
    category: 'info',
    run : async(client,message,args,prefix) => {

      if (args[0]) {
        cmd = await client.commands.get(args[0])
        lemo = new MessageEmbed()
        .setTitle(cmd.name)
        .setFooter(`Note- <> means required, [] means optional`)
        .setColor(client.color)
        if (cmd.description) {
          lemo.setDescription(`> ${cmd.description}`)
        } else {
          lemo.setDescription("> Not Provided")
                   }
        if (cmd.aliases) {
        lemao = cmd.aliases.join(' | ')
        lemo.addField("Aliases", `${lemao}`)
        } 
        if (cmd.usage) {
          lemo.addField("Usage", `\`${prefix}${cmd.usage}\``)
        } else {
          lemo.addField("Usage", "Not Provided")
        }

        return message.channel.send({embeds: [lemo]})
      }

home = new MessageButton()
      .setStyle('SECONDARY')
      .setCustomId('home')
      .setEmoji(client.emoji.home)

del = new MessageButton()
      .setStyle('SECONDARY')
      .setCustomId('delete')
      .setEmoji(client.emoji.delete)

allcmd = new MessageButton()
      .setStyle('SECONDARY')
      .setLabel('All Commands')
      .setCustomId('allcmd')
      .setEmoji(client.emoji.list)


del1 = new MessageButton()
      .setStyle('SECONDARY')
      .setCustomId('delete')
      .setEmoji(client.emoji.delete)
      .setDisabled(true)



home1 = new MessageButton()
      .setStyle('SECONDARY')
      .setCustomId('home')
      .setEmoji(client.emoji.home)
      .setDisabled(true)


allcmd1 = new MessageButton()
      .setStyle('SECONDARY')
      .setLabel('All Commands')
      .setCustomId('allcmd')
      .setEmoji(client.emoji.list)
      .setDisabled(true)


let dismenu = new MessageActionRow().addComponents(
            new MessageSelectMenu()
      .setPlaceholder('Choose a Category')
      .setDisabled(true)
      .setCustomId('row')
      .addOptions([
        {
          label: `Antinuke`,
          emoji: client.emoji.antinuke,
          value: `h1`
        },
        {
          label: `Moderation`,
          emoji: client.emoji.moderation,
          value: `h2`
        },
        {
          label: `Extra`,
          emoji: client.emoji.utility,
          value: `h3`
        }
      ])
)



let menu = new MessageActionRow().addComponents(
            new MessageSelectMenu()
      .setPlaceholder('Choose a Category')
      .setCustomId('row')
      .addOptions([
        {
          label: `Antinuke`,
          emoji: client.emoji.antinuke,
          value: `h1`
        },
        {
          label: `Moderation`,
          emoji: client.emoji.moderation,
          value: `h2`
        },
        {
          label: `Extra`,
          emoji: client.emoji.utility,
          value: `h3`
        }
      ])
)


//--------------------------//     

const enall = new MessageActionRow().addComponents(home, del, allcmd)
      
const homedis = new MessageActionRow().addComponents(home1, del, allcmd)

const cmddis = new MessageActionRow().addComponents(home, del, allcmd1)

const alldis = new MessageActionRow().addComponents(home1, del1, allcmd1)

//-----------------------------//
        let em = new MessageEmbed()
        .setColor(client.color)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(`Commands ${client.commands.size}`)
        .setTimestamp()
        .setAuthor({name : `${message.author.username}` , iconURL : message.author.displayAvatarURL({dynamic: true})})
 .setTitle("Help Menu & Support Panel")
          .setDescription(`\`${prefix}help <command>\` - Get help on a specific command.\n\`\`\`css\n<> - Required Argument | [] - Optional Argument\`\`\``)
       .addFields({
           name: '<:security2:1121008861185331291> __**Top Command**__ `Antinuke`', value: "*Let Arbon protect your server with it's powerful security modules.*"
       },
                  {
           name: '<:Utility:1120696621387231333> __**Commands**__', value: "- Use the menu below to navigate through commands"
       },
                  {
                    name: "<:red2_link:1121007800047390780> __**Links**__", value: `[Invite](${client.config.invite}) | [Support](${client.config.support})`
                  }
                 )
        let help = await message.channel.send({embeds: [em], components: [homedis, menu]})
//----------------------------//

         let embed1 = new MessageEmbed().setColor(`#2f3136`).addFields({name : `__Antinuke__` , value : `${client.commands.filter(x => x.category && x.category === `antinuke`).map(x => `\`${x.name}\``).sort().join(', ')}`}).setTitle(`${client.emoji.antinuke} Security Commands`)

         let embed2 = new MessageEmbed().setColor(`#2f3136`).addFields({name : `__Moderation__` , value : `${client.commands.filter(x => x.category && x.category === `moderation`).map(x => `\`${x.name}\``).sort().join(', ')}`}).setTitle(`${client.emoji.moderation} Moderation Commands`)


         let embed3 = new MessageEmbed().setColor(`#2f3136`).addFields({name : `__Extra__` , value : `${client.commands.filter(x => x.category && x.category === `extra`).map(x => `\`${x.name}\``).sort().join(', ')}`}).setTitle(`${client.emoji.utility} Extra Commands`)

         let embed4 = new MessageEmbed().setAuthor(`All Commands`, client.user.displayAvatarURL()).setColor(client.color).addFields({name : `__Antinuke__` , value : `${client.commands.filter(x => x.category && x.category === `antinuke`).map(x => `\`${x.name}\``).sort().join(', ')}`}, {name : `__Moderation__` , value : `${client.commands.filter(x => x.category && x.category === `moderation`).map(x => `\`${x.name}\``).sort().join(', ')}`}, {name : `__Extra__` , value : `${client.commands.filter(x => x.category && x.category === `extra`).map(x => `\`${x.name}\``).sort().join(', ')}`})
                                                                                                        

        var embeds = [];
        embeds.push(embed1);embeds.push(embed2);embeds.push(embed3);embeds.push(embed4)
      

//----------------------------//
        const collector = await help.createMessageComponentCollector({
            filter :(interaction) => {
                if(message.author.id === interaction.user.id) return true;
                else{
                    interaction.reply({content : `${client.emoji.cross} It's not your session` , ephemeral : true})
                }
            },
            time : 100000,
            idle : 100000/2
        });
//----------------------------//    

        collector.on('collect',async(interaction) => {
            if(interaction.isSelectMenu())
            {
                for(const value of interaction.values)
                {
                  if(value === `h1`) {
                    return interaction.update({embeds : [embed1], components: [enall, menu]})
                  }
                  if(value === `h2`)
                    {
                        return interaction.update({embeds : [embed2], components: [enall, menu]})
                    }
                  if(value === `h3`)
                  {
                    return interaction.update({embeds : [embed3], components: [enall, menu]})
                  }               

                }             
          }
          if(interaction.isButton()) {
            if(interaction.customId === `home`) {
              return interaction.update({embeds: [em], components: [homedis, menu]})
            }
            if(interaction.customId === `delete`) {
              return interaction.message.delete().catch(() => {})
            }
            if(interaction.customId === `allcmd`) {
              return interaction.update({embeds: [embed4], components: [cmddis, menu]})
            }

            
          }        
        })
      
//-----------------------------//
collector.on('end',async() => {
            help.edit({embeds : [em] , components : [alldis, dismenu] , content : `Help menu has expired`})
        });          
    }
                      }