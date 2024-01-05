module.exports = {
    name: "Screenshot",
    run: async (handler) => {
        return new Promise(async (resolve, reject) => {
            await handler.send("code .").catch(reject)
            resolve()
        })
    }
}