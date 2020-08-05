"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInterests = void 0;

var _interest = require("./interest.model");

const getInterests = async (req, res) => {
  try {
    const interests = await _interest.Interest.find();

    if (!interests) {
      res.status(500).json({
        message: 'No interests in database'
      });
    }

    res.status(200).json(interests);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Error while geting interests!'
    });
  }
};

exports.getInterests = getInterests;