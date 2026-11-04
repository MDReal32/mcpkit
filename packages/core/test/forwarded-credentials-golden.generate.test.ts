import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { it } from "vitest";
import type { CredentialRequest } from "../src/auth";
import { withUpstreamAccess } from "../src/execution/upstream/with-upstream-access";

const OUTPUT = process.env.FORWARDED_GOLDEN_OUTPUT ?? "";

const TEAMS_MANIFEST = join(__dirname, "../../servers/build/manifests/communication/teams.json");

/**
 * Writes `crates/execution/tests/fixtures/teams-forwarded-credentials.json`, which the Rust upstream access test
 * compares against: the credentials form the Teams manifest asks for when only one of its `forwardEnv` values is set,
 * and the environment the upstream gets from the padded answers.
 */
it.skipIf(OUTPUT === "")("writes the forwarded credentials golden file", async () => {
  const manifest = JSON.parse(readFileSync(TEAMS_MANIFEST, "utf8"));
  let asked: CredentialRequest | undefined;
  const access = await withUpstreamAccess(manifest, async (given) => given, {
    env: { TEAMS_APP_ID: "app-1" },
    requestCredentials: async (request) => {
      asked = request;
      const [option] = request.options;
      if (!option) {
        throw new Error("the credentials form offered no option");
      }
      const values = Object.fromEntries(option.fields.map((field) => [field.key, `  ${field.key.toLowerCase()}  `]));
      return { method: "token", option: 0, values };
    },
  });
  writeFileSync(OUTPUT, `${JSON.stringify({ request: asked, env: access.env }, null, 2)}\n`);
});
