"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FontAwesomeIcon;
exports.DEFAULT_SECONDARY_OPACITY = exports.DEFAULT_COLOR = exports.DEFAULT_SIZE = void 0;

var _react = _interopRequireDefault(require("react"));

var _converter = _interopRequireDefault(require("../converter"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactNative = require("react-native");

var _fontawesomeSvgCore = require("@fortawesome/fontawesome-svg-core");

var _logger = _interopRequireDefault(require("../logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _Dimensions$get = _reactNative.Dimensions.get('window'),
    windowWidth = _Dimensions$get.width,
    windowHeight = _Dimensions$get.height;

var DEFAULT_SIZE = 16;
exports.DEFAULT_SIZE = DEFAULT_SIZE;
var DEFAULT_COLOR = '#000';
exports.DEFAULT_COLOR = DEFAULT_COLOR;
var DEFAULT_SECONDARY_OPACITY = 0.4; // Deprecated height and width defaults

exports.DEFAULT_SECONDARY_OPACITY = DEFAULT_SECONDARY_OPACITY;
var DEFAULT_HEIGHT = windowHeight * 0.1;
var DEFAULT_WIDTH = windowWidth * 0.1;

function objectWithKey(key, value) {
  return Array.isArray(value) && value.length > 0 || !Array.isArray(value) && value ? _defineProperty({}, key, value) : {};
}

function normalizeIconArgs(icon) {
  if (icon === null) {
    return null;
  }

  if (_typeof(icon) === 'object' && icon.prefix && icon.iconName) {
    return icon;
  }

  if (Array.isArray(icon) && icon.length === 2) {
    return {
      prefix: icon[0],
      iconName: icon[1]
    };
  }

  if (typeof icon === 'string') {
    return {
      prefix: 'fas',
      iconName: icon
    };
  }
}

function FontAwesomeIcon(props) {
  var iconArgs = props.icon,
      maskArgs = props.mask,
      height = props.height,
      width = props.width,
      size = props.size;

  var style = _reactNative.StyleSheet.flatten(props.style);

  var iconLookup = normalizeIconArgs(iconArgs);
  var transform = objectWithKey('transform', typeof props.transform === 'string' ? _fontawesomeSvgCore.parse.transform(props.transform) : props.transform);
  var mask = objectWithKey('mask', normalizeIconArgs(maskArgs));
  var renderedIcon = (0, _fontawesomeSvgCore.icon)(iconLookup, _objectSpread(_objectSpread({}, transform), mask));

  if (!renderedIcon) {
    (0, _logger["default"])("ERROR: icon not found for icon = ", iconArgs);
    return null;
  }

  var _abstract = renderedIcon["abstract"]; // This is the color that will be passed to the "fill" prop of the Svg element

  var color = props.color || style.color || DEFAULT_COLOR; // This is the color that will be passed to the "fill" prop of the secondary Path element child (in Duotone Icons)
  // `null` value will result in using the primary color, at 40% opacity

  var secondaryColor = props.secondaryColor || null; // Secondary layer opacity should default to 0.4, unless a specific opacity value or a specific secondary color was given

  var secondaryOpacity = props.secondaryOpacity || (secondaryColor ? 1 : DEFAULT_SECONDARY_OPACITY); // To avoid confusion down the line, we'll remove properties from the StyleSheet, like color, that are being overridden
  // or resolved in other ways, to avoid ambiguity as to which inputs cause which outputs in the underlying rendering process.
  // In other words, we don't want color (for example) to be specified via two different inputs.

  var styleColor = style.color,
      modifiedStyle = _objectWithoutProperties(style, ["color"]);

  var resolvedHeight, resolvedWidth;

  if (height || width) {
    if (size) {
      console.warn("DEPRECATION: height and width props on ".concat(FontAwesomeIcon.displayName, " have been deprecated.  ") + "Since you've also provided a size prop, we'll use it to override the height and width props given.  " + "You should probably go ahead and remove the height and width props to avoid confusion and resolve this warning.");
      resolvedHeight = resolvedWidth = size;
    } else {
      console.warn("DEPRECATION: height and width props on ".concat(FontAwesomeIcon.displayName, " have been deprecated.  ") + "Use the size prop instead.");
      resolvedHeight = height || DEFAULT_HEIGHT;
      resolvedWidth = width || DEFAULT_WIDTH;
    }
  } else {
    resolvedHeight = resolvedWidth = size || DEFAULT_SIZE;
  }

  var extraProps = {
    height: resolvedHeight,
    width: resolvedWidth,
    fill: color,
    secondaryFill: secondaryColor,
    secondaryOpacity: secondaryOpacity,
    style: modifiedStyle
  };
  Object.keys(props).forEach(function (key) {
    if (!FontAwesomeIcon.defaultProps.hasOwnProperty(key)) {
      extraProps[key] = props[key];
    }
  });
  return convertCurry(_abstract[0], extraProps);
}

FontAwesomeIcon.displayName = 'FontAwesomeIcon';
FontAwesomeIcon.propTypes = {
  height: _propTypes["default"].number,
  width: _propTypes["default"].number,
  size: _propTypes["default"].number,
  color: _propTypes["default"].string,
  secondaryColor: _propTypes["default"].string,
  secondaryOpacity: _propTypes["default"].number,
  style: _propTypes["default"].oneOfType([_propTypes["default"].shape({
    style: _propTypes["default"].any
  }), _propTypes["default"].array]),
  icon: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].array, _propTypes["default"].string]),
  mask: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].array, _propTypes["default"].string]),
  transform: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object])
};
FontAwesomeIcon.defaultProps = {
  icon: null,
  mask: null,
  transform: null,
  style: {},
  color: null,
  secondaryColor: null,
  secondaryOpacity: null,
  height: undefined,
  width: undefined // Once the deprecation of height and width props is complete, let's put the real default prop value for size here.
  // For now, adding it breaks the default/override logic for height/width/size.

};

var convertCurry = _converter["default"].bind(null, _react["default"].createElement);