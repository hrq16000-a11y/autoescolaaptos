import { spawnSync } from "node:child_process";

for (const args of [["scripts/check-no-curitiba.mjs"], ["scripts/seo-audit.mjs"], ["node_modules/vite/bin/vite.js", "build"]]) {
  const result = spawnSync(process.execPath, args, {
    stdio: "inherit",
    env: { ...process.env, APTOS_STANDALONE: "1" },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
