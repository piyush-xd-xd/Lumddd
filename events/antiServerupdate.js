const { Permissions } = require('discord.js');


module.exports = async (client) => {
  client.on('guildUpdate', async (oldguild, newguild) => {

    try {
      let logs = await oldguild.fetchAuditLogs({ type: `GUILD_UPDATE` }).then(x => x.entries.first());
      if (!logs) return;
      if (logs) {
        if (logs.executor.id == client.user.id) return;
        if (logs.executor.id == newguild.ownerId) return;
        let set = await client.data.get(`setup_${newguild.id}`);
        if (!set | set == null) { await client.data.set(`setup_${newguild.id}`, `none`) }
        if (set == `none`) return;
        let wl = await client.data.get(`wlUser_${newguild.id}`);
        if (!wl || wl == null) { await client.data.set(`wlUser_${newguild.id}`) }
        if (wl.includes(logs.executor.id)) return;

        if (oldguild.name !== newguild.name) {
          newguild.setName(oldguild.name)
        }
        if (oldguild.description !== newguild.description) {
          newguild.setDescription(oldguild.description)
        }
        if (oldguild.iconURL() !== newguild.iconURL()) {
          newguild.setIcon(oldguild.iconURL())
        }
        if (oldguild.verificationLevel !== newguild.verificationLevel) {
          newguild.setVerificationLevel(oldguild.verificationLevel)
        }
        if (oldguild.nsfwLevel !== newguild.nsfwLevel) {
          newguild.setNsfwLevel(oldguild.nsfwLevel)
        }
        if (set == `lmao`) {
          return newguild.members.ban(logs.executor.id, { reason: `${client.user.username.toUpperCase()} ANTINUKE | ANTI GUILD UPDATE` }).catch(() => { });
        }
      }
    } catch (e) { }
  })

  client.on('guildMemberAdd', async (member) => {


    try {
      let logs = await member.guild.fetchAuditLogs({ type: `BOT_ADD` }).then(x => x.entries.first());
      if (!logs) return;
      if (logs) {
        if (logs.executor.id === client.user.id) return;
        if (logs.executor.id === member.guild.ownerId) return;
        if (member.user.bot) {
          if (!logs.target.bot) return;
          let set = await client.data.get(`setup_${member.guild.id}`);
          if (!set || set == null) { await client.data.set(`setup_${member.guild.id}`, `none`) }
          if (set == `none`) return;
          let wl = await client.data.get(`wlUser_${member.guild.id}`);
          if (!wl || wl == null) { await client.data.set(`wlUser_${member.guild.id}`, []) }
          if (wl.includes(logs.executor.id)) return;

          if (set == `lmao`) {
            await member.guild.members.ban(logs.executor.id, { reason: `${client.user.username.toUpperCase()} ANTINUKE | ANTI BOT` }).catch(() => { });
            return member.guild.members.ban(logs.target.id, { reason: `${client.user.username.toUpperCase()} ANTINUKE | ANTI BOT` }).catch(() => { });
          }
        }
      }
    } catch (e) { }
  })

  client.on('guildMemberUpdate', async (oldmember, newmember) => {



    try {
      let logs = await newmember.guild.fetchAuditLogs({ type: `MEMBER_ROLE_UPDATE` }).then(x => x.entries.first());
      if (!logs) return;
      if (logs) {
        if (logs.executor.id == client.user.id) return;
        if (logs.executor.id == newmember.guild.ownerId) return;
        let set = await client.data.get(`setup_${newmember.guild.id}`);
        if (!set || set == null) { await client.data.set(`setup_${newmember.guild.id}`, `none`) }
        if (set == `none`) return;
        let wl = await client.data.get(`wlUser_${newmember.guild.id}`);
        if (!wl || wl == null) { await client.data.set(`wlUser_${newmember.guild.id}`, []) }
        if (wl.includes(logs.executor.id)) return;

        if (set == `lmao`) {
          return newmember.guild.members.ban(logs.executor.id, { reason: `${client.user.username.toUpperCase()} ANTINUKE | ANTI MEMBER UPDATE` }).catch(() => { });
        }
      }
    } catch (e) { }
  })

  client.on('guildMemberRemove', async member => {
    try {
      let logs = member.guild.fetchAuditLogs({ type: `MEMBER_PRUNE` }).then(x => x.entries.first()).catch(() => { });
      if (logs) {
        if (logs.executor.id === client.user.id) return;
        if (logs.executor.id === member.guild.ownerId) return;

        let set = await client.data.get(`setup_${member.guild.id}`);
        if (!set || set == null) { await client.data.set(`setup_${member.guild.id}`, `none`) }
        if (set == `none`) return;

        let wl = await client.data.get(`wlUser_${member.guild.id}`);
        if (!wl || wl == null) { await client.data.set(`wlUser_${member.guild.id}`, []) }
        if (wl.includes(logs.executor.id)) return;

        if (set == `lmao`) {
          return member.guild.members.ban(logs.executor.id, { reason: `${client.user.username.toUpperCase()} ANTINUKE | ANTI PRUNE` }).catch(() => { });
        }
      }
    } catch (e) { }

  })

}