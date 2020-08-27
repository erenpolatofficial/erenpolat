const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.send('aç yada kapat yazmalısın! Örnek: /reklam-engel aç')
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('`SUNUCUYU_YÖNET` yetkisine sahip olmalısın!')
  
  if (args[0] == 'aç') {
    db.set(`reklam_${message.channel.id}`, 'acik').then(i => {
      message.channel.send('Reklam engel bu kanalda başarıyla açıldı! Üyeleri yasakla yetkisine sahip olanlar`ın reklama engellenmicektir.')
    })
  }
  if (args[0] == 'kapat') {
    db.set(`reklam_${message.channel.id}`, 'kapali').then(i => {
      message.channel.send('Reklam engel bu kanalda başarıyla kapatıldı! Artık reklamlar engellenmeyecektir.')
    })
  }

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['reklam','reklam-egnelle'],
  permLevel: 0
};

exports.help = {
  name: 'reklam-engelle',
  description: 'Reklam engelle',
  usage: 'reklam-engelleme'
};