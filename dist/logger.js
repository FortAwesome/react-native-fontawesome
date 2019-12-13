"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var PRODUCTION = false;

function _default() {
  if (!PRODUCTION && console && typeof console.error === 'function') {
    var _console;

    (_console = console).error.apply(_console, arguments);
  }
}