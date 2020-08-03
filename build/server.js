"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = require("body-parser");

var _config = _interopRequireDefault(require("./config"));

var _db = _interopRequireDefault(require("./utils/db"));

var _post = _interopRequireDefault(require("./resources/post/post.router"));

var _user = _interopRequireDefault(require("./resources/user/user.router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.disable('x-powered-by');
app.use((0, _cors.default)());
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
app.use((0, _morgan.default)('dev'));
app.use(_post.default);
app.use(_user.default);

const start = async () => {
  try {
    await (0, _db.default)();
    app.listen(_config.default.port, () => {
      console.log(`Server is running on: ${_config.default.port}.`);
    });
  } catch (e) {
    console.error(e);
  }
};

var _default = start;
exports.default = _default;