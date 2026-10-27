import type { Manifest } from "../../../manifest";
import { saveServerDomain } from "../../config/save-server-domain";
import { resolveProject } from "../../project/resolve-project";
import type { AuthContext } from "../../types/auth-context";
import { saveCredentials } from "./save-credentials";

/** Credentials go to the secret store under their host; the host is remembered for the project that asked for it. */
export const saveFormAnswer = async (
  manifest: Manifest,
  values: Readonly<Record<string, string>>,
  domain: string | undefined,
  context: AuthContext,
) => {
  await saveCredentials({ name: manifest.name, category: manifest.category, domain }, values, context.secretStore);
  if (domain === undefined) {
    return;
  }
  const project = context.projectDir === undefined ? undefined : await resolveProject(context.projectDir);
  await saveServerDomain(context.env, manifest.name, domain, project?.key);
};
