export const prepareRegxPattern = (rules) => {
  if (!(rules instanceof Array)) return [];
  if (rules.length === 0) return [];

  return rules.map((item) => {
    if (item.hasOwnProperty('pattern')) {
      return {
        ...item,
        pattern: new RegExp(item.pattern),
      };
    }
    return item;
  });
};

