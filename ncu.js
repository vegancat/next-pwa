// @ts-check
import fg from "fast-glob";
import ncu from "npm-check-updates";

/**
 * @type {import("npm-check-updates").default}
 */
// @ts-expect-error Wrong type provided by npm-check-updates.
const run = ncu.run;

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
