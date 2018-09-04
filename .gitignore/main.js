const Discord = require('discord.js');

var bot = new Discord.Client();
var prefix = ("&");

bot.on('ready', () => {
    //bot.user.setActivity(bot.guilds.size + ' SERVEURS | 🍁', "https://www.twitch.tv/neko");
    //bot.user.setActivity(bot.guilds.size + ' SERVEURS | 🍁', {type: 'LISTENING'});
    //bot.user.setActivity(bot.guilds.size + ' SERVEURS | 🍁', {type: 'WATCHING'});
    bot.user.setActivity(bot.guilds.size + ' SERVS • ' + bot.users.size + ' USERS 🍁', {url:"https://www.twitch.tv/nekobot", type: "STREAMING"})
    console.log(`${bot.user.tag} est en ligne sur ${bot.guilds.size} serveurs avec ${bot.users.size} utilisateurs !`)
    console.log(`--`);
});

bot.login(process.env.loginuser);

bot.on('message', message => {
    if(message.content === prefix + "test") {
        message.channel.send("Je suis bien en ligne ! :computer:");
        var embedlog = new Discord.RichEmbed()
        .setTitle("Ultralogs :tools:")
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Utilisateur", message.author.tag, true)
        .addField("Discord", message.guild.name, true)
        .addField("Commande", "&test")
        .setFooter(`Commande effectuée par ` + message.author.username, message.author.avatarURL).setTimestamp()
        bot.channels.get("476610621375512595").send(embedlog);
    }
    
    if(message.content === "salut Neko") {
        message.channel.send(`Salut salut !`);
    }

    let args = message.content.split(" ").slice(1);
    if(message.content.startsWith(prefix + "say")) {
        message.delete()
        message.channel.send(`**` + message.author.tag + `: **` + args.join(" "));
        var embedlog = new Discord.RichEmbed()
        .setTitle("Ultralogs :tools:")
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Utilisateur", message.author.tag, true)
        .addField("Discord", message.guild.name, true)
        .addField("Commande", "&say " + args.join(" "))
        .setFooter(`Commande effectuée par ` + message.author.username, message.author.avatarURL).setTimestamp()
        bot.channels.get("476610621375512595").send(embedlog);
    }

    if(message.content === prefix + "help"){
        var embednom = new Discord.RichEmbed()
        .setTitle("Commandes :tools:")
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("&test", "Effectuer un test pour voir si Neko est bien en ligne.")
        .addField("&help", "Afficher toutes les commades de Neko.")
        .addField("&reglement", "Afficher le règlement d'utilisation de Neko.")
        .addField("&info", "Afficher toutes les informations de Neko.")
        .addField("&alerte", "Afficher une information importante.")
        .addField("&sondage", "Afficher un sondage.")
        .addField("&clear", "Effacer plusieurs messages du channel.")
        .addField("&globaltchat", "Communiquer entre serveurs.")
        .addField("&say", "Afficher le message du joueur.")
        .addField("&8ball", "Donner une réponse à votre question.")
        .setFooter(`Commande effectuée par ` + message.author.username, message.author.avatarURL).setTimestamp()
        message.channel.sendEmbed(embednom);
        var embedlog = new Discord.RichEmbed()
        .setTitle("Ultralogs :tools:")
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Utilisateur", message.author.tag, true)
        .addField("Discord", message.guild.name, true)
        .addField("Commande", "&help")
        .setFooter(`Commande effectuée par ` + message.author.username, message.author.avatarURL).setTimestamp()
        bot.channels.get("476610621375512595").send(embedlog);
    }

    if(message.content === prefix + "reglement"){
        message.delete()
        var embednom = new Discord.RichEmbed()
        .setTitle("Règlement :warning:")
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("AVANT TOUT", "Toute décision d'un Administrateur, qu'elle soit justifiée par un article de ce présent règle ou non, ne devra être contestée par un membre du serveur. Ce règlement est susceptible de changer à tout moment, vous êtes donc priés vous tenir informés le plus régulièrement possible. En utilisant Neko, vous certifiez explicitement avoir lu et accepté le règlement.")
        .addField("Ⅰ - Pseudonyme & Avatar", "Bien que vous soyez libre du choix de votre pseudonyme et votre avatar, il y a quand même quelques règles à respecter. Par conséquent, votre pseudonyme et avatar ne doivent pas avoir de caractère pornographique; ne doivent pas pouvoir être confondu/ressemblant avec/à celui d'un membre du staff; ne doivent faire aucune référence à un autre serveur; ne doivent pas être cause de débat principalement politique ou religieux; ne doivent pas contenir de propos racistes, homophobes, sexistes ou faire référence à la drogue.")
        .addField("Ⅱ - Conduite à tenir", "Comme partout, vous vous devez de tenir une conduite plus ou moins correcte, dans le respect de tous. Par conséquent, voici quelques règles à respecter dans toutes circonstances, sachez garder votre calme; ne pas recourir aux insultes; soyez respectueux, courtois, poli envers les utilisateurs et le staff. Bonjour, merci, au revoir n'ont jamais tué personne; ne dévoilez sous aucun prétexte vos informations de compte, même à un membre du staff !")
        .addField("Ⅲ - Besoin d'un modérateur", "Si vous avez besoin d'un renseignement, veuillez vous diriger vers le Discord du bot, contacter un modérateur en privé.")
        .addField("Ⅳ - Sanctions encourues", "Les sanctions peuvent varier selon la gravité de la faute. Les sanctions seront à l'appréciation du membre du staff en fonction de la gravité de la faute. Toute référence à un autre serveur dans le but de lui faire de la publicité est punie par un ban définitif du Discord. Les insultes sont réprimandées par un ban temporaire ou définitif. Tout est proportionnel à la gravité des insultes et leur contexte. Les pseudonymes hors-charte peuvent être sanctionnés par un bannissement temporaire, un kick ou tout simplement une demande de changement de pseudonyme. Si le joueur refuse d'obtempérer, le modérateur se réservera le droit de le bannir temporairement. L'usurpation d'identité d'un membre du staff, avec ou sans intention de nuire, se verra immédiatement et sans préavis sanctionnée d'un ban de 7 jours du Discord. En cas de récidive, le staff se réserve le droit d'alourdir les sanctions.")
        .setFooter(`Commande effectuée par ` + message.author.username, message.author.avatarURL).setTimestamp()
        message.channel.sendEmbed(embednom);
        var embedlog = new Discord.RichEmbed()
        .setTitle("Ultralogs :tools:")
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Utilisateur", message.author.tag, true)
        .addField("Discord", message.guild.name, true)
        .addField("Commande", "&reglement")
        .setFooter(`Commande effectuée par ` + message.author.username, message.author.avatarURL).setTimestamp()
        bot.channels.get("476610621375512595").send(embedlog);
    }

    if(message.content === prefix + "info"){
        var embednom = new Discord.RichEmbed()
        .setTitle("Informations :level_slider:")
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Crée par", `Lucaas#7251`)
        .addField("Crée le", `24/08/2018`)
        .addField("Version", `1.0.0`)
        .setFooter(`Commande effectuée par ` + message.author.username, message.author.avatarURL).setTimestamp()
        message.channel.sendEmbed(embednom);
        var embedlog = new Discord.RichEmbed()
        .setTitle("Ultralogs :tools:")
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Utilisateur", message.author.tag, true)
        .addField("Discord", message.guild.name, true)
        .addField("Commande", "&info")
        .setFooter(`Commande effectuée par ` + message.author.username, message.author.avatarURL).setTimestamp()
        bot.channels.get("476610621375512595").send(embedlog);
    }

    if(message.content === prefix + "clear") {
        message.delete()
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.fetchMessages()
        .then(function(list){
            message.channel.bulkDelete(list);
        }, function(err){message.channel.send("Erreur !")})
        var embedlog = new Discord.RichEmbed()
        .setTitle("Ultralogs :tools:")
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Utilisateur", message.author.tag, true)
        .addField("Discord", message.guild.name, true)
        .addField("Commande", "&clear")
        .setFooter(`Commande effectuée par ` + message.author.username, message.author.avatarURL).setTimestamp()
        bot.channels.get("476610621375512595").send(embedlog);
    }
    else message.reply("tu n'as pas la permission exacte pour executer cette commande.")
    }

    if(message.content.startsWith(prefix + "alerte")) {
        message.delete()
    if(!message.member.hasPermission(`ADMINISTRATOR`)) return message.reply("tu n'as pas la permission exacte pour executer cette commande.");
        const embed = new Discord.RichEmbed()
        .setTitle("Information importante de " + message.author.username + " :rotating_light:")
        .setDescription("" + args.join(" ") + "")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .setFooter(`Commande effectuée par ` + message.author.username, message.author.avatarURL).setTimestamp()
        message.channel.send(embed)
        var embedlog = new Discord.RichEmbed()
        .setTitle("Ultralogs :tools:")
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Utilisateur", message.author.tag, true)
        .addField("Discord", message.guild.name, true)
        .addField("Commande", "&alerte " + args.join(" "))
        .setFooter(`Commande effectuée par ` + message.author.username, message.author.avatarURL).setTimestamp()
        bot.channels.get("476610621375512595").send(embedlog);
    }

    if(message.content.startsWith(prefix + "sondage")){
        message.delete()
    if (message.member.hasPermission("ADMINISTRATOR")) {
        let args = message.content.split(" ").slice(1);
        let thingToEcho = args.join(" ")
        var embed = new Discord.RichEmbed()
        .setTitle("Sondage de " + message.author.username + " :bar_chart:")
        .setDescription("" + thingToEcho + "")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .setFooter(`Commande effectuée par ` + message.author.username, message.author.avatarURL).setTimestamp()
        message.channel.send(embed)
        .then(function (message){
            message.react("✅")
            message.react("❎")
        }).catch(function(){

        });
        var embedlog = new Discord.RichEmbed()
        .setTitle("Ultralogs :tools:")
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Utilisateur", message.author.tag, true)
        .addField("Discord", message.guild.name, true)
        .addField("Commande", "&sondage " + thingToEcho)
        .setFooter(`Commande effectuée par ` + message.author.username, message.author.avatarURL).setTimestamp()
        bot.channels.get("476610621375512595").send(embedlog);
    }else{
        return message.reply("tu n'as pas la permission exacte pour executer cette commande.")
    }
    }

    if(message.content.startsWith(prefix + "globaltchat")) {
        let xoargs = message.content.split(" ").slice(1);
        let xo03 = xoargs.join(" ")
        var xo02 = message.guild.channels.find('name', 'neko-global');
        message.delete()
    if(!xo02) return message.reply('le channel neko-global est introuvable.')
    if(message.channel.name !== 'neko-global') return message.reply("la commande est à effecter dans le channel neko-global.")
    if(!xo03) return message.reply("merci d'écrire un message à envoyer à la globalité des serveurs Discord.")
        var embedglobal = new Discord.RichEmbed()
        .setTitle("Discussion interserveur :speech_balloon:")
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Utilisateur", message.author.tag, true)
        .addField("Discord", message.guild.name, true)
        .addField("Message", xo03)
        .setFooter(`Commande effectuée par ` + message.author.username, message.author.avatarURL).setTimestamp()
        bot.channels.findAll('name', 'neko-global').map(channel => channel.send(embedglobal))
        var embedlog = new Discord.RichEmbed()
        .setTitle("Ultralogs :tools:")
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Utilisateur", message.author.tag, true)
        .addField("Discord", message.guild.name, true)
        .addField("Commande", "&globaltchat " + xo03)
        .setFooter(`Commande effectuée par ` + message.author.username, message.author.avatarURL).setTimestamp()
        bot.channels.get("476610621375512595").send(embedlog);
    }

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
        .setTitle("Ultralogs :tools:")
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Utilisateur", message.author.tag, true)
        .addField("Discord", message.guild.name, true)
        .addField("Commande", "&8ball " + tte)
        .setFooter(`Commande effectuée par ` + message.author.username, message.author.avatarURL).setTimestamp()
        bot.channels.get("476610621375512595").send(embedlog);
    }
});
