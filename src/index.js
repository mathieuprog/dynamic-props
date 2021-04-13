import { isArray, isObjectLiteral } from './utils';

const setNestedProp = (path, ...indexes) => {
  const splitPath = path.join('').split('.');

  return (object, value) => {
    splitPath.forEach((key, i) => {
      const isLastProp = (i === splitPath.length - 1);

      if (key.slice(-1) === ']') {
        key = key.slice(0, -2);
        if (!object[key]) {
          object[key] = [];
        }
        const index = indexes.shift();
        if (isLastProp) {
          object[key][index] = value;
        } else {
          if (!object[key][index]) {
            object[key][index] = {};
          }
          object = object[key][index];
        }
      } else {
        if (isLastProp) {
          object[key] = value;
        } else {
          if (!object[key]) {
            object[key] = {};
          }
          object = object[key];
        }
      }
    });
  };
};

const isEmpty = item => {
  return (isObjectLiteral(item) && !Object.keys(item).length)
    || (isArray(item) && !item.some(e => e !== undefined && (!isObjectLiteral(e) || Object.keys(e).length)))
    || item === undefined;
};

const deleteNestedProp = (path, ...indexes) => {
  const splitPath = path.join('').split('.');

  return object => {
    let cleanPrevObject = null;

    for (let [i, key] of splitPath.entries()) {
      const isLastProp = (i === splitPath.length - 1);

      if (key.slice(-1) === ']') {
        key = key.slice(0, -2);
        if (!object[key]) {
          break;
        }
        const index = indexes.shift();
        if (!object[key][index]) {
          break;
        } else if (isLastProp) {
          delete object[key][index];
          if (!object[key].some(e => e !== undefined)) {
            delete object[key];
          }
          cleanPrevObject && cleanPrevObject();
        } else {
          // copy for closure
          const o = object;
          const prevCleanPrevObject = cleanPrevObject;
          cleanPrevObject = () => {
            if (isEmpty(o[key][index])) {
              delete o[key][index];
              if (isEmpty(o[key])) {
                delete o[key];
                prevCleanPrevObject && prevCleanPrevObject();
              }
            }
          };
          object = object[key][index];
        }
      } else {
        if (!object[key]) {
          break;
        } else if (isLastProp) {
          delete object[key];
          cleanPrevObject && cleanPrevObject();
        } else {
          // copy for closure
          const o = object;
          const prevCleanPrevObject = cleanPrevObject;
          cleanPrevObject = () => {
            if (isEmpty(o[key])) {
              delete o[key];
              prevCleanPrevObject && prevCleanPrevObject();
            }
          };
          object = object[key];
        }
      }
    }
  };
};

export {
  setNestedProp,
  deleteNestedProp
}
