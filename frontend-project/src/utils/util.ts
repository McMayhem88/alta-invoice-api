export const Util = {
  isAnyNull: (...args: any[]): boolean => {
    return args.some(arg => arg === null);
  },
};