const Discord = require('discord.js');
const TrelloAPI = require('trello-node-api');

class Bot
{
    static instance;
    config;
    /**
     * Discord bot instance
     */
    discord;
    trello;

    constructor(config)
    {
        this.config = config;
        this.discord = new Discord.Client();
        this.discord.login(this.config.token);
        this.get_trello();

        this.discord.on('ready', () => {
            console.log("Client up and ready.");

            this.discord.on('message', m => this.on_message(m));
        });

        Bot.instance = this;
    }

    get_trello()
    {
        this.trello = TrelloAPI(this.config.trello.key, this.config.trello.oauth);
        this.trello.board.search(this.config.trello.board).then(resp => {
            console.log("Connected to trello!");
        }).catch(console.error);
    }

    parse_command(message)
    {
        let raw = message.content.slice(this.config.prefix.length);
        let args = raw.split(' ');
        let cmd = {
            label: args[0],
            args: args,
            msg: message
        };
        return cmd;
    }

    on_message(message)
    {
        if (message.content.startsWith(this.config.prefix))
        {
            let cmd = this.parse_command(message);
            let command = Command.commands.find(c => c.match(cmd.label));
            if (command == null)
                return;
            command.call(cmd);
        }
    }

    async get_channel()
    {
        let channel = await this.discord.channels.fetch(this.config.suggestionChannel)
        return channel;
    }
}

module.exports.Bot = Bot;

const {Command} = require('./Command');
