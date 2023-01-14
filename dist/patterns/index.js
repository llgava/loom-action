"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mojang = exports.custom = void 0;
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var mojang = _path["default"].join(__dirname, 'mojang.yml');
exports.mojang = mojang;
var custom = _path["default"].join(__dirname, '..', 'pattern.yml');
exports.custom = custom;