export const safeParse = (val, defaultVal) => {
  // debugger;
  if (typeof val === 'undefined' || val === null || val.length === 0) {
    return defaultVal;
  }
  return val;
};
