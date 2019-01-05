"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FontAwesomeIcon;

var _react = _interopRequireDefault(require("react"));

var _converter = _interopRequireDefault(require("../converter"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactNative = require("react-native");

var _fontawesomeSvgCore = require("@fortawesome/fontawesome-svg-core");

var _logger = _interopRequireDefault(require("../logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _Dimensions$get = _reactNative.Dimensions.get('window'),
    windowWidth = _Dimensions$get.width,
    windowHeight = _Dimensions$get.height;

var DEFAULT_SIZE = 16; // Deprecated height and width defaults

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
      style = props.style,
      size = props.size;
  var iconLookup = normalizeIconArgs(iconArgs);
  var transform = objectWithKey('transform', typeof props.transform === 'string' ? _fontawesomeSvgCore.parse.transform(props.transform) : props.transform);
  var mask = objectWithKey('mask', normalizeIconArgs(maskArgs));
  var renderedIcon = (0, _fontawesomeSvgCore.icon)(iconLookup, _objectSpread({}, transform, mask));

  if (!renderedIcon) {
    (0, _logger.default)("ERROR: icon not found for icon = ", iconArgs);
    return null;
  }

  var abstract = renderedIcon.abstract; // This is the color that will be passed to the "fill" prop of the Svg element

  var color = props.color || style.color || undefined; // To avoid confusion down the line, we'll remove any color property that might have been in the stylesheet.
  // The only color attribute we want to affect the rendered result should be the one assigned to the fill prop
  // on the top-level SVG element.

  delete style['color'];
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
    style: style
    /*
    Object.keys(props).forEach(key => {
      if (!FontAwesomeIcon.defaultProps.hasOwnProperty(key)) {
        extraProps[key] = props[key]
      }
    })
    */

  };
  return convertCurry(abstract[0], extraProps);
}

FontAwesomeIcon.displayName = 'FontAwesomeIcon';
FontAwesomeIcon.propTypes = {
  height: _propTypes.default.number,
  width: _propTypes.default.number,
  size: _propTypes.default.number,
  color: _propTypes.default.string,
  style: _propTypes.default.shape(_objectSpread({}, _reactNative.ViewPropTypes.style)),
  icon: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array, _propTypes.default.string]),
  mask: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array, _propTypes.default.string]),
  transform: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object])
};
FontAwesomeIcon.defaultProps = {
  icon: null,
  mask: null,
  transform: null,
  style: {},
  color: null // Once the deprecation of height and width props is complete, let's put a default prop value for size here

};

var convertCurry = _converter.default.bind(null, _react.default.createElement);