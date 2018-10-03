(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('react-native'), require('@fortawesome/fontawesome-svg-core')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'react-native', '@fortawesome/fontawesome-svg-core'], factory) :
	(factory((global['react-native-fontawesome'] = {}),global.React,global.PropTypes,global.Text,global.FontAwesome));
}(this, (function (exports,React,PropTypes,reactNative,fontawesomeSvgCore) { 'use strict';

	React = React && React.hasOwnProperty('default') ? React['default'] : React;
	PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var humps = createCommonjsModule(function (module) {
	(function(global) {

	  var _processKeys = function(convert, obj, options) {
	    if(!_isObject(obj) || _isDate(obj) || _isRegExp(obj) || _isBoolean(obj) || _isFunction(obj)) {
	      return obj;
	    }

	    var output,
	        i = 0,
	        l = 0;

	    if(_isArray(obj)) {
	      output = [];
	      for(l=obj.length; i<l; i++) {
	        output.push(_processKeys(convert, obj[i], options));
	      }
	    }
	    else {
	      output = {};
	      for(var key in obj) {
	        if(Object.prototype.hasOwnProperty.call(obj, key)) {
	          output[convert(key, options)] = _processKeys(convert, obj[key], options);
	        }
	      }
	    }
	    return output;
	  };

	  // String conversion methods

	  var separateWords = function(string, options) {
	    options = options || {};
	    var separator = options.separator || '_';
	    var split = options.split || /(?=[A-Z])/;

	    return string.split(split).join(separator);
	  };

	  var camelize = function(string) {
	    if (_isNumerical(string)) {
	      return string;
	    }
	    string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
	      return chr ? chr.toUpperCase() : '';
	    });
	    // Ensure 1st char is always lowercase
	    return string.substr(0, 1).toLowerCase() + string.substr(1);
	  };

	  var pascalize = function(string) {
	    var camelized = camelize(string);
	    // Ensure 1st char is always uppercase
	    return camelized.substr(0, 1).toUpperCase() + camelized.substr(1);
	  };

	  var decamelize = function(string, options) {
	    return separateWords(string, options).toLowerCase();
	  };

	  // Utilities
	  // Taken from Underscore.js

	  var toString = Object.prototype.toString;

	  var _isFunction = function(obj) {
	    return typeof(obj) === 'function';
	  };
	  var _isObject = function(obj) {
	    return obj === Object(obj);
	  };
	  var _isArray = function(obj) {
	    return toString.call(obj) == '[object Array]';
	  };
	  var _isDate = function(obj) {
	    return toString.call(obj) == '[object Date]';
	  };
	  var _isRegExp = function(obj) {
	    return toString.call(obj) == '[object RegExp]';
	  };
	  var _isBoolean = function(obj) {
	    return toString.call(obj) == '[object Boolean]';
	  };

	  // Performant way to determine if obj coerces to a number
	  var _isNumerical = function(obj) {
	    obj = obj - 0;
	    return obj === obj;
	  };

	  // Sets up function which handles processing keys
	  // allowing the convert function to be modified by a callback
	  var _processor = function(convert, options) {
	    var callback = options && 'process' in options ? options.process : options;

	    if(typeof(callback) !== 'function') {
	      return convert;
	    }

	    return function(string, options) {
	      return callback(string, convert, options);
	    }
	  };

	  var humps = {
	    camelize: camelize,
	    decamelize: decamelize,
	    pascalize: pascalize,
	    depascalize: decamelize,
	    camelizeKeys: function(object, options) {
	      return _processKeys(_processor(camelize, options), object);
	    },
	    decamelizeKeys: function(object, options) {
	      return _processKeys(_processor(decamelize, options), object, options);
	    },
	    pascalizeKeys: function(object, options) {
	      return _processKeys(_processor(pascalize, options), object);
	    },
	    depascalizeKeys: function () {
	      return this.decamelizeKeys.apply(this, arguments);
	    }
	  };

	  if (module.exports) {
	    module.exports = humps;
	  } else {
	    global.humps = humps;
	  }

	})(commonjsGlobal);
	});

	function convert(createElement, element, extraProps = {}) {
	  if (typeof element === 'string') {
	    return element
	  }
	  const children = (element.children || []).map(
	    convert.bind(null, createElement)
	  );

	  const mixins = Object.keys(element.attributes || {}).reduce(
	    (acc, key) => {
	      const val = element.attributes[key];
	      switch(key){
	        case 'style':
	        case 'class':
	        case 'role':
	        case 'xmlns':
	          delete element.attributes[key];
	          break
	        default:
	          if (key.indexOf('aria-') === 0 || key.indexOf('data-') === 0) {
	            delete element.attributes[key];
	          } else {
	            acc.attrs[humps.camelize(key)] = val;
	          }
	      }
	      return acc
	    },
	    { attrs: {} }
	  );

	  return createElement(
	    humps.pascalize(element.tag),
	    { ...mixins.attrs, ...extraProps },
	    ...children
	  )
	}

	const { windowWidth, windowHeight } = reactNative.Dimensions.get('window');

	function normalizeIconArgs(icon) {
	  if (icon === null) {
	    return null
	  }

	  if (typeof icon === 'object' && icon.prefix && icon.iconName) {
	    return icon
	  }

	  if (Array.isArray(icon) && icon.length === 2) {
	    return { prefix: icon[0], iconName: icon[1] }
	  }

	  if (typeof icon === 'string') {
	    return { prefix: 'fas', iconName: icon }
	  }
	}

	function FontAwesomeIcon(props) {
	  const { icon: iconArgs, height = windowHeight * 0.1, width  = windowWidth * 0.1 } = props;

	  const iconLookup = normalizeIconArgs(iconArgs);

	  const renderedIcon = fontawesomeSvgCore.icon(iconLookup, {});

	  if (!renderedIcon) {
	    console.log("DEBUG: could not find icon");
	    return null
	  }

	  const { abstract } = renderedIcon;
	  const extraProps = { height, width };

	  Object.keys(props).forEach(key => {
	    if (!FontAwesomeIcon.defaultProps.hasOwnProperty(key)) {
	      extraProps[key] = props[key];
	    }
	  });

	  return convertCurry(abstract[0], extraProps)
	}

	FontAwesomeIcon.displayName = 'FontAwesomeIcon';

	FontAwesomeIcon.propTypes = {
	  border: PropTypes.bool,

	  className: PropTypes.string,

	  mask: PropTypes.oneOfType([
	    PropTypes.object,
	    PropTypes.array,
	    PropTypes.string
	  ]),

	  fixedWidth: PropTypes.bool,

	  inverse: PropTypes.bool,

	  flip: PropTypes.oneOf(['horizontal', 'vertical', 'both']),

	  icon: PropTypes.oneOfType([
	    PropTypes.object,
	    PropTypes.array,
	    PropTypes.string
	  ]),

	  listItem: PropTypes.bool,

	  pull: PropTypes.oneOf(['right', 'left']),

	  pulse: PropTypes.bool,

	  rotation: PropTypes.oneOf([90, 180, 270]),

	  size: PropTypes.oneOf([
	    'lg',
	    'xs',
	    'sm',
	    '1x',
	    '2x',
	    '3x',
	    '4x',
	    '5x',
	    '6x',
	    '7x',
	    '8x',
	    '9x',
	    '10x'
	  ]),

	  spin: PropTypes.bool,

	  symbol: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

	  title: PropTypes.string,

	  transform: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
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

	const convertCurry = convert.bind(null, React.createElement);

	exports.FontAwesomeIcon = FontAwesomeIcon;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
