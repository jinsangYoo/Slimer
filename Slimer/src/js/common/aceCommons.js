import * as _ from 'lodash';

let minLen = 2;

function isValid(name) {
  console.log("name: " + name);
  return _.trim(name).length >= minLen;
}

export default {
  isValid
};
