const { MessageEmbed , MessageButton , MessageActionRow } = require(`discord.js`)

module.exports = {
  name: 'invite',
  category: 'extra',
  aliases: [],
  flame: false,
  run: async(client, message, prefix) => {

const b1 = new MessageButton().setLabel("Invite").setStyle('LINK').setURL(client.config.invite)

const b2 = new MessageButton().setLabel("Support").setStyle('LINK').setURL(client.config.support)
    
          const row = new MessageActionRow().addComponents(b1, b2)
    
    return message.channel.send({content: `Thanks For Choosing Me!`, components: [row]})
  }
}