const Discord = require('discord.js');

var bot = new Discord.Client();
var prefix = ("&");

bot.on('ready', () => {
    //bot.user.setGame(bot.guilds.size + ' SERVS 🍁', "https://www.twitch.tv/neko");
    //bot.user.setActivity(bot.guilds.size + ' SERVS 🍁', {type: 'LISTENING'});
    //bot.user.setActivity(bot.guilds.size + ' SERVS 🍁', {type: 'WATCHING'});
    bot.user.setActivity(bot.guilds.size + ' SERVS • ' + bot.users.size + ' USERS 🍁', {url:"https://www.twitch.tv/nekobot", type: "STREAMING"})
    console.log(`${bot.user.tag} est en ligne sur ${bot.guilds.size} serveurs avec ${bot.users.size} utilisateurs !`)
    console.log(`--`);
});

bot.on('message', message => {
    if(message.content === prefix + "test") {
        message.channel.send("Je suis bien en ligne ! :computer:");
        var embedlog = new Discord.RichEmbed()
        .setAuthor("Logs :tools:", message.author.avatarURL)
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Serveur", message.guild.name, true)
        .addField("En provenance de", message.author.tag, true)
        .setFooter(`© NekoBot • ` + `Commande effectuée par ` + message.author.username, bot.user.avatarURL).setTimestamp()
        bot.channels.get("476610621375512595").send(embedlog);
    }
    
    if(message.content === "salut Neko") {
        message.channel.send(`Salut salut !`);
    }

    let args = message.content.split(" ").slice(1);
    if(message.content.startsWith(prefix + "say")) {
        message.delete()
        message.channel.send(`**` + message.author.username + ` : **` + args.join(" "));
        var embedlog = new Discord.RichEmbed()
        .setAuthor("Logs :tools:", message.bot.avatarURL)
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Serveur", message.guild.name, true)
        .addField("En provenance de", message.author.tag, true)
        .addField("Commande", "&say " + args.join(" "))
        .setFooter(`© NekoBot • ` + `Commande effectuée par ` + message.author.username, message.bot.avatarURL).setTimestamp()
        bot.channels.get("476610621375512595").send(embedlog);
    }

    if(message.content === prefix + "help"){
        var embednom = new Discord.RichEmbed()
        .setAuthor("Commandes :tools:", message.author.avatarURL)
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("&test", "Effectuer un test pour voir si Neko est bien en ligne.")
        .addField("&help", "Afficher toutes les commades de Neko.")
        .addField("&info", "Afficher toutes les informations de Neko.")
        .addField("&alerte", "Afficher une information importante.")
        .addField("&sondage", "Afficher un sondage.")
        .addField("&clear", "Effacer plusieurs messages du channel.")
        .addField("&tchat", "Communiquer entre serveurs.")
        .addField("&say", "Afficher le message du joueur.")
        .addField("&8ball", "Donner une réponse à votre question.")
        .setFooter(`© NekoBot`, message.bot.avatarURL).setTimestamp()
        message.channel.sendEmbed(embednom);
        var embedlog = new Discord.RichEmbed()
        .setAuthor("Logs :tools:", message.author.avatarURL)
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Serveur", message.guild.name, true)
        .addField("En provenance de", message.author.tag, true)
        .addField("Commande", "&help ")
        .setFooter(`© NekoBot • ` + `Commande effectuée par ` + message.author.username, message.bot.avatarURL).setTimestamp()
        bot.channels.get("476610621375512595").send(embedlog);
    }

    if(message.content === prefix + "info"){
        var embednom = new Discord.RichEmbed()
        .setAuthor("Informations :level_slider:", message.author.avatarURL)
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Crée par", `Lucaas#7251`)
        .addField("Crée le", `24/08/2018`)
        .addField("Version", `1.0.0`)
        .setFooter(`© NekoBot`, message.bot.avatarURL).setTimestamp()
        message.channel.sendEmbed(embednom);
        var embedlog = new Discord.RichEmbed()
        .setAuthor("Logs :tools:", message.author.avatarURL)
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Serveur", message.guild.name, true)
        .addField("En provenance de", message.author.tag, true)
        .addField("Commande", "&info ")
        .setFooter(`© NekoBot • ` + `Commande effectuée par ` + message.author.username, message.bot.avatarURL).setTimestamp()
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
        .setAuthor("Logs :tools:", message.author.avatarURL)
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Serveur", message.guild.name, true)
        .addField("En provenance de", message.author.tag, true)
        .addField("Commande", "&clear ")
        .setFooter(`© NekoBot • ` + `Commande effectuée par ` + message.author.username, message.bot.avatarURL).setTimestamp()
        bot.channels.get("476610621375512595").send(embedlog);
    }
    else message.reply("tu n'as pas la permission exacte pour executer cette commande.")
    }

    if(message.content.startsWith(prefix + "alerte")) {
        message.delete()
    if(!message.member.hasPermission(`ADMINISTRATOR`)) return message.reply("tu n'as pas la permission exacte pour executer cette commande.");
        const embed = new Discord.RichEmbed()
        .setAuthor("Information importante de " + message.author.username + " :rotating_light:", message.author.avatarURL)
        .setDescription("" + args.join(" ") + "")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .setFooter(`© NekoBot`, message.bot.avatarURL).setTimestamp()
        message.channel.send(embed)
        var embedlog = new Discord.RichEmbed()
        .setAuthor("Logs :tools:", message.author.avatarURL)
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Serveur", message.guild.name, true)
        .addField("En provenance de", message.author.tag, true)
        .addField("Commande", "&alerte " + args.join(" "))
        .setFooter(`© NekoBot • ` + `Commande effectuée par ` + message.author.username, message.bot.avatarURL).setTimestamp()
        bot.channels.get("476610621375512595").send(embedlog);
    }

    if(message.content.startsWith(prefix + "sondage")){
        message.delete()
    if (message.member.hasPermission("ADMINISTRATOR")) {
        let args = message.content.split(" ").slice(1);
        let thingToEcho = args.join(" ")
        var embed = new Discord.RichEmbed()
        .setAuthor("Sondage de " + message.author.username + " :bar_chart:", message.author.avatarURL)
        .setDescription("" + thingToEcho + "")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .setFooter(`© NekoBot`, message.bot.avatarURL).setTimestamp()
        message.channel.send(embed)
        .then(function (message){
            message.react("✅")
            message.react("❎")
        }).catch(function(){

        });
        var embedlog = new Discord.RichEmbed()
        .setAuthor("Logs :tools:", message.author.avatarURL)
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Serveur", message.guild.name, true)
        .addField("En provenance de", message.author.tag, true)
        .addField("Commande", "&sondage " + args.join(" "))
        .setFooter(`© NekoBot • ` + `Commande effectuée par ` + message.author.username, message.bot.avatarURL).setTimestamp()
        bot.channels.get("476610621375512595").send(embedlog);
    }else{
        return message.reply("tu n'as pas la permission exacte pour executer cette commande.")
    }
    }

    if(message.content.startsWith(prefix + "tchat")) {
        let xoargs = message.content.split(" ").slice(1);
        let xo03 = xoargs.join(" ")
        var xo02 = message.guild.channels.find('name', 'neko-interserveur');
        message.delete()
    if(!xo02) return message.reply('le channel neko-interserveur est introuvable.')
    if(message.channel.name !== 'neko-interserveur') return message.reply("la commande est à effecter dans le channel neko-interserveur.")
    if(!xo03) return message.reply("merci d'écrire un message à envoyer à la globalité des serveurs Discord.")
        var embedglobal = new Discord.RichEmbed()
        .setAuthor("Discussion InterServeur :speech_balloon:", message.author.avatarURL)
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Serveur", message.guild.name, true)
        .addField("En provenance de", message.author.tag, true)
        .addField("Message", xo03)
        .setFooter(`© NekoBot`, message.bot.avatarURL).setTimestamp()
        bot.channels.findAll('name', 'neko-global').map(channel => channel.send(embedglobal))
        var embedlog = new Discord.RichEmbed()
        .seta("Logs :tools:", message.author.avatarURL)
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Serveur", message.guild.name, true)
        .addField("En provenance de", message.author.tag, true)
        .addField("Commande", "&tchat " + args.join(" "))
        .setFooter(`© NekoBot`, message.bot.avatarURL).setTimestamp()
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
        .setAuthor("Logs :tools:", message.author.avatarURL)
        .setDescription("--")
        .setThumbnail(message.guild.iconURL)
        .setColor('#ff0000')
        .addField("Serveur", message.guild.name, true)
        .addField("En provenance de", message.author.tag, true)
        .addField("Commande", "&8ball " + args.join(" "))
        .setFooter(`© NekoBot`, message.bot.avatarURL).setTimestamp()
        bot.channels.get("476610621375512595").send(embedlog);
    }
});


bot.login(process.env.loginuser);
