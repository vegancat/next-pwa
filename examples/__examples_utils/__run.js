import { spawn } from "child_process";

const cmd = spawn("node", [`examples/__examples_utils/${process.argv[2]}.js`]);

cmd.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

cmd.stderr.on("data", (data) => {
  console.log(`stderr: ${data}`);
});

cmd.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
