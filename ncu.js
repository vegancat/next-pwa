import fg from "fast-glob";
import { run } from "npm-check-updates";

/**
 * Update and then log updated dependencies.
 *
 * @param {import("npm-check-updates").RunOptions} runOptions
 */
const updateAndLog = async (runOptions) => {
  const upgraded = await run(runOptions);
  console.log(
    `Upgraded dependencies for ${runOptions.packageFile ?? "./package.json"}:`,
    upgraded
  );
};

await Promise.all([
  (
    await fg("./**/package.json", {
      ignore: ["examples/**", "**/node_modules/**"],
    })
  ).map(
    async (packageFile) =>
      await updateAndLog({
        packageFile,
        upgrade: true,
        target: (dependencyName) => {
          if (dependencyName === "typescript") {
            return "@next";
          }
          if (/^react(-dom)?$/.test(dependencyName)) {
            return "@latest";
          }
          return "latest";
        },
      })
  ),
  await updateAndLog({
    packageFile: "examples/*/package.json",
    upgrade: true,
  }),
]);
