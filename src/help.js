let {Command} = require('./Command');
const Discord = require('discord.js');

class HelpCommand extends Command
{
    constructor()
    {
        super();
        this.name = 'help';
        this.alias = ['help', 'h'];
        this.description = 'Liste les commandes du bot';
    }

    call(cmd)
    {
        let embed = new Discord.MessageEmbed();
        embed.setTitle('Liste des commandes :')
            .setColor('BLUE')
            .setFooter('By GabRay');

        Command.commands.forEach(c => {
            embed.addField(Bot.instance.config.prefix + c.name, c.description);
        });

        cmd.msg.channel.send(embed).catch(err => {
            console.error(err);
        });
    }
}

module.exports.HelpCommand = HelpCommand;

let {Bot} = require('./bot');
