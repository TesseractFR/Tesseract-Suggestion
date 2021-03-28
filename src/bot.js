const Discord = require('discord.js');

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
        this.discord.login(config.token);

        this.discord.on('ready', () => {
            console.log("Client up and ready.");

            this.discord.channels.fetch(config.suggestionChannel).then(c =>
                {
                    c.send("Hello World!");
                });
        });

        Bot.instance = this;
    }
}

module.exports.Bot = Bot;
