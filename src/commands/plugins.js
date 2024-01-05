const logger = require("../utils/logger"),
    fs = require("fs")

module.exports = {
    name: "plugins",
    rule: (main) => {
        return main.currentHandler >= 0
    },
    description: `Manage plugins`,
    usage: `plugins <list:refresh>
    list - List the currently loaded plugins
    refresh - Check for new plugins in the folder (f2rs/config/plugins)`,
    run: async (main, args) => {
        return new Promise((resolve, reject) => {
            try {
                if (args.length == 0 || args[0] == "list" || args[0] == "ls") {
                    const pluginsConfig = process.cwd() + "/config/plugins.json"
                    const plugins = JSON.parse(fs.readFileSync(pluginsConfig))
                    console.log(plugins.map(x => `[${((x.name??"Invalid Name").toString())[(fs.existsSync(process.cwd() + "/config/plugins/" + x["package-name"]??"null") ? "green" : "red")]()}] ${("/config/plugins/" + x["package-name"]??"null")}`).join("\n"))
                }
                else if (args[0] == "refresh") {
                }
                resolve()    
            } catch (error) {
                reject(error)
            }
        })
    }
}