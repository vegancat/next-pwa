// @ts-check

import { readdir } from "fs/promises";

/**
 * @param {import("fs").PathLike} source
 * @returns
 */
const getDirectories = async (source) =>
  (await readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

export const examples = async () =>
  (await getDirectories("examples")).filter((name) => !name.startsWith("__"));
