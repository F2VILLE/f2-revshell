const motd = require("./src/utils/motd"),
    ask = require("./src/utils/ask"),
    logger = require("./src/utils/logger"),
    fs = require("fs")

const main = {
    commands: new Map(),
    handlers: [],
    currentHandler: -1
}

for (const file of fs.readdirSync("./src/commands")) {
    const prop = require("./src/commands/" + file)
    main.commands.set(prop.name, prop)
}

function mainCMD() {
    console.log("")
    ask(`${(main.currentHandler >= 0 ? ("[".gray() + `@${main.handlers[main.currentHandler].name}`.red() + "]".gray()) : "RevShell")} (${"Type '".gray() + "help".blue() + "' for help".gray()})`).then(async answer => {
        const args = answer.split(" ")
        const cmd = args.shift().toLowerCase()

        if (main.commands.has(cmd)) {
            if (main.commands.get(cmd).rule && !main.commands.get(cmd).rule(main)) {
                logger.error("You can't use the command " + cmd.yellow() + " in this context !")
            }
            else {
                try {
                    await main.commands.get(cmd).run(main, args)
                } catch (error) {
                    logger.error(error)
                }
            }
        }
        else {
            logger.error("Unknown command " + cmd.red())
        }
        mainCMD()
    }).catch(console.error)
}

motd()
mainCMD()