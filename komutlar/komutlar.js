const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
var prefix = ayarlar.prefix
exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('#00fa04')
.setTitle('⭐ HD Güvenlik Botu Komutları')
.setTimestamp()
.addField('∞  Koruma-Sistemi Genel koruma özelikleri bulunur. Spam koruma, Kanal koruma, Anti Ban koruma vs gibi... ', prefix + 'koruma-sistemi örnek kullanım')
.addField('∞  Reklam-Engelleme Link, Reklam, yapmaya kalkışanların reklam yapmalarını engeller!', prefix + 'reklam-engelleme örnek kullanım')
.addField('∞  Rol-Koruma Eğer sunucuda bir rol silinirse o rolü tekrardan açar! Ve böylelikle roller silinmez!', prefix + 'rol-koruma örnek kullanım')
.addField('∞  Küfür-Engel Eğer sunucuda biri küfür ederse o mesajı siler! Ve sunucunuzda huzurlu bir ortam sağlar', prefix + 'küfür-engel örnek kullanım')
.addField('∞  Ever-Here-Engel Eğer sunucuda biri ever here atmaya kalkarsa ever yada here mesajı silinir! Ve sunucunuzda huzurlu bir ortam sağlanır', prefix + 'ever-here-engel örnek kullanım')
.addField('∞  Yardım ve destek almak için sunucumuza katılabilirsiniz!',' https://discord.gg/VDThxwy') 
.setFooter('© 2020 HüseyinHD Koruma Botu', client.user.avatarURL)
.setTimestamp()
.setThumbnail(client.user.avatarURL)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['help','yardım','save'], 
  permLevel: 0 
};

exports.help = {
  name: 'müzik',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};