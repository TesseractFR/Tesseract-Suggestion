let {Command} = require('./Command');

class AcceptCommand extends Command
{
    constructor()
    {
        super();
        this.name = 'accept';
        this.alias = ['accept', 'a'];
        this.description = 'Accepter une suggestion';
    }

    async call(cmd)
    {
        let msgInfo = await this.update_card(cmd.args[1], cmd.msg);

        let channel = await Bot.instance.get_channel();
        let msg = await channel.messages.fetch(msgInfo.answerID).catch(console.error);
        let embed = msg.embeds[0];
        embed.setColor('GREEN');
        let field = embed.fields.find(f => f.name == 'État');
        field.value = 'Acceptée';
        msg.edit(embed);

        let origin = await channel.messages.fetch(msgInfo.messageID).catch(console.error);
        origin.reply('ta suggestion a été traitée : ' + msg.url);
    }

    async update_card(id, msg)
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
            desc: "Acceptée\n" + card.desc
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
}

module.exports.AcceptCommand = AcceptCommand;

let {Bot} = require('./bot');
let Suggestion = require('./suggestion');
