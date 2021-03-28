let {Command} = require('./Command');

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
        cmd.msg.reply('coucou toi');
    }
}

module.exports = HelpCommand;
