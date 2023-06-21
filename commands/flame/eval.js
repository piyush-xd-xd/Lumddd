const { MessageEmbed , MessageActionRow , MessageButton } = require("discord.js");

module.exports = {
    name : "eval",
    aliases : ["jadu","exe","jsk"],
    category : 'flame',
    run : async(client,message,args,prefix) => {
        let ok = ['788344871936851978', '1031089813467701289', '1005148352343724032'];
        client.config.owner.forEach(x => ok.push(x)); 
        if(!ok.includes(message.author.id)) return;
        let a = '';
        try { 
            const code = args.join(" ");
            if(!code) return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`No argument passed.`)]});

            if(code === `client.token` || code === `client.token.split()` || code.includes(`Token`) || code.includes(`bot_token`) || code.includes(`mongo`)) {
                evaled = `Lmao you thought I'm such a foolish bot?`
            } else {
                evaled = await eval(code);
            }

            if(typeof evaled !== `string`) { evaled = await require(`util`).inspect(evaled , { depth : 0 })};

            let output = clean(evaled);
            a += "```js\n"+output+"```";
            message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`**Input** : \`\`\`js\n${code}\`\`\`\n **Output** : ${a}`)]})
        } catch(e) { message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`**Input** : \`\`\`js\n${args.join(" ")}\`\`\` \n **Output** : \`\`\`js\n${e}\`\`\``)] }) }
    }
}
function clean(string) {
    if (typeof text === "string") {
        return string.replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
        return string;
    }
}