const logger = require("../utils/logger"),
    payloads = require("../../config/payloads.json"),
    ask = require("../utils/ask")

async function askPayload(payloads, main, handler) {
    return new Promise(async (resolve, reject) => {
        await ask("Select a payload")
        .then(async (payload) => {
            if (payloads[payload]) {
                logger.log(`[${payloads[payload].name.yellow()}] ${payloads[payload].payload.replace("{%ip%}", handler.publicAddress).replace("{%port%}", handler.port)}`)
                resolve()
            } else {
                logger.error("Invalid payload")
                askPayload(payloads, main, handler)
            }
        }).catch(reject)    
    })
}

module.exports = {
    name: "payload",
    rule: (main) => {
        return main.currentHandler >= 0
    },
    description: "List all created handlers",
    usage: "payload",
    run: async (main, args) => {
        const handler = main.handlers[main.currentHandler]
        for (const p of payloads) {
            logger.log(`[${payloads.indexOf(p).toString().blue()}] ${p.name}`)
        }
        
        await askPayload(payloads, main, handler)
    }
}