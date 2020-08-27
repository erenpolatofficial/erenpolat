const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
const moment = require("moment");
const app = express();
require("moment-duration-format");
app.get("/", (request, response) => {
console.log("HüseyinHD | Hostlandı");
response.sendStatus(200);
});
app.listen(8000);
setInterval(() => {
http.get(`http://bizimguardd.glitch.me`);
}, 280000)
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm Selam, Hoş geldin').then
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'İyi akşamlar') {
    msg.reply('Aleyküm Selam, Hoş geldin').then
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'İyi aksamlar') {
    msg.reply('İyi Akşamlar, Sanada').then
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'İyi akşamlar') {
    msg.reply('İyi Akşamlar, Sanada').then
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'hg') {
    msg.reply('Hoşbulduk').then
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Hayırlı Geceler') {
    msg.reply('Sanda hayırlı geceler Belki diyenin yoktur').then
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Hayırlı Akşamlar') {
    msg.reply('Sanda hayırlı geceler Belki diyenin yoktur').then
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Hayırlı Aksamlar') {
    msg.reply('Sanda hayırlı geceler Belki diyenin yoktur').then
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Selamün aleyküm') {
    msg.reply('Aleyküm Selam, Hoş geldin').then
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Selamun aleyküm') {
    msg.reply('Aleyküm Selam, Hoş geldin').then
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Selamun aleykum') {
    msg.reply('Aleyküm Selam, Hoş geldin').then
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Selamün aleyküm') {
    msg.reply('Aleyküm Selam, Hoş geldin').then
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Selam') {
    msg.reply('Aleyküm Selam, Canım Hoş geldin').then
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'İyi Geceler') {
    msg.reply('İyi Geceler İyi Uykular').then
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Günaydın') {
    msg.reply('Sanda hayırlı geceler Belki diyenin yoktur').then
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'düzeltildi')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'düzeltildi')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'düzeltildi')));
});

client.login(ayarlar.token);

//---------------------------------komutlar---------------------------------\\
client.on("guildMemberAdd", async member => {
if (!member.user.bot) return;
await member.guild.ban(member.guild.member(member))
})

//---------------------------------DDOS KORUMASI-----------------------------\\
client.on('message', msg => {

if(client.ping > 2500) {

            let bölgeler = ['singapore', 'eu-central', 'india', 'us-central', 'london',
            'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong', 
            'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt',
            'russia']
           let yenibölge = bölgeler[Math.floor(Math.random() * bölgeler.length)]
           let sChannel = msg.guild.channels.find(c => c.name === "📌╏ddos-saldırı")//Buraya ddos atıldıgında mesaj gitcek kanalı yazın

           sChannel.send(`Sunucu'ya Vuruyorlar \nSunucu Bölgesini Değiştirdim \n __**${yenibölge}**__ :tik: __**Sunucu Pingimiz**__ :`+ client.ping)
           msg.guild.setRegion(yenibölge)
           .then(g => console.log(" bölge:" + g.region))
           .then(g => msg.channel.send("bölge **"+ g.region  + " olarak değişti")) 
           .catch(console.error);
}});
//---------------------------------DDOS KORUMASI-----------------------------\\

client.on("roleDelete", async(role , channel , message , guild) => {
  let rolkoruma = await db.fetch(`rolk_${role.guild.id}`);
    if (rolkoruma == "acik") {
  role.guild.createRole({name: role.name, color: role.color,  permissions: role.permissions}) 
        role.guild.owner.send(` **${role.name}** Adlı Rol Silindi Ve Ben Rolü Tekrar Oluşturdum  :white_check_mark:`)

  
}
})  

//--------------------KANAL KORUMA--------------------------------\\
client.on("channelDelete", async channel => {
  const logs = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' }).then(audit => audit.entries.first())
  const deleter = await channel.guild.members.get(logs.executor.id);
  if(deleter.id == "716419490270937150") return; //bu satıra kendi id'nizi yazın sizin kanal silmenizi engellemeyecektir
  channel.clone(undefined, true, true, "Kanal silme koruması sistemi").then(async klon => {
    await klon.setParent(channel.parent);
    await klon.setPosition(channel.position);
  })
})

//------------------------------------ANTİ SPAM-------------------------------------\\


// EVERYONE HERE ENGEL //

let ehengel = JSON.parse(
  fs.readFileSync("./ayarlar/everhereengel.json", "utf8")
);
client.on("message", async function(msg) {
  if (!msg.guild) {
  } else {
    if (!ehengel[msg.guild.id]) {
    } else {
      if (ehengel[msg.guild.id].sistem == false) {
      } else if (ehengel[msg.guild.id].sistem == true) {
        if (msg.author.id == msg.guild.ownerID) {
        } else {
          if (msg.content.includes("@everyone")) {
            msg.delete();
            msg
              .reply("Maalesef `everyone` atmana izin veremeceğim çünkü sunucumuzda herkesi etiketlemek yasak!")
              .then(msj => msj.delete(3200));
          } else {
          }
          if (msg.content.includes("@here")) {
            msg.delete();
            msg
              .reply("maalesef `here` atmana izin veremeceğim çünkü sunucumuzda herkesi etiketlemek yasak!")
              .then(msj => msj.delete(3200));
          } else {
          }
        }
      }
    }
  }
});

// EVERYONE HERE ENGEL //

// KÜFÜR ENGEL //

client.on("message", async msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === "716419490270937150") return;
        
    let i = await db.fetch(`küfürFiltre_${msg.guild.id}`)  
          if (i == 'acik') {
              const küfür = ["amcık", "yarrak", "oç","piç", "sikerim", "sikik", "amına", "sg", "yavşak", "ananı", "anandır", "orospu", "evladı", "göt", "pipi", "sokuk", "yarak", "bacını", "karını","amk","aq","mk","anaskm","siktir","oc","yarrak","döl","sik","oruspu","amına","orusbu","got","pic",];
              if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                  if (!msg.member.hasPermission("MANAGE_WEBHOOKS")) {
                    msg.delete();                    
                    let embed = new Discord.RichEmbed()
                    .setColor(0xffa300)
                    .setFooter('HüseyinHD Küfür Sistemi', client.user.avatarURL)
                    .setAuthor(msg.guild.owner.user.username, msg.guild.owner.user.avatarURL)
                    .setDescription("HüseyinHD, " + `***${msg.guild.name}***` + " adlı sunucunuzda küfür yakaladım.")
                    .addField('Küfür Eden Kişi', 'Kullanıcı: '+ msg.author.tag +'\nID: '+ msg.author.id, true)
                    .addField('Engellenen mesaj', msg.content, true)
                    .setTimestamp()                   
                    msg.guild.owner.user.send(embed)                       
                    return msg.channel.send(`${msg.author}, Sunucumuzda küfür etmek yasak! Lütfen bir daha tekrarlanmasın!`).then(msg => msg.delete(25000));
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!i) return;
          });   

// KÜFÜR ENGEL //

///reklam engel
client.on("message", msg => {
  
  
  db.fetch(`reklam_${msg.channel.id}`).then(i => {
    if (i == 'acik') {
        const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party",];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();

                  return msg.reply('Reklam yapmamalısın, Sunucumuzda reklam yasak, Birdaha olmasın! :angry:').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    else if (i == 'kapali') {
      
    }
    if (!i) return;
  })
    });

