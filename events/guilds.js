const { MessageEmbed , MessageButton, MessageActionRow, WebhookClient } = require(`discord.js`);
module.exports = async(client) => {
const web = new WebhookClient({ url: client.config .webhook_error }); 

          
    
    client.on('guildCreate',async guild => {
        client.data.set(`wlUser_${guild.id}`,[]);    
	client.data.set(`setup_${guild.id}`,`none`);
        
            let mainChannel;

        await guild.channels.cache.forEach((channel) => {

            if(channel.type === 'GUILD_TEXT' && guild.me.permissionsIn(channel).has('SEND_MESSAGES') && !mainChannel){

                mainChannel = channel;

            }

        });

        if(!mainChannel) return;
            
            let own = await guild?.fetchOwner();
            const invite = await mainChannel.createInvite({maxAge : 0 , reason : `I am creating this invite for My developer(s)`});
            const emb = new MessageEmbed().setDescription ("Added To A New Server!").setThumbnail(client.user.displayAvatarURL({dynmaic : true})).setColor(client.color).setAuthor({name : `Flare` , iconURL : guild.iconURL({dynmaic : true})}).addFields([
                {name : `Server Name` , value : `**\`${guild.name}\`**`},
                {name : `Server Owner` , value : `**\`${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown User"}\`**`},
                {name : `Server Members` , value : `**\`${guild.memberCount}\`**`},
                {name : `Link Of Server` , value : `https://discord.gg/${invite.code}`}
            ])
    
            web.send({embeds : [emb]});
    });

    client.on('guildDelete',async guild => {
      let own = await guild?.fetchOwner();
        const emb = new MessageEmbed().setColor(client.color).setDescription("Removed From A Server!").setThumbnail(client.user.displayAvatarURL({dynmaic : true})).setAuthor({name : `Flare` , iconURL : guild.iconURL({dynmaic : true})}).addFields([
            {name : `Server Name` , value : `**\`${guild.name}\`**`},
            {name : `Server Owner` , value : `**\`${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown User"}\`**`},
            {name : `Server Members` , value : `**\`${guild.memberCount}\`**`},
        ])

      web.send({embeds : [emb]});
    })
}
