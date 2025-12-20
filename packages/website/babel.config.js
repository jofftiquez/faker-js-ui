/* eslint-disable */

module.exports = api => {
  return {
    presets: [
      [
        api.caller(caller => caller && caller.target === 'node')
          ? { targets: { node: 'current' } }
          : {}
      ]
    ]
  }
}
