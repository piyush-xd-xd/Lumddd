module.exports = async(client) => {
    client.on('roleCreate',async role => {
      try {
        let logs = await role.guild.fetchAuditLogs({type : `ROLE_CREATE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs) {
        if(logs.executor.id == client.user.id) return;
        if(logs.executor.id == role.guild.ownerId) return;
        let wl = await client.data.get(`wlUser_${role.guild.id}`);
        if(!wl || wl == null) { await client.data.set(`wlUser_${role.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;
        let set = await client.data.get(`setup_${role.guild.id}`);
        if(!set) { await client.data.set(`setup_${role.guild.id}`,`none`) }
        if(set == `none`) return;

        role.delete().catch(() => { });
      
        if(set == `lmao`)
        {
            return role.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} ANTINUKE | ANTI ROLE CREATE`}).catch(() => { });
        }
          }
    } catch (e) { }
    });
    client.on('roleDelete',async role => {
      try {
        let logs = await role.guild.fetchAuditLogs({type : `ROLE_DELETE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs) {
        if(logs.executor.id == client.user.id) return;
        if(logs.executor.id == role.guild.ownerId) return;

        let wl = await client.data.get(`wlUser_${role.guild.id}`);
        if(!wl || wl == null) { await client.data.set(`wlUser_${role.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;

        let set = await client.data.get(`setup_${role.guild.id}`);
        if(!set || set == null) { await client.data.set(`setup_${role.guild.id}`,`none`) }
        if(set == `none`) return;

        let color = role.color;
        let position = role.rawPosition;
        let name = role.name;
        if(!role.managed){
        let r = await role.guild.roles.create({name : name,color : color});
        role.guild.roles.cache.get(r.id).setPosition(position); }
              
        if(set == `lmao`)
        {
            return role.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} ANTINUKE | ANTI ROLE DELETE`}).catch(() => { });
        }
          }
    } catch (e) { }
    });
    client.on('roleUpdate',async(oldrole,newrole) => {
      try {
        let logs = await newrole.guild.fetchAuditLogs({type : `ROLE_UPDATE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs) {
        if(logs.executor.id == client.user.id) return;
        if(logs.executor.id == newrole.guild.ownerId) return;

        let wl = await client.data.get(`wlUser_${newrole.guild.id}`);
        if(!wl || wl == null) { await client.data.set(`wlUser_${newrole.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;

        let set = await client.data.get(`setup_${newrole.guild.id}`);
        if(!set || set == null) { await client.data.set(`setup_${newrole.guild.id}`,`none`) }
        if(set == `none`) return;

        if(oldrole.color !== newrole.color){
            newrole.setColor(oldrole.color).catch(() => {})
        }
        if(oldrole.rawPosition !== newrole.rawPosition){
            newrole.setPosition(oldrole.rawPosition).catch(() => { });
        }
        if(oldrole.name !== newrole.name){
            newrole.edit({name : oldrole.name}).catch(() => { })
        }
        if(oldrole.permissions !== newrole.permissions){
            newrole.setPermissions(oldrole.permissions).catch(() => {});
        }
      
        if(set == `lmao`)
        {
            return newrole.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} ANTINUKE | ANTI ROLE UPDATE`}).catch(() => { })
        }
          }
    } catch (e) { }
    });
          }