"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoomAction = void 0;
const core_1 = __importDefault(require("@actions/core"));
class LoomAction {
    static pattern = core_1.default.getInput('pattern');
    static run() {
        console.log('Hello world');
    }
}
exports.LoomAction = LoomAction;
