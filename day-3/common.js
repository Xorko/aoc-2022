String.prototype.isAlpha = function () {
  return /^[A-Z]$/i.test(this);
};

String.prototype.isLowerCase = function () {
  return this === this.toLowerCase();
};

export const calculatePriority = (item) => {
  if (!item.isAlpha()) throw new Error(`${item} must be a letter`);
  if (item.length !== 1) throw new Error(`${item} is not a single item`);

  if (item.isLowerCase()) {
    return item.charCodeAt(0) - 96;
  } else {
    return item.charCodeAt(0) - 38;
  }
};
