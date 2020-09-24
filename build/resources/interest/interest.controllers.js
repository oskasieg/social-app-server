"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInterests = exports.checkInterests = void 0;

var _interest = require("./interest.model");

const checkInterests = async () => {
  try {
    const exist = await _interest.Interest.find();

    if (exist.length === 0) {
      const interests = [{
        name: 'Football'
      }, {
        name: 'Travel'
      }, {
        name: 'Cook'
      }, {
        name: 'Games'
      }, {
        name: 'IT'
      }, {
        name: 'Science'
      }, {
        name: 'Music'
      }];
      await _interest.Interest.insertMany(interests);
    }
  } catch (e) {
    console.error(e);
  }
};

exports.checkInterests = checkInterests;

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