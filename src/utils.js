function isArray(a) {
  if (a === null || a === undefined) {
    return false;
  }

  return Array.isArray(a);
}

function isObjectLiteral(o) {
  if (o === null || o === undefined) {
    return false;
  }

  return Object.getPrototypeOf(o) === Object.prototype;
}

export {
  isArray,
  isObjectLiteral
}
