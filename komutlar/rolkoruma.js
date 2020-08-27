const db = require("quick.db");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "e?";

  if (!args[0]) {
    const embed = new Discord.RichEmbed()
      .setColor("GOLD")
      .setTitle("Rol Koruma sistemi!")
      .setDescription(
        "**Hatalı kullanım! örnek: ?rol-koruma aç && kapat**"
      );

    message.channel.send(embed);
    return;
  }
  let rol = await db.fetch(`rolk_${message.guild.id}`);
  if (args[0] == "aç") {
    if (rol) {
      const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setTitle("Rol Koruma sistemi!")
        .setDescription("**Rol Koruma Sistemi zaten aktif ikinci kez açamam!!**");

      message.channel.send(embed);
      return;
    } else {
      db.set(`rolk_${message.guild.id}`, "acik");
      const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setTitle("Rol Koruma sistemi!")
        .setDescription("**Rol Koruma Sistemi aktif. Silinen rolleri tekrar açacağım, Ve size bildiriceğim !**");

      message.channel.send(embed);
    }
  } else if (args[0] == "kapat") {
    db.delete(`rolk_${message.guild.id}`);
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setTitle("Rol Koruma sistemi!")
      .setDescription("**Rol Koruma sistemi kapatıldı !**");

    message.channel.send(embed);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rol-k"],
  permLevel: 3,
  kategori: "sunucu"
};

exports.help = {
  name: "rol-koruma",
  description: "Rol koruma sistemini açıp kapatırsınız.",
  usage: "rol-koruma"
}; 