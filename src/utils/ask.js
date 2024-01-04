const process = require("process"),
    logger = require("./logger")

const ask = async (question) => {
    return new Promise((resolve, reject) => {
        process.stdin.resume()
        process.stdout.write("[?] ".blue() + question + " > ")
        process.stdin.once("data", (data) => {
            process.stdin.pause()
            resolve(data.toString().trim())
        })
    })
}

module.exports = ask