const net = require("net"),
    logger = require("../utils/logger"),
    ask = require("../utils/ask")

class Handler {
    constructor(handlerName, options = {publicAddress: "127.0.0.1", port: 1234}) {
        this.name = handlerName
        this.socket = null
        this.publicAddress = options.publicAddress ?? "127.0.0.1"
        this.port = options.port ?? 1234
        this.status = 0
        this.server = net.createServer()
        this.outBuffer = []
    }

    async listen() {
        return new Promise((resolve, reject) => {
            this.server.listen(this.port, this.publicAddress, () => {
                this.status = 1
                resolve()
            })
        })
    }

    async send(data) {
        return new Promise((resolve, reject) => {
            this.session.write(data + "\n", () => {
                resolve()
            })
        })
    }

    async checkBuffer() {
        return new Promise((resolve, reject) => {
            if (this.outBuffer.length > 0) {
                resolve()
            } else {
                setTimeout(() => {
                    resolve()
                }, 100)
            }
        })
    }

    async interact() {
        return new Promise(async (resolve, reject) => {
            logger.log(`[${this.name.yellow()}] Interacting with ${this.session.remoteAddress}:${this.session.remotePort}`)
            while (true) {
                await ask(`${this.name.yellow()} $`).then(async (answer) => {
                    if (answer == "exit") {
                        this.session.end()
                        return resolve()
                    }
                    await this.send(answer)
                    await this.checkBuffer()
                    while (this.outBuffer.length > 0) {
                        console.log(this.outBuffer.shift())
                    }
                }).catch(reject)
            }
        })
    }

    async start() {
        return new Promise(async (resolve, reject) => {
            await this.listen()
            await (new Promise((resolve, reject) => {
                this.server.on("connection", async (socket) => {
                    this.session = socket
                    this.session.setEncoding("utf-8")
                    this.session.on("data", (data) => {
                        this.outBuffer.push(data)
                    })
                    this.session.on("end", () => {
                        this.session = null
                        logger.log(`[${this.name.yellow()}] Connection closed`)
                        resolve()
                    })
                    this.session.on("error", (err) => {
                        logger.error(`[${this.name.yellow()}] ${err.message}`)
                    })
    
                    logger.log(`[${this.name.yellow()}] New connection from ${socket.remoteAddress}:${socket.remotePort}`)
    
                    await this.interact().then(resolve).catch(reject)
                })
            }))
            .then(resolve).catch(reject)
        })
    }
}

module.exports = Handler