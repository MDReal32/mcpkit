import { reposCreateOrgRuleset } from './create-org-ruleset';
import { reposDeleteOrgRuleset } from './delete-org-ruleset';
import { reposGetOrgRuleSuite } from './get-org-rule-suite';
import { reposGetOrgRuleSuites } from './get-org-rule-suites';
import { reposGetOrgRuleset } from './get-org-ruleset';
import { reposGetOrgRulesets } from './get-org-rulesets';
import { reposUpdateOrgRuleset } from './update-org-ruleset';

export const reposTools = [
  reposCreateOrgRuleset,
  reposDeleteOrgRuleset,
  reposGetOrgRuleSuite,
  reposGetOrgRuleSuites,
  reposGetOrgRuleset,
  reposGetOrgRulesets,
  reposUpdateOrgRuleset,
];
