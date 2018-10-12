"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _humps = _interopRequireDefault(require("humps"));

var _reactNativeSvg = require("react-native-svg");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var svgObjectMap = {
  "svg": _reactNativeSvg.Svg,
  "path": _reactNativeSvg.Path,
  "rect": _reactNativeSvg.Rect,
  "defs": _reactNativeSvg.Defs,
  "mask": _reactNativeSvg.Mask,
  "g": _reactNativeSvg.G,
  "clipPath": _reactNativeSvg.ClipPath
};

function convert(createElement, element) {
  var extraProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (typeof element === 'string') {
    return element;
  }

  var style = // get rid of this key
  // store the result here
  extraProps.style,
      modifiedExtraProps = _objectWithoutProperties(extraProps, ["style"]); // If a color was passed in as a style sheet on the style prop, set the fill attribute to its value.


  if (extraProps.style && extraProps.style.color) {
    modifiedExtraProps['color'] = extraProps.style.color;
  } else {
    // Default to black
    modifiedExtraProps['color'] = 'black';
  } // We don't want to pass down height/width props to children: they're only intended for the
  // top-level element.
  // const {
  //   height,
  //   width,
  //   ...extraPropsForChildren
  // } = modifiedExtraProps


  var children = (element.children || []).map(function (child) {
    return convert(createElement, child, {});
  });
  var mixins = Object.keys(element.attributes || {}).reduce(function (acc, key) {
    var val = element.attributes[key];

    switch (key) {
      case 'class':
      case 'role':
      case 'style':
      case 'xmlns':
        delete element.attributes[key];
        break;

      default:
        if (key.indexOf('aria-') === 0 || key.indexOf('data-') === 0) {
          delete element.attributes[key];
        } else {
          acc.attrs[_humps.default.camelize(key)] = val;
        }

    }

    return acc;
  }, {
    attrs: {}
  });
  return createElement.apply(void 0, [svgObjectMap[element.tag], _objectSpread({}, mixins.attrs, modifiedExtraProps)].concat(_toConsumableArray(children)));
}

var _default = convert;
exports.default = _default;