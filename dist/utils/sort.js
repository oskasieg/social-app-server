"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortByDate = void 0;

// asc - rosnaco
function compareAsc(a, b) {
  return a.createdAt - b.createdAt;
} // dec - malejaco


function compareDec(a, b) {
  return b.createdAt - a.createdAt;
}

const sortByDate = (array, type) => {
  switch (type) {
    case 'asc':
      {
        array.sort(compareAsc);
        break;
      }

    case 'dec':
      {
        array.sort(compareDec);
        break;
      }

    default:
      {
        break;
      }
  }

  return array;
};

exports.sortByDate = sortByDate;