const logger = require("../utils/logger")

module.exports = {
    name: "list_handler",
    description: "List all created handlers",
    usage: "list_handler",
    run: (main, args) => {
        main.handlers.forEach((h, i) => {
            console.log((`[${i}] `)[(h.status ? "green": "red")]() + h.name.yellow() + " : " + h.publicAddress + ":" + h.port)
        })
    }
}