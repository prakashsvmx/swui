import { isArray,  isPlainObject } from 'lodash';
/*
Interface for Reflect.deleteObjectProperty with an additional capability to pass array of keys
@param sourceObj : The object from which you want to delete the key
@param keysToDelete: Can be string or Array of strings
return boolean.
returns True if key was deleted / not existed / input was not an object
Throws an Error for non object / frozen object
*/

export const deleteObjectProperty = (sourceObj, keysToDelete) => {
  const isObj = isPlainObject(sourceObj);
  let result = true;
  if (isObj) {
    let keys = keysToDelete;
    const isKeyToDeleteArray = isArray(keysToDelete);
    if (!isKeyToDeleteArray) {
      keys = [keysToDelete];
    }
    for (let i = keys.length - 1; i >= 0; i -= 1) {
      const key = keys[i];
      const isDeleted = Reflect.deleteProperty(sourceObj, key);
      if (!isDeleted) {
        result = false;
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(`The key ${key} was unable to delete`);
      }
    }
  } else {
    result = false;
    throw new Error({
      message: 'deleteObjectProperty was called on non-object/frozen-object',
    });
  }
  return result;
};

export function toRomanNumeral (n) {
  if (!Number.isInteger(n)) {
    return false;
  }
  let i, r, decimal, roman;
  r = '';
  decimal = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
  roman = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'C', 'CD', 'D', 'CM', 'M'];
  for (i = 12; i >= 0; i--) {
    while (n >= decimal[i]) {
      r += roman[i];
      n -= decimal[i];
    }
  }
  return r;
}

export function indexKeyFormatter (url) {
  const [id] = url.match(/([0-9])+/g);
  return id;

}
