"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatternReader = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _yaml = _interopRequireDefault(require("yaml"));
var _chalk = _interopRequireDefault(require("chalk"));
var core = _interopRequireWildcard(require("@actions/core"));
var patterns = _interopRequireWildcard(require("./patterns"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var PatternReader = function () {
  function PatternReader(pattern) {
    _classCallCheck(this, PatternReader);
    _defineProperty(this, "path", void 0);
    _defineProperty(this, "invalid", []);
    this.path = patterns[pattern];
  }
  _createClass(PatternReader, [{
    key: "testFileEndingFrom",
    value: function testFileEndingFrom(pack, groups) {
      var _this = this;
      groups.forEach(function (file) {
        core.info(_chalk["default"].green('Testing ' + file.name + ' from the group ' + file.group));
        var expected = _this.getFileEndingFrom(pack, file.group);
        if (!file.name.endsWith(expected)) {
          _this.invalid.push({
            pack: pack,
            expected: expected,
            file: file
          });
        }
      });
    }
  }, {
    key: "getFileEndingFrom",
    value: function getFileEndingFrom(pack, group) {
      var file = _fs["default"].readFileSync(this.path, 'utf-8');
      var parsedFile = _yaml["default"].parse(file);
      return parsedFile[pack][group];
    }
  }]);
  return PatternReader;
}();
exports.PatternReader = PatternReader;