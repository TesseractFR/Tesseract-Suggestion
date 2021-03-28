const Discord = require('discord.js');
const {Command} = require('./Command');

class Bot
{
    static instance;
    config;
    /**
     * Discord bot instance
     */
    discord;

    constructor(config)
    {
        this.config = config;
        this.discord = new Discord.Client();
        this.discord.login(this.config.token);

        this.discord.on('ready', () => {
            console.log("Client up and ready.");

            this.discord.on('message', m => this.on_message(m));
        });

        Bot.instance = this;
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
}

module.exports.Bot = Bot;
