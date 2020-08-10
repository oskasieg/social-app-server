"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Interest = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//zainteresowania recznie dodane do mongoDB!
const interestSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const Interest = _mongoose.default.model('interest', interestSchema);

exports.Interest = Interest;