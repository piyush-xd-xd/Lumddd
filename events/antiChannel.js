module.exports = async(client) => {
    client.on("channelCreate",async channel => {
      try{
            let logs = await channel.guild.fetchAuditLogs({type : "CHANNEL_CREATE"}).then(x => x.entries.first());
            if(logs){
            if(logs.executor.id === client.user.id) return;
            if(logs.executor.id === channel.guild.ownerId) return;
            let wl = await client.data.get(`wlUser_${channel.guild.id}`);
            if(!wl || wl === null) { await client.data.set(`wlUser_${channel.guild.id}`,[]) }

            if(wl.includes(logs.executor.id)) return;
            

            let set = await client.data.get(`setup_${channel.guild.id}`);
            if(!set) { await client.data.set(`setup_${channel.guild.id}`,`none`) }
            if(set === `none`) return;
            logs.target.delete().catch(() => { });              
                    
            if(set == `lmao`)
            {
                return channel.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} ANTINUKE | ANTI CHANNEL CREATE`}).catch(() => { });
            } 
          }
    } catch (e) { }
    })

    client.on('channelDelete',async channel => {
      try {
        let logs = await channel.guild.fetchAuditLogs({type : `CHANNEL_DELETE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs) {
        if(logs.executor.id === client.user.id) return;
        if(logs.executor.id === channel.guild.ownerId) return;

        let wl = await client.data.get(`wlUser_${channel.guild.id}`);
        if(!wl || wl === null) { await client.data.set(`wlUser_${channel.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;

        let set = await client.data.get(`setup_${channel.guild.id}`);
        if(!set || set === null) { await client.data.set(`setup_${channel.guild.id}`,`none`) }
        if(set === `none`)return;
        channel.clone().then(x => x.setPosition(channel.position));

        if(set == `lmao`)
        {
            return channel.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} ANTINUKE | ANTI CHANNEL DELETE`}).catch(() => { });
        }
        }
    } catch (e) { }
    });

    client.on('channelUpdate',async(och,nch) => {
      try {
        let logs = await nch.guild.fetchAuditLogs({type : `CHANNEL_UPDATE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs) {
        if(logs.executor.id === client.user.id) return;
        if(logs.executor.id === nch.guild.ownerId) return;

        let wl = await client.data.get(`wlUser_${nch.guild.id}`);
        if(!wl || wl === null) { await client.data.set(`wlUser_${nch.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;

        let set = await client.data.get(`setup_${nch.guild.id}`);
        if(!set || set === null) { await client.data.set(`setup_${nch.guild.id}`,`none`) }
        if(set === `none`) return;

        if(och.name !== nch.name){
            nch.edit({name : och.name});
        }
        if(nch.type === `GUILD_TEXT`)
        {
            if(och.topic !== nch.topic)
            {
                nch.edit({topic : och.topic}).catch(() => { })
            }
        }
        if(nch.type === `GUILD_VOICE`)
        {
            if(och.bitrate !== nch.bitrate)
            {
                nch.edit({bitrate : och.bitrate}).catch(() => { })
            }
        }              

        if(set === `lmao`)
        {
            return nch.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} ANTINUKE | ANTI CHANNEL UPDATE`}).catch(() => { });
        }
          }
    } catch (e) { }
    }); 
              }