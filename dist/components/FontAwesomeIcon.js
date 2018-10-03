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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _Dimensions$get = _reactNative.Dimensions.get('window'),
    windowWidth = _Dimensions$get.width,
    windowHeight = _Dimensions$get.height;

function objectWithKey(key, value) {
  return Array.isArray(value) && value.length > 0 || !Array.isArray(value) && value ? _defineProperty({}, key, value) : {};
}

function classList(props) {
  var _classes;

  var classes = (_classes = {
    'fa-spin': props.spin,
    'fa-pulse': props.pulse,
    'fa-fw': props.fixedWidth,
    'fa-inverse': props.inverse,
    'fa-border': props.border,
    'fa-li': props.listItem,
    'fa-flip-horizontal': props.flip === 'horizontal' || props.flip === 'both',
    'fa-flip-vertical': props.flip === 'vertical' || props.flip === 'both'
  }, _defineProperty(_classes, "fa-".concat(props.size), props.size !== null), _defineProperty(_classes, "fa-rotate-".concat(props.rotation), props.rotation !== null), _defineProperty(_classes, "fa-pull-".concat(props.pull), props.pull !== null), _classes);
  return Object.keys(classes).map(function (key) {
    return classes[key] ? key : null;
  }).filter(function (key) {
    return key;
  });
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
      _props$height = props.height,
      height = _props$height === void 0 ? windowHeight * 0.1 : _props$height,
      _props$width = props.width,
      width = _props$width === void 0 ? windowWidth * 0.1 : _props$width;
  var iconLookup = normalizeIconArgs(iconArgs);
  var renderedIcon = (0, _fontawesomeSvgCore.icon)(iconLookup, {});

  if (!renderedIcon) {
    console.log("DEBUG: could not find icon");
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
  border: _propTypes.default.bool,
  className: _propTypes.default.string,
  mask: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array, _propTypes.default.string]),
  fixedWidth: _propTypes.default.bool,
  inverse: _propTypes.default.bool,
  flip: _propTypes.default.oneOf(['horizontal', 'vertical', 'both']),
  icon: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array, _propTypes.default.string]),
  listItem: _propTypes.default.bool,
  pull: _propTypes.default.oneOf(['right', 'left']),
  pulse: _propTypes.default.bool,
  rotation: _propTypes.default.oneOf([90, 180, 270]),
  size: _propTypes.default.oneOf(['lg', 'xs', 'sm', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x']),
  spin: _propTypes.default.bool,
  symbol: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string]),
  title: _propTypes.default.string,
  transform: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object])
};
FontAwesomeIcon.defaultProps = {
  border: false,
  className: '',
  mask: null,
  fixedWidth: false,
  inverse: false,
  flip: null,
  icon: null,
  listItem: false,
  pull: null,
  pulse: false,
  rotation: null,
  size: null,
  spin: false,
  symbol: false,
  title: '',
  transform: null
};

var convertCurry = _converter.default.bind(null, _react.default.createElement);