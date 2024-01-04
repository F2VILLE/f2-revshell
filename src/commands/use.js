const logger = require("../utils/logger")

module.exports = {
    name: "use",
    description: "Select a handler",
    usage: "use <handler_id:handler_name>",
    run: (main, args) => {
        if (!args[0]) {
            if (main.currentHandler < 0) return logger.error("Missing handler name or id")
            main.currentHandler = -1
            return 
        }
        if ((!main.handlers[parseInt(args[0])]) && !main.handlers.find(x => x.name == args[0])) return logger.error("Handler not found")
        main.currentHandler = (main.handlers[parseInt(args[0])] ? parseInt(args[0]) : main.handlers.findIndex(x => x.name == args[0]))
    }
}