let PRODUCTION = false

export default function(...args) {
  if (!PRODUCTION && console && typeof console.error === 'function') {
    console.error(...args)
  }
}
