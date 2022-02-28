/**
 * @description a util func to convert RGB color to HEX <e.g (255, 255, 255) => #FFFFFF>
 * @param {number} r - red value
 * @param {number} g - green value
 * @param {number} b - blue value
 * @param {number} a - alpha
 * @returns {string} - hex color (e.g #FFFFFF)
 */
export const rgb2hex = (r, g, b, a = 1) => {

  let hexR = ("00" + r.toString(16)).slice(-2).toUpperCase();
  let hexG = ("00" + g.toString(16)).slice(-2).toUpperCase();
  let hexB = ("00" + b.toString(16)).slice(-2).toUpperCase();
  let alpha = Math.round(a * 255).toString(16);
  if (alpha.length === 1)
    alpha = "0" + alpha;
  return `#${hexR}${hexG}${hexB}${alpha}`
}

/**
 * @description a util func to convert HEX color to RGB <e.g #FFFFFF => (255, 255, 255)>
 * @param {string} hex - hex color value
 * @param {boolean} hasAlpha id color has alpha value
 * @returns {{r: number, g: number, b: number, a: number, color: string}} object
 */
export const hex2rgb = (hex, hasAlpha = false) => {
  if (hex[0] === "#") { // removes the '#' in a hex if start with it
    hex = hex.slice(1)
  }
  let hexLen = hex.length;
  if (hexLen !== 6 && hexLen !== 3 && (hasAlpha && hexLen !== 8)) {
    throw new Error(`Expected a hex of length 3 / 6 (or 8 with alpha) excluding '#', but got (${hexLen})`)
  }
  if (hexLen === 3) { // converts a 3 length hex to 6 (e.g FFF => FFFFFF)
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  let a = 1,
    r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16)

  if (hasAlpha) {
    a = +(`0x${hex.slice(6)}` / 255).toFixed(2)
  }

  return {r, g, b, a, color: `rgba(${r}, ${g}, ${b}, ${a})`}
}

/**
 * @description a util func to convert HSL color to RGB <e.g hsl(0, 0%, 100%) => (255, 255, 255)>
 * @param {string} hsl - hsl color value (can be 'hsl(0, 0%, 100%)' or '0, 0%, 100%)
 * @param {boolean} hasAlpha - if the hsl color has alpha value
 * @returns {{r: number, g: number, b: number, a: number, color: string}} object
 */
export const hsl2rgb = (hsl, hasAlpha = false) => {
  let reg = /0?\.?\d+/g
  let [h, s, l, ...rest] = hsl.match(reg)
  h = parseInt(h)
  s = parseInt(s) / 100
  l = parseInt(l) / 100

  let c = (1 - Math.abs(2 * l - 1)) * s
  let x = c * (1 - Math.abs((h / 60) % 2 - 1))
  let m = l - c / 2
  let r = 0, g = 0, b = 0
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  if (hasAlpha) {
    let a = parseFloat(rest[0])
    if (a > 9) {
      a /= 100
    }
    return {r, g, b, a, color: `rgba(${r}, ${g}, ${b}, ${a})`}
  }

  return {r, g, b, a: 1, color: `rgb(${r}, ${g}, ${b})`}
}

/**
 * @description a util func to convert HSL color to HEX <e.g hsl(0, 0%, 100%) => (255, 255, 255)>
 * @param {string} hsl - hsl color value (can be 'hsl(0, 0%, 100%)' or '0, 0%, 100%)
 * @param {boolean} hasAlpha - if the hsl color has alpha value
 * @returns {string} - hex color (e.g #FFFFFF)
 */
export const hsl2hex = (hsl, hasAlpha = false) => {
  if (hasAlpha) {
    const {r, g, b, a} = hsl2rgb(hsl, true)
    return rgb2hex(r, g, b, a)
  } else {
    const {r, g, b} = hsl2rgb(hsl, false)
    return rgb2hex(r, g, b)
  }
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
 * @description a util func that calc a suitable b/w contrast for a given hex color (e.g #FFFFFF => #000000)
 * @returns {{contrast: number, color: string}} object
 * @param {string} color - hex(e.g #000000) or hsl(e.g '0, 0%, 100%') color value
 * @param {boolean} isHSL - if the color provided is HSL (can be 'hsl(0, 0%, 100%)' or '0, 0%, 100%')
 * @param {boolean} hasAlpha - color has alpha value
 */
export const contrastColor = (color, isHSL = false, hasAlpha = false) => {
  if (!color) {
    throw new Error(`Expected a hex or hls color, but got neither`)
  }
  let r, g, b, a;
  if (!isHSL) {
    ({r, g, b, a} = hex2rgb(color)) // hex
  } else {
    ({r, g, b, a} = hsl2rgb(color, hasAlpha)) //hsl
  }
  let contrast = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return {
    contrast: contrast,
    color: contrast <= 128 ? a < .5 ? 'black' : "#ddd" : "#101010"
  }
}