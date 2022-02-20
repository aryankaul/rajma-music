const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  Discord
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
const { swap_pages2 } = require("../../handlers/functions");
module.exports = {
    name: "help",
    category: "Info",
    aliases: ["h", "commandinfo", "commands"],
    cooldown: 3,
    usage: "help [Command]",
    description: "Returns all Commmands, or one specific command",
    run: async (client, message, args, guildData, player, prefix) => {

         if (args[0]) {
        const embed = new MessageEmbed()
        .setColor("BLACK");
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        var cat = false;
        if (!cmd) {
          cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
        }
        if (!cmd && (!cat || cat == null)) {
          embed.setColor("BLACK");
          embed.setDescription(`Nothing found for **${args[0].toLowerCase()}**`)
          return message.channel.send({embeds: [embed]});
        } else if (!cmd && cat) {
          var category = cat;

          const catcommands = client.commands.filter(x => x.category === category).map(x => '`' + x.name + '`').join(", ")

          const embed = new MessageEmbed()
          .setColor("BLACK")
          .setDescription(`● To get help on a specific command type \`${prefix}help <command>\`!`)
          .setThumbnail(client.user.displayAvatarURL())
          .setTimestamp()
          .addField(`${emoji.categories[category]} **${category} - (${client.commands.filter((cmd) => cmd.category === category).size})**`, catcommands)
          .setFooter(ee.footertext, client.user.displayAvatarURL());
        
          return message.channel.send({embeds: [embed]})
        }
        if (cmd.name) embed.addField(`**Command name**`, `\`${cmd.name}\``);
        if (cmd.name) embed.setTitle(`Detailed Information of | \`${cmd.name}\``);
        if (cmd.description) embed.addField("**Description**", `\`${cmd.description}\``);
        if (cmd.aliases) try {
          embed.addField("**Aliases**", cmd.aliases.length > 0 ? cmd.aliases.map(a => "`" + a + "`").join("\n") : "No Aliases")
        } catch {}
        if (cmd.cooldown) embed.addField("**Cooldown**", `\`${cmd.cooldown} Seconds\``);
        else embed.addField("**Cooldown**", `\`3 Seconds\``);
        if (cmd.usage) {
          embed.addField("**Usage**", `\`${prefix}${cmd.usage}\``);
          embed.setFooter("Syntax: <> = required, [] = optional");
        }
        if (cmd.useage) {
          embed.addField("**Useage**", `\`${prefix}${cmd.useage}\``);
          embed.setFooter("Rajma Music");
        }
        embed.setColor(ee.color)
        return message.channel.send({embeds: [embed]});
      } 

        
    let helpmenu = new MessageEmbed()
        .setAuthor(`Rajma Music`, ee.footericon)
        .setDescription(`
Rajma Music Is A Best Quality Music Bot, Invite Me Now.
 
**Links**
**[INVITE !!](https://discord.com/api/oauth2/authorize?client_id=939021974225711156&permissions=8&scope=bot)**

**Command Catagory:**
**<a:EeveeVibe:939064067300134972> \`:\` Filters**
**<:information:939064330874413077> \`:\` Info Commands**
**<a:rock:939064799537549343> \`:\` Music Commands**
**<:Settings:939065293471350825> \`:\` Settings**

**\`Choose A Catagory Below To See All Commands\`**`)

        .setFooter(ee.footertext, ee.footericon)
        .setColor(`#000000`)

        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('helpop')
                .setPlaceholder('Nothing Selected')
             .addOptions([
                {
                   label: 'Custom Playlist',
                    description: 'Commands for creating custom playlist',
                    value: 'first',
                    emoji: emoji.categories.Playlist
             },
                {
                    label: ' Filters',
                    description: 'Get All Filters Commands',
                    value: 'second',
                    emoji: emoji.categories.AstrozMusic
                },
                {
                    label: 'Info Commands',
                    description: 'Get All Info COMMANDS',
                    value: 'third',
                    emoji: emoji.categories.Info
                },
                {
                    label: 'Music Commands',
                    description: 'get all music Commands',
                    value: 'fourth',
                    emoji: emoji.categories.Playing
                },
                {
                    label: 'Settings',
                    description: 'Get All Settings Commands',
                    value: 'fifth',
                    emoji: emoji.categories.Settings
                },
            ])
        )
        message.channel.send({ embeds: [helpmenu], components: [row] })
      
    }
}