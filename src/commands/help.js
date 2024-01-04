const logger = require("../utils/logger")

module.exports = {
    name: "help",
    description: "Display this help message",
    usage: "help",
    run: (main) => {
        main.commands.forEach((cmd) => {
            console.log("")
            if (cmd.rule && !cmd.rule(main)) return 
            logger.log(cmd.name.yellow() + " : " + cmd.description + (cmd.usage ? ("\n    Usage : " + cmd.usage).gray() : ""))
        })
    }
}