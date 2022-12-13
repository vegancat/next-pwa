// @ts-check
import { quote } from "shell-quote";

const isWin = process.platform === "win32";

/** @type {Record<string, (_: string[]) => string[]>} */
export default {
  "**/*.{js,jsx,cjs,mjs,ts,tsx}": (filenames) => {
    const escapedFileNames = filenames
      .map((filename) => `"${isWin ? filename : escapeStr([filename])}"`)
      .join(" ");
    return [
      `pnpm format ${escapedFileNames}`,
      `eslint --fix ${filenames}`,
      `git add ${escapedFileNames}`,
    ];
  },
  "**/*.{json,md,mdx,css,html,yml,yaml,scss}": (filenames) => {
    const escapedFileNames = filenames
      .map((filename) => `"${isWin ? filename : escapeStr([filename])}"`)
      .join(" ");
    return [`pnpm format ${escapedFileNames}`, `git add ${escapedFileNames}`];
  },
};

/**
 * @param {string[]} str
 * @returns
 */
function escapeStr(str) {
  const escaped = quote(str);
  return escaped.replace(/\\@/g, "@");
}
