const Discord = require("discord.js");
const fs = require('fs');
exports.run = (client, msg, args) => {
   if(!msg.member.roles.has("715337779726385172")) {
    msg.reply("Bu komutu sadece belirlenen rol kullanabilir!")
  } else {
    if(!args[0]) {
      msg.reply("Lütfen `aç` veya `kapat` şeklinde bir ayar giriniz.")
    } else {
      if(!["aç", "kapat"].includes(args[0])) {
        msg.reply("Lütfen sadece `aç` veya `kapat` şeklinde bir ayar giriniz.")
      } else {
        if(args[0] == "aç") {
          try {
            let dosya = JSON.parse(fs.readFileSync('./ayarlar/everhereengel.json', 'utf8'));
            dosya[msg.guild.id] = {
              sistem: true
            }
            fs.writeFile('./ayarlar/everhereengel.json', JSON.stringify(dosya), (err) => {
              if(err) throw err;
            })
            msg.reply("Ever-here engel koruması başarılı bir şekilde aktif edildi! ☑️");
          } catch (e) {
            console.log(e);
          }
        } else if(args[0] == "kapat") {
          try {
            let dosya = JSON.parse(fs.readFileSync('./ayarlar/everhereengel.json', 'utf8'));
            dosya[msg.guild.id] = {
              sistem: false
            }
            fs.writeFile('./ayarlar/everhereengel.json', JSON.stringify(dosya), (err) => {
              if(err) throw err;
            })
            msg.reply("Sistem başarıyla devre dışı bırakıldı ❌");
          } catch (e) {
            console.log(e);
          }
        }
      }
    }
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ever-here-engel','etiketkoruma'],
  permLevel: 0
};
exports.help = {
  name: "eh-engel",
  description: "",
  usage: "everyone-here"
};