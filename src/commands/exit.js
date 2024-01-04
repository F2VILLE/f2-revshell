const logger = require("../utils/logger")

module.exports = {
    name: "exit",
    description: "Exit application",
    usage: "exit",
    run: () => {
        logger.log("Bye !")
        process.exit(0)
    }
}