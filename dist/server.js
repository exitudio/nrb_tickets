'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressHistoryApiFallback = require('express-history-api-fallback');

var _expressHistoryApiFallback2 = _interopRequireDefault(_expressHistoryApiFallback);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _services = require('./services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverRoot = _path2.default.resolve(process.cwd(), "src");
//import mongooseInit from './libs/mongoose-init'

console.log("server root path is : " + serverRoot);
console.log('server is starting...');
var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ // to support URL-encoded bodies
  extended: false
}));

var port = process.env.PORT || 3000;
function listening() {
  console.log('listening in port ' + port);
}
app.listen(port, listening);
(0, _services.initServices)(app);

//set fallback url to public/index.html
var dirname = _path2.default.resolve(); // for fixing empty path problem when using gulp


console.log('process.env.NODE_ENV:', app.get('env'));
if (app.get('env') === 'development') {
  app.use(_express2.default.static(_path2.default.join(__dirname, '../public')));
} else {
  app.use(_express2.default.static(_path2.default.join(__dirname, '../build')));
}
app.use((0, _expressHistoryApiFallback2.default)('/public/index.html', { root: dirname }));

// app.use(express.static(path.join(__dirname, 'public')))

exports.default = app;