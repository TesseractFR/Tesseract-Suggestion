let {Command} = require('./Command');
const Discord = require('discord.js');

class SuggestionCommand extends Command
{
    constructor()
    {
        super();
        this.name = 'suggestion';
        this.alias = ['suggestion', 's', 'sugg'];
        this.description = 'Faire une suggestion';
    }

    async call(cmd)
    {
        let info = this.parse_suggestion(cmd.msg.content);
        let card;
        try
        {
            card = await this.create_card(cmd, info);
        } catch (err)
        {
            console.error(err);
            cmd.msg.reply('`Unexpected error.`');
            return;
        }

        let embed = new Discord.MessageEmbed();
        embed.setTitle('Suggestion ajoutée')
            .setColor('GREEN')
            .setFooter('Proposé par ' + cmd.msg.author.tag);
        embed.addField('Titre', info.title);
        embed.addField('Description', info.desc);
        embed.addField('Trello id', card.shortLink);
        embed.addField('Trello url', card.shortUrl);

        console.log('New suggestion by', cmd.msg.author.tag);
        console.log('Title :', info.title, 'Trello id :', card.shortUrl);
        cmd.msg.channel.send(embed).catch(console.error);
    }

    parse_suggestion(message)
    {
        let firstSpace = message.indexOf(' ');
        if (firstSpace == -1)
            return false;
        let str = message.slice(firstSpace + 1);

        let sep = str.indexOf(':');
        if (sep == -1)
            return false;

        let parts = str.split(':');
        let res = {
            title: parts[0],
            desc: parts[1]
        };
        return res;
    }

    create_card(cmd, info)
    {
        return new Promise(async (resolve, reject) => {
            let str = "Auteur : " + cmd.msg.author.tag + '\n';
            str += "messageID : " + cmd.msg.id + '\n';
            str += "\n" + info.desc;
            let data = {
                name: info.title,
                desc: str,
                pos: 'bottom',
                idList: Bot.instance.config.trello.addto,
                due: null,
                dueComplete: false,
                idMembers: [],
                idLabels: [],
                urlSource: cmd.msg.url,
            };

            try
            {
                let card = await Bot.instance.trello.card.create(data);
                return resolve(card);
            } catch(err)
            {
                reject(err);
            }
        })
    }
}

module.exports.SuggestionCommand = SuggestionCommand;

let {Bot} = require('./bot');
