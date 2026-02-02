const PRODUCTION = false;

export default function log(...args: unknown[]): void {
  if (!PRODUCTION && console && typeof console.error === 'function') {
    console.error(...args);
  }
}
