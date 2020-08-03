"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

const postRouter = (0, _express.Router)();
postRouter.route('/post/:id').get((req, res) => {
  res.status(200).json({
    message: `pobrales post o id: ${req.params.id}`
  });
});
var _default = postRouter;
exports.default = _default;