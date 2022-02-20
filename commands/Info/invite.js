const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "invite",
  category: "Info",
  aliases: ["add", "inv"],
  cooldown: 5,
  usage: "invite",
  description: "Gives you an Invite link for this Bot",
  run: async (client, message, args, guildData, player, prefix) => {
    try {
      const emee = new MessageEmbed()
      .setColor("#000000")
      .addField(`**__Invite Me With Admin Perms__**`, `**[Click Here](https://discord.com/api/oauth2/authorize?client_id=939021974225711156&permissions=8&scope=bot)**`)
      .addField(`**__Invite Me With Normal Perms__**`, `**[Click Here](https://discord.com/api/oauth2/authorize?client_id=939021974225711156&permissions=1643160010609&scope=bot)**\n`)
      .addField(`**__Support Server__**`, `**[Click Here](discord.gg/dwop)**`)
      .setTimestamp()
      .setFooter(ee.footertext, ee.footericon)
      message.channel.send({embeds: [emee]});
    } catch (e) {
      console.log(String(e.stack).bgRed)
			const emesdf = new MessageEmbed()
			.setColor(ee.wrongcolor)
			.setAuthor(`An Error Occurred`)
			.setDescription(`\`\`\`${e.message}\`\`\``);
			return message.channel.send({embeds: [emesdf]});
    }
  }
}