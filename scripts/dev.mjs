import net from "node:net";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const args = process.argv.slice(2);
const portIndex = args.findIndex(arg => arg === "--port" || arg === "-p");
const port = Number(portIndex >= 0 ? args[portIndex + 1] : process.env.PORT || 3000);
const probe = net.createServer();
probe.once("error", error => {
  console.error(error.code === "EADDRINUSE"
    ? `Port ${port} is already in use. Use the existing server at http://localhost:${port}; a second server was not started.`
    : error.message);
  process.exitCode = 1;
});
probe.listen(port, () => probe.close(() => {
  const require = createRequire(import.meta.url);
  const child = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "dev", ...args], { stdio: "inherit", env: process.env });
  child.on("exit", code => { process.exitCode = code ?? 0; });
  child.on("error", error => { console.error(error.message); process.exitCode = 1; });
}));
