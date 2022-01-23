/**
 * @description a util func to convert RGB color to HEX <e.g (255, 255, 255) => #FFFFFF>
 * @param {number} r - red value
 * @param {number} g - green value
 * @param {number} b - blue value
 * @returns {string} - hex color (e.g #FFFFFF)
 */
export const rgb2hex = (r, g, b) => {

    let hexR = ("00" + r.toString(16)).slice(-2).toUpperCase();
    let hexG = ("00" + g.toString(16)).slice(-2).toUpperCase();
    let hexB = ("00" + b.toString(16)).slice(-2).toUpperCase();
    return `#${hexR}${hexG}${hexB}`
}

/**
 * @description a util func to convert HEX color to RGB <e.g #FFFFFF => (255, 255, 255)>
 * @param {string} hex - hex color value
 * @returns {{r: number, g: number, b: number, color: string}} object
 */
export const hex2rgb = (hex) => {
    if (hex[0] === "#") { // removes the '#' in a hex if start with it
        hex = hex.slice(1)
    }
    let hexLen = hex.length;
    if (hexLen !== 6 && hexLen !== 3) {
        throw new Error(`Expected a hex color of length 3 or 6 excluding '#', but got length of (${hexLen})`)
    }
    if (hexLen === 3) { // converts a 3 length hex to 6 (FFF => FFFFFF)
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    let r = parseInt(hex.slice(0, 2), 16)
    let g = parseInt(hex.slice(0, 2), 16)
    let b = parseInt(hex.slice(0, 2), 16)

    return { r, g, b, color: `rgb(${r}, ${g}, ${b})` }
}


/**
 * @description a small util func that converts(hash) a given string into a RGB & HEX color
 * @param {string} value - a string to hash
 * @returns {{r: number, g: number, b: number, rgb: string, hex: string}} object
 */
export const stringToColor = (value) => {
    let sum = 0;

    for (let i in value) {
        sum += value.charCodeAt(i)
    }

    //rgb
    let r = ~~(('0.' + Math.sin(sum + 1).toString().slice(6)) * 256);
    let g = ~~(('0.' + Math.sin(sum + 2).toString().slice(6)) * 256);
    let b = ~~(('0.' + Math.sin(sum + 3).toString().slice(6)) * 256);
    return {
        r: r,
        g: g,
        b: b,
        rgb: `rgb(${r}, ${g}, ${b})`,
        hex: rgb2hex(r, g, b)
    };
}

/**
 * @description a util func that calc a suitable b/w constrast for a given hex color (e.g #FFFFFF => #000000)
 * @param {string} hex - hex color (e.g #00FF00)
 * @returns {{constrast: number, color: string}} object
 */
export const constrastColor = (hex) => {
    let { r, g, b } = hex2rgb(hex)
    let constrast = (r * 0.299) + (g * 0.587) + (b * 0.114)
    return {
        constrast,
        color: constrast > 150 ? "#000000" : "#FFFFFF"
    }
}