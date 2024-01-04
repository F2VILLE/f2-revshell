const colors = {
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37,
    gray: 90,
    grey: 90,
    bgRed: 41,
    bgGreen: 42,
    bgYellow: 43,
    bgBlue: 44,
    bgMagenta: 45,
    bgCyan: 46,
    bgWhite: 47,
    lightGray: 2,
    lightGrey: 2,
    lightRed: 91,
    lightGreen: 92,
    lightYellow: 93,
    lightBlue: 94,
    lightMagenta: 95,
    lightCyan: 96,
    bgLightRed: 101,
    bgLightGreen: 102,
    bgLightYellow: 103,
    bgLightBlue: 104,
    bgLightMagenta: 105,
    bgLightCyan: 106,
}

for (let key in colors) {
    String.prototype[key] = function () {
        return "\x1b[" + colors[key] + "m" + this + "\x1b[0m"
    }
}

class Utils {
    constructor(date) {
        this.date = date || false
    }
    log(...args) {
        console.log("[i]".lightBlue() + (this.date ? (" [" + new Date().toLocaleTimeString() + "] :").lightGray() : ""), ...args)
    }
    error(...args) {
        console.log("[-]".lightRed() + (this.date ? (" [" + new Date().toLocaleTimeString() + "] :").lightGray() : ""), ...args)
    }
    alert(...args) {
        console.log("/!\\".lightYellow() + (this.date ? (" [" + new Date().toLocaleTimeString() + "] :").lightGray() : ""), ...args)
    }
    success(...args) {
        console.log("[+]".lightGreen() + (this.date ? (" [" + new Date().toLocaleTimeString() + "] :").lightGray() : ""), ...args)
    }

}

module.exports = new Utils(false)