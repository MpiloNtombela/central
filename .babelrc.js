const presets = [
  [
    "@babel/preset-env",
    {
      "targets": {
        "node": "14"
      }
    }
  ], "@babel/preset-react"
]

const plugins = [
  "@emotion"
]

module.exports = {presets, plugins};