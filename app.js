const {Bot} = require('./src/bot.js');
const {Command} = require('./src/Command.js');
const fs = require('fs');

function load_config(path)
{
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf-8", (err, data) => {
            if (err)
                return reject();
            return resolve(JSON.parse(data));
        });
    });
}

load_config('./config.json').then(async config => {
    new Bot(config);
    Command.registerCommands();
});
