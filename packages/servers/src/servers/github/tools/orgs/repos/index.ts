import { orgsReposCreateOrgRuleset } from "./create-org-ruleset";
import { orgsReposDeleteOrgRuleset } from "./delete-org-ruleset";
import { orgsReposGetOrgRuleSuite } from "./get-org-rule-suite";
import { orgsReposGetOrgRuleSuites } from "./get-org-rule-suites";
import { orgsReposGetOrgRuleset } from "./get-org-ruleset";
import { orgsReposGetOrgRulesets } from "./get-org-rulesets";
import { orgsReposUpdateOrgRuleset } from "./update-org-ruleset";

export const orgsReposTools = [
  orgsReposCreateOrgRuleset,
  orgsReposDeleteOrgRuleset,
  orgsReposGetOrgRuleSuite,
  orgsReposGetOrgRuleSuites,
  orgsReposGetOrgRuleset,
  orgsReposGetOrgRulesets,
  orgsReposUpdateOrgRuleset,
];
