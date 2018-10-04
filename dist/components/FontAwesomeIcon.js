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
      _props$height = props.height,
      height = _props$height === void 0 ? windowHeight * 0.1 : _props$height,
      _props$width = props.width,
      width = _props$width === void 0 ? windowWidth * 0.1 : _props$width;
  var iconLookup = normalizeIconArgs(iconArgs);
  var transform = objectWithKey('transform', typeof props.transform === 'string' ? _fontawesomeSvgCore.parse.transform(props.transform) : props.transform);
  var mask = objectWithKey('mask', normalizeIconArgs(maskArgs));
  var renderedIcon = (0, _fontawesomeSvgCore.icon)(iconLookup, _objectSpread({}, transform, mask));

  if (!renderedIcon) {
    (0, _logger.default)("ERROR: icon not found for icon = ", iconArgs);
    return null;
  }

  var abstract = renderedIcon.abstract;
  var extraProps = {
    height: height,
    width: width
  };
  Object.keys(props).forEach(function (key) {
    if (!FontAwesomeIcon.defaultProps.hasOwnProperty(key)) {
      extraProps[key] = props[key];
    }
  });
  return convertCurry(abstract[0], extraProps);
}

FontAwesomeIcon.displayName = 'FontAwesomeIcon';
FontAwesomeIcon.propTypes = {
  mask: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array, _propTypes.default.string]),
  icon: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array, _propTypes.default.string]),
  listItem: _propTypes.default.bool,
  pull: _propTypes.default.oneOf(['right', 'left']),
  pulse: _propTypes.default.bool,
  rotation: _propTypes.default.oneOf([90, 180, 270]),
  spin: _propTypes.default.bool,
  transform: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object])
};
FontAwesomeIcon.defaultProps = {
  mask: null,
  inverse: false,
  icon: null,
  listItem: false,
  pull: null,
  pulse: false,
  rotation: null,
  spin: false,
  transform: null
};

var convertCurry = _converter.default.bind(null, _react.default.createElement);