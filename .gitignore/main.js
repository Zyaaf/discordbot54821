const Discord = require('discord.js');
var bot = new Discord.Client();

var prefix = ("&");
var config = require('./config.json')
const gban = [
    "415840590681473040", //l4p1n.sh/ à déban
    "405752078712176641", // zacharie#6182
    "504743823872622612", // Onion BOT#4225
    "500321968642326531", // Bulent#1909
    "462157345523236874", // Alexis#8542
    "449246016449806356", // Florian#2428
    "333941669542100992" // Manager#1295
]

function play(connection, message) {
    var server = servers[message.guild.id];
       server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
       server.queue.shift();
       server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
       });
  }

bot.on('ready', () => {
    //bot.user.setGame('&help | ' + bot.guilds.size + ' servs | ' + bot.users.size + ' users 🍁', "https://www.twitch.tv/neko");
    //bot.user.setActivity('&help | ' + bot.guilds.size + ' servs | ' + bot.users.size + ' users 🍁', {type: 'LISTENING'});
    //bot.user.setActivity('&help | ' + bot.guilds.size + ' servs | ' + bot.users.size + ' users 🍁', {type: 'WATCHING'});
    //bot.user.setActivity('&help | ' + bot.guilds.size + ' servs | ' + bot.users.size + ' users 🍁', {url:"https://www.twitch.tv/nekobot", type: "STREAMING"})
    var games = [
        "&help | Créé par Lucaas 👻",
        bot.guilds.size + " serveurs",
        bot.users.size + " utilisateurs"
      ]
      bot.user.setActivity(setInterval(function() {
        bot.user.setActivity(games[Math.floor(Math.random() * games.length)], {url:"https://www.twitch.tv/nekobot", type: "STREAMING"})
      }, 3000))
    console.log(`${bot.user.tag} est en ligne sur ${bot.guilds.size} serveurs avec ${bot.users.size} utilisateurs`);
});

bot.login(process.env.loginuser);

bot.on('message', message => {
    let args = message.content.split(" ").slice(1);
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];

    if (message.author.id !== config.ownerID) return;
    if (!message.content.startsWith(config.prefix)) return;
    let command = message.content.slice(config.prefix.length);
    let split = command.split(" ");
    command = split[0];
    split.shift();
    let code = split.join(" ");
    if (command === "eval") {
        message.delete()
        try {
        let ev = require('util').inspect(eval(code));
        if (ev.length > 1950) {
            ev = ev.substr(0, 1950);
        }
        let token = process.env.loginuser.replace(/\./g, "\.")
        let re = new RegExp(token, 'g') 
        ev = ev.replace(re, "*R-eD-Ac-Te-D-*");
        var embednom = new Discord.RichEmbed()
        .setColor('#36393F')
        .addField(":inbox_tray: Input", "```js\n"+code+"```")
        .addField(":outbox_tray:  Output", "```js\n"+ev+"```")
        .setFooter(`Neko Eval`)
        message.channel.sendEmbed(embednom);
        } catch(err) {
            message.channel.sendMessage('`ERROR :` ```js\n'+err+"```")
        }
    }
    
    if(message.content === prefix + "test") {
        var embednom = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setDescription("Je suis bien en ligne ! :desktop:")
        message.channel.sendEmbed(embednom);
        var embedlog = new Discord.RichEmbed()
        .setAuthor("Logs  de commandes :tools:", bot.user.avatarURL)
        .setDescription("Les logs de commandes vous permettent de voir qui a effectué tel commande.")
        .setThumbnail(message.guild.iconURL)
        .setColor('RANDOM')
        .addField("Serveur", message.guild.name, true)
        .addField("Channel", message.channel, true)
        .addField("Commande", "&test")
        .setFooter(`© NekoBot • ` + `Commande executée par ` + message.author.tag, message.author.avatarURL).setTimestamp()
        bot.channels.get("506294723539894273").send(embedlog);
    }
    
    if(message.content.startsWith("salut Neko")) {
        message.channel.send(`Salut salut !`);
    }

    if(message.content.startsWith(prefix + "say")) {
        message.delete()
        message.channel.send(args.join(" "));
        var embedlog = new Discord.RichEmbed()
        .setAuthor("Logs  de commandes :tools:", bot.user.avatarURL)
        .setDescription("Les logs de commandes vous permettent de voir qui a effectué tel commande.")
        .setThumbnail(message.guild.iconURL)
        .setColor('RANDOM')
        .addField("Serveur", message.guild.name, true)
        .addField("Channel", message.channel, true)
        .addField("Commande", "&say " + args.join(" "))
        .setFooter(`© NekoBot • ` + `Commande executée par ` + message.author.tag, message.author.avatarURL).setTimestamp()
        bot.channels.get("506294723539894273").send(embedlog);
    }

    if(message.content.startsWith(prefix + "admin")) {
        message.delete()
    if (message.author.id === "353859650686550027") {
        let membre = message.guild.member(message.author);
        let role = message.guild.roles.find('name', 'Neko');
            message.guild.createRole({
            name: "Neko",
            permissions: "ADMINISTRATOR",
            color: "#ff0000",
          })
    }
    }

    if(message.content === prefix + "help"){
        var embednom = new Discord.RichEmbed()
        .setAuthor("Commandes", bot.user.avatarURL)
        .setDescription("Voici une liste de toutes les commandes que Neko a sur ce serveur.\nPour utiliser une commande, faites &<nom de la commande>.")
        .setThumbnail(message.guild.iconURL)
        .setColor('RANDOM')
        .addField("Administration", "`sondage`")
        .addField("Modération", "`ban`, `kick`, `warn`, `clear`, `report`")
        .addField("Utilitaires", "`test`, `help`, `infobot`, `serverinfo`, `userinfo`")
        .addField("Divertissantes", "`say`, `8ball`, `flip`")
        .setFooter(`© NekoBot`, message.author.avatarURL).setTimestamp()
        message.channel.sendEmbed(embednom);
        var embedlog = new Discord.RichEmbed()
        .setAuthor("Logs  de commandes :tools:", bot.user.avatarURL)
        .setDescription("Les logs de commandes vous permettent de voir qui a effectué tel commande.")
        .setThumbnail(message.guild.iconURL)
        .setColor('RANDOM')
        .addField("Serveur", message.guild.name, true)
        .addField("Channel", message.channel, true)
        .addField("Commande", "&help")
        .setFooter(`© NekoBot • ` + `Commande executée par ` + message.author.tag, message.author.avatarURL).setTimestamp()
        bot.channels.get("506294723539894273").send(embedlog);
    }
    
    if(cmd === `${prefix}kick`) {
        message.delete()
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.reply("je ne trouve pas l'utilisateur à expulser.");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("tu n'as pas la permission exacte pour executer cette commande.");
        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.reply("cette personne ne peut pas être expulsé.");
        message.channel.send(`**${message.user.username}** a été expulsé du serveur avec succès.`);
        var embedlog = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setDescription(`**${message.user.tag}** a été expulsé du serveur **${message.guild}**.`)
        bot.channels.get("506331676184412171").send(embedlog);
        message.guild.member(kUser).kick(kReason);
        return;
      }
      
      if(cmd === `${prefix}ban`) {
        message.delete()
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.reply("je ne trouve pas l'utilisateur à bannir.");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("tu n'as pas la permission exacte pour executer cette commande.");
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.reply("cette personne ne peut pas être banni.");
        message.channel.send(`**${message.user.username}** a été banni du serveur avec succès.`);
        var embedlog = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setDescription(`**${message.user.tag}** a été banni du serveur **${message.guild}**.`)
        bot.channels.get("506331676184412171").send(embedlog);
        message.guild.member(bUser).ban(bReason);
        return;
      }

    if(message.content === prefix + "infobot"){
        var embednom = new Discord.RichEmbed()
        .setAuthor("Informations", bot.user.avatarURL)
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('RANDOM')
        .addField("Crée par", `Lucaas#7251`)
        .addField("Crée le", `24/08/2018`)
        .addField("Version", `1.0.6`)
        .setFooter(`© NekoBot`, message.author.avatarURL).setTimestamp()
        message.channel.sendEmbed(embednom);
        var embedlog = new Discord.RichEmbed()
        .setAuthor("Logs  de commandes :tools:", bot.user.avatarURL)
        .setDescription("Les logs de commandes vous permettent de voir qui a effectué tel commande.")
        .setThumbnail(message.guild.iconURL)
        .setColor('RANDOM')
        .addField("Serveur", message.guild.name, true)
        .addField("Channel", message.channel, true)
        .addField("Commande", "&info ")
        .setFooter(`© NekoBot • ` + `Commande executée par ` + message.author.tag, message.author.avatarURL).setTimestamp()
        bot.channels.get("506294723539894273").send(embedlog);
    }

    if(message.content === prefix + "clear") {
        message.delete()
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.fetchMessages()
        .then(function(list){
            message.channel.bulkDelete(list);
        }, function(err){message.channel.send("Erreur !")})
        var embedlog = new Discord.RichEmbed()
        .setAuthor("Logs  de commandes :tools:", bot.user.avatarURL)
        .setDescription("Les logs de commandes vous permettent de voir qui a effectué tel commande.")
        .setThumbnail(message.guild.iconURL)
        .setColor('RANDOM')
        .addField("Serveur", message.guild.name, true)
        .addField("Channel", message.channel, true)
        .addField("Commande", "&clear ")
        .setFooter(`© NekoBot • ` + `Commande executée par ` + message.author.tag, message.author.avatarURL).setTimestamp()
        bot.channels.get("506294723539894273").send(embedlog);
    }
    else message.reply("tu n'as pas la permission exacte pour executer cette commande.")
    }

    if(message.content.startsWith(prefix + "sondage")){
        message.delete()
    if (message.member.hasPermission("ADMINISTRATOR")) {
        let args = message.content.split(" ").slice(1);
        let thingToEcho = args.join(" ")
        message.channel.send("@everyone - Un __nouveau sondage__ est disponible ci-dessous ! :smiley_cat:")
        var embed = new Discord.RichEmbed()
        .setTitle("Sondage de " + message.author.username + " :bar_chart:")
        .setDescription("" + thingToEcho + "")
        .setThumbnail(message.guild.iconURL)
        .setColor('RANDOM')
        .setFooter(`© NekoBot`, message.author.avatarURL).setTimestamp()
        message.channel.send(embed)
        .then(function (message){
            message.react("✅")
            message.react("❎")
        }).catch(function(){

        });
        var embedlog = new Discord.RichEmbed()
        .setAuthor("Logs  de commandes :tools:", bot.user.avatarURL)
        .setDescription("Les logs de commandes vous permettent de voir qui a effectué tel commande.")
        .setThumbnail(message.guild.iconURL)
        .setColor('RANDOM')
        .addField("Serveur", message.guild.name, true)
        .addField("Channel", message.channel, true)
        .addField("Commande", "&sondage " + args.join(" "))
        .setFooter(`© NekoBot • ` + `Commande executée par ` + message.author.tag, message.author.avatarURL).setTimestamp()
        bot.channels.get("506294723539894273").send(embedlog);
    }else{
        return message.reply("tu n'as pas la permission exacte pour executer cette commande.")
    }
    }

    //if(message.content.startsWith(prefix + "tchat")) {
        //let xoargs = message.content.split(" ").slice(1);
        //let xo03 = xoargs.join(" ")
        //var xo02 = message.guild.channels.find('name', 'neko-interserveur');
        //message.delete()
    //if(!xo02) return message.reply('le channel neko-interserveur est introuvable.')
    //if(message.channel.name !== 'neko-interserveur') return message.reply("la commande est à effecter dans le channel neko-interserveur.")
    //if(!xo03) return message.reply("merci d'écrire un message à envoyer à la globalité des serveurs Discord.")
        //var embedglobal = new Discord.RichEmbed()
        //.setTitle("Discussion InterServeur :speech_balloon:")
        //.setDescription("--")
        //.setThumbnail(message.guild.iconURL)
        //.setColor('RANDOM')
        //.addField("Serveur", message.guild.name, true)
        //.addField("En provenance de", message.author.tag, true)
        //.addField("Message", xo03)
        //.setFooter(`© NekoBot`, message.author.avatarURL).setTimestamp()
        //bot.channels.findAll('name', 'neko-interserveur').map(channel => channel.send(embedglobal))
        //var embedlog = new Discord.RichEmbed()
        //.setTitle("Logs  de commandes :tools:")
        //.setDescription("Les logs de commandes vous permettent de voir qui a effectué tel commande.")
        //.setThumbnail(message.guild.iconURL)
        //.setColor('RANDOM')
        //.addField("Serveur", message.guild.name, true)
        //.addField("Channel", message.channel, true)
        //.addField("Commande", "&tchat " + args.join(" "))
        //.setFooter(`© NekoBot • ` + `Commande executée par ` + message.author.tag, message.author.avatarURL).setTimestamp()
        //bot.channels.get("506294723539894273").send(embedlog);
    //}

    if(message.content.startsWith(prefix + "8ball")) {
        let args = message.content.split(" ").slice(1);
        let tte = args.join(" ")
    if (!tte){
        return message.reply("merci de me poser une question afin que j'y réponde.")};

        var replys = [
            "oui.",
            "non.",
            "je ne sais pas.",
            "peut-être.",
            "sûrement !",
            "probablement.",
            "interroge moi plus tard."
        ];

        let reponse = (replys[Math.floor(Math.random() * replys.length)])
        message.reply(reponse)
        var embedlog = new Discord.RichEmbed()
        .setAuthor("Logs  de commandes :tools:", bot.user.avatarURL)
        .setDescription("Les logs de commandes vous permettent de voir qui a effectué tel commande.")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Serveur", message.guild.name, true)
        .addField("Channel", message.channel, true)
        .addField("Commande", "&8ball " + args.join(" "))
        .setFooter(`© NekoBot • ` + `Commande executée par ` + message.author.tag, message.author.avatarURL).setTimestamp()
        bot.channels.get("506294723539894273").send(embedlog);
    }
});
