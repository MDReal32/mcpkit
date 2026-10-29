import type { UpstreamNameRule } from "../../manifest";

const CATALOG_NAME_PATTERN = /^[a-z][a-z0-9_]*(:[a-z][a-z0-9_]*){2,}$/;

/**
 * The catalog name `rules` give an upstream tool, from the first rule whose `match` finds the tool name, or undefined
 * when none does. A name that is not `<group>:<resource>:<action>` in lowercase snake case is an error in the
 * manifest, never silently replaced.
 */
export const nameUpstreamTool = (rules: readonly UpstreamNameRule[] | undefined, upstreamName: string) => {
  for (const rule of rules ?? []) {
    const pattern = new RegExp(rule.match);
    if (!pattern.test(upstreamName)) {
      continue;
    }
    const name = upstreamName.replace(pattern, rule.name);
    if (!CATALOG_NAME_PATTERN.test(name)) {
      throw new Error(
        `naming rule "${rule.match}" turned "${upstreamName}" into "${name}", which is not <group>:<resource>:<action>`,
      );
    }
    return name;
  }
  return undefined;
};
