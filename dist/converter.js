"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _humps = _interopRequireDefault(require("humps"));

var _reactNativeSvg = require("react-native-svg");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var svgObjectMap = {
  svg: _reactNativeSvg.Svg,
  path: _reactNativeSvg.Path,
  rect: _reactNativeSvg.Rect,
  defs: _reactNativeSvg.Defs,
  mask: _reactNativeSvg.Mask,
  g: _reactNativeSvg.G,
  clipPath: _reactNativeSvg.ClipPath
};

function convert(createElement, element) {
  if (typeof element === 'string') {
    return element;
  }

  var children = (element.children || []).map(function (child, childIndex) {
    return convert(createElement, child);
  });
  var mixins = Object.keys(element.attributes || {}).reduce(function (acc, key) {
    var val = element.attributes[key];

    switch (key) {
      case 'class':
      case 'role':
      case 'xmlns':
        delete element.attributes[key];
        break;

      case 'focusable':
        acc.attrs[key] = val === 'true';
        break;

      default:
        if (key.indexOf('aria-') === 0 || key.indexOf('data-') === 0 || key === 'fill' && val === 'currentColor') {
          delete element.attributes[key];
        } else {
          acc.attrs[_humps["default"].camelize(key)] = val;
        }

    }

    return acc;
  }, {
    attrs: {}
  });
  return createElement.apply(void 0, [svgObjectMap[element.tag], _objectSpread({}, mixins.attrs)].concat(_toConsumableArray(children)));
}

var _default = convert;
exports["default"] = _default;