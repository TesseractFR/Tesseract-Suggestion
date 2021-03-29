let {Command} = require('./Command');

class RejectCommand extends Command
{
    constructor()
    {
        super();
        this.name = 'reject';
        this.alias = ['reject', 'r'];
        this.description = 'Refuser une suggestion';
    }

    async call(cmd)
    {
        let info = this.parse(cmd.msg.content);
        if (!info)
        {
            cmd.msg.reply('Erreur de syntaxe');
            return;
        }
        let msgInfo = await this.update_card(info.id, info.reason, cmd.msg);

        let channel = await Bot.instance.get_channel();
        let msg = await channel.messages.fetch(msgInfo.answerID).catch(console.error);
        let embed = msg.embeds[0];
        embed.setColor('RED');
        let field = embed.fields.find(f => f.name == 'État');
        field.value = 'Refusée. Raison : ' + info.reason;
        msg.edit(embed);

        let origin = await channel.messages.fetch(msgInfo.messageID).catch(console.error);
        origin.reply('ta suggestion a été traitée : ' + msg.url);
    }

    async update_card(id, reason, msg)
    {
        let card;
        try
        {
            card = await Bot.instance.trello.card.search(id);
        } catch(err) {
            console.error(err);
            msg.reply('Card not found');
        }

        let data = {
            desc: "Refusée : " + reason + '\n' + card.desc
        };
        Bot.instance.trello.card.update(id, data).catch(console.error);

        let tag = card.desc.match('messageID : ([0-9]+)\n');
        let info = {
            messageID: tag[1]
        };
        tag = card.desc.match('answerID : ([0-9]+)\n');
        info.answerID = tag[1];
        return info;
    }

    parse(message)
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
            id: parts[0],
            reason: parts[1]
        };
        return res;
    }
}

module.exports.RejectCommand = RejectCommand;

let {Bot} = require('./bot');
let Suggestion = require('./suggestion');
