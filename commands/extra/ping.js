const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "ping",
  category: "info",
  run: async(client, message, prefix) => {

    
    const msg = await message.channel.send('*Pinging...*')

    const timestamp = (message.editedTimestamp) ? message.editedTimestamp : message.createdTimestamp
      const latency = `  ${Math.floor(msg.createdTimestamp - timestamp) / 20}ms`;
      const apiLatency = `  ${client.ws.ping}ms`;
    
     msg.edit(`Pong🏓: **${apiLatency}** | Database: **${latency}**\n Still Alive! No worries`)
    
  }
}