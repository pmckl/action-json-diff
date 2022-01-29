const json_diff = require('json-diff')

let diff = function (string_a,string_b) {
    return new Promise((resolve) => {
      if (string_a.length === 0) {
        throw new Error('String A is empty');
      }
      if (string_b.length === 0) {
        throw new Error('String B is empty');
      }
      const obj_a = JSON.parse(string_a)
      const obj_b = JSON.parse(string_b)
      const diff = json_diff.diffString(obj_a, obj_b, {color:false})
      resolve(diff);
    });
  };
  
  module.exports = diff;