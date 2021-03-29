class Command
{
    static commands = [];
    /**
     * Name of the command
     */
    name;
    alias = [];
    description;
    permission = null;

    match(label)
    {
        return this.alias.includes(label);
    }

    hasPermission(member)
    {
        if (this.permission == null)
            return true;
        return member.roles.cache.some(role => role.name == this.permission);
    }

    call()
    {
        throw new Error("Method not implemented");
    }

    static registerCommands()
    {
        Command.commands.push(new HelpCommand());
        Command.commands.push(new SuggestionCommand());
        Command.commands.push(new RejectCommand());
        Command.commands.push(new AcceptCommand());
    }
}

module.exports.Command = Command;

let {HelpCommand} = require('./help');
let {SuggestionCommand} = require('./suggestion');
let {RejectCommand} = require('./reject');
let {AcceptCommand} = require('./accept');
