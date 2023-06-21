const { MessageEmbed , MessageActionRow, MessageButton } = require("discord.js")

module.exports = async(client) => {
  client.on("interactionCreate",async interaction => {
        if(interaction.isButton())
        {
    const channel = interaction.channel;
          
          if (channel && !channel.isText()) return;
      if(interaction.customId == `lulli_setup`)
      {
          if(interaction.member.id !== interaction.guild.ownerId && !client.config.owner.includes(interaction.member.id))
                {
                    return interaction.reply({embeds : [new MessageEmbed().setColor(client.color).setDescription(`Only the guild owner can use Antinuke commands`)],ephemeral : true})
                }
        else{
          let d = await client.data.get(`setup_${interaction.guild.id}`);
                    if(!d) await client.data.set(`setup_${interaction.guild.id}`,`none`);
            client.data.set(`setup_${interaction.guild.id}`,`lmao`)
            return interaction.update({embeds: [ new MessageEmbed().setFooter(`Arbor Security`).setColor(client.color).setTitle(`Antinuke`).setDescription(`${client.emoji.tick} **The Antinuke setup has been completed.**\n\n*Move my role above for the antinuke to work properly*`)], components: []})
        }
      } 
      if(interaction.customId == `lund_setup`) 
              {
          if(interaction.member.id !== interaction.guild.ownerId && !client.config.owner.includes(interaction.member.id))
                {
                    return interaction.reply({embeds : [new MessageEmbed().setColor(client.color).setDescription(`Only the guild owner can use Antinuke commands`)],ephemeral : true})
                }
        else{
          let d = await client.data.get(`setup_${interaction.guild.id}`);
                    if(!d) await client.data.set(`setup_${interaction.guild.id}`,`none`);
            client.data.set(`setup_${interaction.guild.id}`,`none`)
            return interaction.update({embeds: [ new MessageEmbed().setFooter(`Arbor Security`).setColor(client.color).setTitle(`Antinuke`).setDescription(`${client.emoji.tick} **Successfully deleted Antinuke setup data.**\n\n*Your server is now not being protected by me*`)], components: []})
        }
                      }
    }
    
  })
}