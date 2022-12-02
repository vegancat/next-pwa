// @ts-check
import { exec } from "child_process";

import { examples } from "./__constants.js";

(async () => {
  for (const example of await examples()) {
    exec(
      `cd examples/${example} && npx npm-check-updates -u`,
      (err, stdout, stderr) => {
        if (err) {
          throw err;
        }
        if (stdout) {
          console.log(`stdout: ${stdout}`);
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
        }
      }
    );
  }
})();
