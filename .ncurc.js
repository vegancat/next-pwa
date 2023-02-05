// @ts-check
/** @type {import("npm-check-updates").RunOptions} */
module.exports = {
  target: (dependencyName) => {
    if (dependencyName === "typescript") {
      return "@next";
    }
    if (dependencyName.match(/(@|^)next.*/)) {
      return "@canary";
    }
    return "latest";
  },
};
