class Command
{
    static commands = [];
    /**
     * Name of the command
     */
    name;
    alias = [];
    description;

    match(label)
    {
        return this.alias.includes(label);
    }

    call()
    {
        throw new Error("Method not implemented");
    }

    static registerCommands()
    {
        Command.commands.push(new HelpCommand());
        Command.commands.push(new SuggestionCommand());
    }
}

module.exports.Command = Command;

let {HelpCommand} = require('./help');
let {SuggestionCommand} = require('./suggestion');
