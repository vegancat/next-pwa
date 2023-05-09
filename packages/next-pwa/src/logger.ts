import chalk from "chalk";
import { createRequire } from "module";
import type nextPackageJsonType from "next/package.json";
import { gte as semverGte } from "semver";

const require = createRequire(import.meta.url);

const nextPackageJson =
  require("next/package.json") as typeof nextPackageJsonType;

const isNextNewerThan13_4_1 = semverGte(nextPackageJson.version, "13.4.1");

const getPrefix = (color: string, oldStyleSpace = 0) => {
  return isNextNewerThan13_4_1
    ? `- ${color} (pwa)`
    : `${color}${" ".repeat(oldStyleSpace)}- (PWA)`;
};

export const prefixes = {
  wait: getPrefix(chalk.cyan("wait"), 2),
  error: getPrefix(chalk.red("error"), 1),
  warn: getPrefix(chalk.yellow("warn"), 2),
  info: getPrefix(chalk.cyan("info"), 2),
} as const;

export const wait = (...message: any[]) => {
  console.log(prefixes.wait, ...message);
};

export const error = (...message: any[]) => {
  console.error(prefixes.error, ...message);
};

export const warn = (...message: any[]) => {
  console.warn(prefixes.warn, ...message);
};

export const info = (...message: any[]) => {
  console.log(prefixes.info, ...message);
};
