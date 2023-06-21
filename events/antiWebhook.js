module.exports = async(client) => {
    client.on('webhookCreate',async web => {
      try {
        let logs = await web.guild.fetchAuditLogs({type : `WEBHOOK_CREATE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs) {
        if(logs.executor == client.user.id) return;
        if(logs.executor.id == web.guid.ownerId) return;
        let set = await client.data.get(`setup_${web.guild.id}`);
        if(!set || set === null){ await client.data.set(`setup_${web.guild.id}`,`none`) }
        if(set == `none`) return;
        let wl = await client.data.get(`wlUser_${web.guild.id}`);
        if(!wl || wl == null) { await client.data.set(`wlUser_${web.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;


logs.target.delete().catch(() => {});


if(set == `lmao`)
        {
            return web.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} ANTINUKE | ANTI WEBHOOK CREATE`}).catch(() => { });
        }      
          }
    } catch (e) { }
    })



client.on('webhookDelete',async web => {
  try {
        let logs = await web.guild.fetchAuditLogs({type : `WEBHOOK_DELETE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs) {
        if(logs.executor.id == client.user.id) return;
        if(logs.executor.id == web.guild.ownerId) return;
        let set = await client.data.get(`setup_${web.guild.id}`);
        if(!set || set == null) { await client.data.set(`setup_${web.guild.id}`,`none`) }
        if(set == `none`) return;
        let wl = await client.data.get(`wlUser_${web.guild.id}`);
        if(!wl || wl == null) { await client.data.set(`wlUser_${web.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;

if(set == `lmao`)
        {
            return web.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} ANTINUKE | ANTI WEBHOOK DELETE`}).catch(() => {})
        }
          }
    } catch (e) { }
    })


client.on('webhookUpdate',async(oldweb,newweb) =>{
  try{
        let logs = await newweb?.guild?.fetchAuditLogs({type : `WEBHOOK_UPDATE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs) {
        if(logs.executor.id == client.user.id) return;
        if(logs.executor.id == newweb.guild.ownerId) return;
        let set = await client.data.get(`setup_${newweb.guild.id}`);
        if(!set || set == null) { await client.data.set(`setup_${newweb.guild.id}`,`none`) }
        if(set == `none`) return;
        let wl = await client.data.get(`wlUser_${newweb.guild.id}`);
        if(!wl || wl == null) { await client.data.set(`wlUser_${newweb.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;

        if(oldweb.name !== newweb.name) { newweb.setName(oldweb.name) }

if(set == `lmao`)
        {
            return newweb.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} ANTINUKE | ANTI WEBHOOK UPDATE`}).catch(() => { });
        }
  }
    } catch (e) { }
    });
}