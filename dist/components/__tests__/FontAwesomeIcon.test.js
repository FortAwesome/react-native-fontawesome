"use strict";

var fontawesome = _interopRequireWildcard(require("@fortawesome/fontawesome-svg-core"));

var _FontAwesomeIcon = _interopRequireDefault(require("../FontAwesomeIcon"));

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var faCoffee = {
  prefix: 'fas',
  iconName: 'coffee',
  icon: [640, 512, [], 'f0f4', 'M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z']
};
var faCircle = {
  prefix: 'fas',
  iconName: 'circle',
  icon: [640, 512, [], 'f0f4', 'M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z']
};
fontawesome.library.add(faCoffee, faCircle);
test('renders correctly', function () {
  var tree = _reactTestRenderer.default.create(_react.default.createElement(_FontAwesomeIcon.default, {
    height: 10,
    width: 10,
    icon: ['fas', 'coffee']
  })).toJSON();

  expect(tree).toMatchSnapshot();
});