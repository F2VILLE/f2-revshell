const logger = require("../utils/logger"),
    Handler = require("../class/Handler")


module.exports = {
    name: "create_handler",
    description: "Create a new handler",
    usage: "create_handler <name> <public_ip> <port>",
    run: (main, args) => {
        if (!args[0]) return logger.error("Missing handler name")
        const options = {}
        if (args[1]) options.publicAddress = args[1]
        if (args[2]) options.port = args[2]
        const handler = new Handler(
            args[0],
            options
        )
        main.handlers.push(handler)
    }
}