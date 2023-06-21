const { MessageEmbed } = require("discord.js")
const { np } = require("../../handler/nprefix.js")

module.exports = {
  name: "noprefix",
  aliases: ['np'],
  category: "flame",
  flame: true,
  run: async(client, message, args, prefix) => {


    let user = message.mentions.users.first() || client.users.cache.get(args[1])

    let opt = args[0]

    if(opt === 'add' || opt === 'give' || opt === '+') {
      let X = await np.get(user.id) || 0

        if (X == 1) {
          lmao = new MessageEmbed()
            .setColor(client.color)
            .setDescription(
              `${client.emoji.cross} | ${user.tag} already has no prefix.`)
          return message.channel.send({ embeds: [lmao] })
        }
      np.set(user.id, 1)
        e = new MessageEmbed()
          .setColor(client.color)
          .setDescription(
            `${client.emoji.tick} | Gave no prefix to ${user.tag}`)
        return message.channel.send({ embeds: [e] })
    }

    if(opt === 'remove' || opt === 'take' || opt === '-') {
      let Y = await np.get(user.id) || 0

        if (Y == 0) {
          e = new MessageEmbed()
            .setColor(client.color)
            .setDescription(
              `${client.emoji.cross} | ${user.tag} doesn't have no prefix.`)
     return message.channel.send({ embeds: [e] })
       } else {
      np.set(user.id, 0)
        ee = new MessageEmbed()
          .setColor(client.color)
          .setDescription(`${client.emoji.tick} | Removed no prefix from ${user.tag}`)
        return message.channel.send({ embeds: [ee] }) 
        }
    }

    if(opt === `list` || opt === `show`) {
      let ids = await np.keys
let e = new MessageEmbed()
let desc = "**Users in No Prefix** \n\n"
for(i=1;i<ids.length;i++)
{
let x = await client.users.fetch(ids[i]).then((user)=>user.tag).catch((e)=>{})
desc += `${x} \n`
}
e.setDescription(desc)
e.setColor(client.color) 
message.channel.send({embeds:[e]})
    }


    
  }
        }