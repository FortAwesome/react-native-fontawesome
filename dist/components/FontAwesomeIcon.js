"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_SIZE = exports.DEFAULT_SECONDARY_OPACITY = exports.DEFAULT_COLOR = void 0;
exports["default"] = FontAwesomeIcon;

var _react = _interopRequireDefault(require("react"));

var _converter = _interopRequireDefault(require("../converter"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactNative = require("react-native");

var _fontawesomeSvgCore = require("@fortawesome/fontawesome-svg-core");

var _logger = _interopRequireDefault(require("../logger"));

var _excluded = ["color"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_SIZE = 16;
exports.DEFAULT_SIZE = DEFAULT_SIZE;
var DEFAULT_COLOR = '#000';
exports.DEFAULT_COLOR = DEFAULT_COLOR;
var DEFAULT_SECONDARY_OPACITY = 0.4;
exports.DEFAULT_SECONDARY_OPACITY = DEFAULT_SECONDARY_OPACITY;

function objectWithKey(key, value) {
  return Array.isArray(value) && value.length > 0 || !Array.isArray(value) && value ? _defineProperty({}, key, value) : {};
}

function normalizeIconArgs(icon) {
  if (icon && _typeof(icon) === 'object' && icon.prefix && icon.iconName && icon.icon) {
    return icon;
  }

  if (_fontawesomeSvgCore.parse.icon) {
    return _fontawesomeSvgCore.parse.icon(icon);
  }

  if (icon === null) {
    return null;
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
  var _props = _objectSpread({
    icon: null,
    mask: null,
    maskId: null,
    transform: null,
    style: {},
    color: null,
    secondaryColor: null,
    secondaryOpacity: null,
    size: DEFAULT_SIZE
  }, props);

  var iconArgs = _props.icon,
      maskArgs = _props.mask,
      maskId = _props.maskId,
      height = _props.height,
      width = _props.width,
      size = _props.size;

  var style = _reactNative.StyleSheet.flatten(_props.style);

  var iconLookup = normalizeIconArgs(iconArgs);
  var transform = objectWithKey('transform', typeof _props.transform === 'string' ? _fontawesomeSvgCore.parse.transform(_props.transform) : _props.transform);
  var mask = objectWithKey('mask', normalizeIconArgs(maskArgs));
  var renderedIcon = (0, _fontawesomeSvgCore.icon)(iconLookup, _objectSpread(_objectSpread(_objectSpread({}, transform), mask), {}, {
    maskId: maskId
  }));

  if (!renderedIcon) {
    (0, _logger["default"])('ERROR: icon not found for icon = ', iconArgs);
    return null;
  }

  var _abstract = renderedIcon["abstract"]; // This is the color that will be passed to the "fill" prop of the Svg element

  var color = _props.color || (style || {}).color || DEFAULT_COLOR; // This is the color that will be passed to the "fill" prop of the secondary Path element child (in Duotone Icons)
  // `null` value will result in using the primary color, at 40% opacity

  var secondaryColor = _props.secondaryColor || color; // Secondary layer opacity should default to 0.4, unless a specific opacity value or a specific secondary color was given

  var secondaryOpacity = _props.secondaryOpacity || DEFAULT_SECONDARY_OPACITY; // To avoid confusion down the line, we'll remove properties from the StyleSheet, like color, that are being overridden
  // or resolved in other ways, to avoid ambiguity as to which inputs cause which outputs in the underlying rendering process.
  // In other words, we don't want color (for example) to be specified via two different inputs.

  var _ref2 = style || {},
      styleColor = _ref2.color,
      modifiedStyle = _objectWithoutProperties(_ref2, _excluded);

  var resolvedHeight, resolvedWidth;

  if (height || width) {
    throw new Error("Prop height and width for component ".concat(FontAwesomeIcon.displayName, " have been deprecated. ") + "Use the size prop instead like <".concat(FontAwesomeIcon.displayName, " size={").concat(width, "} />."));
  } else {
    resolvedHeight = resolvedWidth = size || DEFAULT_SIZE;
  }

  var rootAttributes = _abstract[0].attributes;
  rootAttributes.height = resolvedHeight;
  rootAttributes.width = resolvedWidth;
  rootAttributes.style = modifiedStyle;
  replaceCurrentColor(_abstract[0], color, secondaryColor, secondaryOpacity);
  return convertCurry(_abstract[0]);
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
  maskId: _propTypes["default"].string,
  transform: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object])
};

var convertCurry = _converter["default"].bind(null, _react["default"].createElement);

function replaceCurrentColor(obj, primaryColor, secondaryColor, secondaryOpacity) {
  obj.children.forEach(function (child, childIndex) {
    replaceFill(child, primaryColor, secondaryColor, secondaryOpacity);

    if (Object.prototype.hasOwnProperty.call(child, 'attributes')) {
      replaceFill(child.attributes, primaryColor, secondaryColor, secondaryOpacity);
    }

    if (Array.isArray(child.children) && child.children.length > 0) {
      replaceCurrentColor(child, primaryColor, secondaryColor, secondaryOpacity);
    }
  });
}

function replaceFill(obj, primaryColor, secondaryColor, secondaryOpacity) {
  if (hasPropertySetToValue(obj, 'fill', 'currentColor')) {
    if (hasPropertySetToValue(obj, 'class', 'fa-primary')) {
      obj.fill = primaryColor;
    } else if (hasPropertySetToValue(obj, 'class', 'fa-secondary')) {
      obj.fill = secondaryColor;
      obj.fillOpacity = secondaryOpacity;
    } else {
      obj.fill = primaryColor;
    }
  }
}

function hasPropertySetToValue(obj, property, value) {
  return Object.prototype.hasOwnProperty.call(obj, property) && obj[property] === value;
}