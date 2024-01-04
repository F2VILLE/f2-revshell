const logger = require("../utils/logger")

module.exports = {
    name: "start",
    description: "Start to listen for incoming connections",
    rule: (main) => {
        return main.currentHandler >= 0
    },
    usage: "start",
    run: async (main, args) => {
        await main.handlers[main.currentHandler].start()
    }
}