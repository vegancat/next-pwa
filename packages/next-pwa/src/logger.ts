import chalk from "chalk";

export const prefixes = {
  wait: chalk.cyan("wait") + "  - (PWA)",
  error: chalk.red("error") + " - (PWA)",
  warn: chalk.yellow("warn") + "  - (PWA)",
  info: chalk.cyan("info") + "  - (PWA)",
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
