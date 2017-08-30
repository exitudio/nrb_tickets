'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initServices = initServices;

var _getData = require('./getData');

var _getData2 = _interopRequireDefault(_getData);

var _setCronjob = require('./setCronjob');

var _setCronjob2 = _interopRequireDefault(_setCronjob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initServices(app) {
  app.use('/services', _getData2.default);
  app.use('/services', _setCronjob2.default);
}