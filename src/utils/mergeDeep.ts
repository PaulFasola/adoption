/* istanbul ignore file */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isObject = (item): boolean => {
  return item && typeof item === 'object' && !Array.isArray(item);
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mergeDeep = (target, source): Record<string, unknown> => {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
};
