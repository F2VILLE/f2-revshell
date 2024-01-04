const logger = require("../utils/logger")
const motd = require("../utils/motd")
module.exports = {
    name: "clear",
    description: "Clean the console and reprint MOTD",
    usage: "clear",
    run: () => {
        motd()
    }
}