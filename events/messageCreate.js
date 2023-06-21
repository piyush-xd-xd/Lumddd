const { MessageEmbed , Permissions , MessageActionRow , MessageButton, Collection, WebhookClient } = require("discord.js");
const { webhook_error } = require("../config.js");
const { np } = require("../handler/nprefix.js")


module.exports = async(client) => {
    client.on("messageCreate",async message => {
        if(!message.guild || message.author.bot) return;

        if (message.content.includes('dok')) {
      const Dokdo = require('dokdo');
      const dok = new Dokdo(client, {
        owners: client.config.owner,
        aliases: ['Dok','dok'],
        prefix: "",
      });
      dok.run(message); // try !dokdo
         }

      
        let prefix = client.config.prefix;
        let prefixData = await client.data.get(`prefix_${message.guild.id}`);
        if(!prefixData) { prefix = client.config.prefix }
        else if(prefixData) { prefix = prefixData };

        //nprefix
  let noprefix = await np.get(`${message.author.id}`) || 0

  //checking nprefix
  if (noprefix == 1 && !message.content.startsWith(prefix) && !message.content.includes(client.user.id)) prefix = ""

          if(message.content === `<@${client.user.id}>`)
        {
            const b1 = new MessageButton().setLabel("Invite").setStyle('LINK').setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
            const b2 = new MessageButton().setLabel("Support").setStyle('LINK').setURL(client.config.support)
            const row = new MessageActionRow().addComponents(b1,b2);
  

           return message.channel.send({embeds: [ new MessageEmbed().setDescription(`<:Cosy_h_dot:1031082821932027965> My prefix is \`${prefix}\` / \`${prefix}help\``).setColor(client.color)], components : [row]})
        }

              const botregex = RegExp(`^<@!?${client.user.id}>( |)`)
        let pre = message.content.match(botregex) ? message.content.match(botregex)[0] : prefix;
        if(!message.content.startsWith(pre)) return;
        

        const args = message.content.slice(pre.length).trim().split(/ +/);
        const cmnd = args.shift().toLowerCase();
        const cmd = client.commands.get(cmnd) || client.commands.find((c) => c.aliases && c.aliases.includes(cmnd));
        if(!cmd) return;

          if(cmd.flame && !client.config.owner.includes(message.author.id))
        {
            return;
    }



      if(!client.config.owner.includes(message.author.id)){
        if(!client.cools.has(cmd.name))
        {
            client.cools.set(cmd.name,new Collection());
        }
        const now = Date.now();
        const ts = client.cools.get(cmd.name);
        const cool = (cmd.cool || 3) * 1000;
        if(ts.has(message.author.id))
        {
            let exp = ts.get(message.author.id) + cool;
            if(now < exp){
                let time = (exp - now) / 1000;
                return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} Slow down buddy you are too fast, wait till \`${time.toFixed(1)}s\``)]}).then(m => {setTimeout(() => {m.delete()},6000)})
            }
        }
        ts.set(message.author.id,now);
          }



      

    /*  let rixh = await prime.get(`${message.guild.id}`) || 0
      
      if(cmd.prime && !client.config.owner.includes(message.author.id) && rixh == 0 || rixh == null) {
             let lmao = new MessageEmbed().setColor(client.color).setTitle(`You Discovered a Premium Feature ${client.emoji.prime}`).setDescription(`*This is a Premium Feature which requires the server to have Premium*`)

const get = new MessageButton().setLabel("Get Premium").setStyle('LINK').setURL(client.config.support).setEmoji(client.emoji.prime)
      const row = new MessageActionRow().addComponents(get)
      
      return message.channel.send({embeds: [lmao], components: [row]})
      }*/
const web = new WebhookClient({ url: webhook_error }); 
              
              
        await cmd.run(client,message,args,prefix).catch((e) => {console.log(e)}) 
      return web.send({embeds: [ new MessageEmbed().setTitle(`Command Executed`).setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})}).setThumbnail(message.author.displayAvatarURL({dynamic: true})).setColor(client.color).addFields([
        {
          name: `Command Name`,
          value: `${cmd.name}`
        },
        {
          name: `Command User`,
          value: `${message.author.tag}`
        },
        {
          name: `Usage Channel`,
          value: `${message.channel}`
        },
        {
          name: `Full Message`,
          value: `${message}`
        }
      ])]})
          
    })
}