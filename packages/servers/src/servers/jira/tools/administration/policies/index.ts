import { administrationPoliciesAddPolicyToProjects } from "./add-policy-to-projects";
import { administrationPoliciesGetPolicyState } from "./get-policy-state";
import { administrationPoliciesGetProjectRules } from "./get-project-rules";
import { administrationPoliciesListPolicies } from "./list-policies";
import { administrationPoliciesRemovePolicyFromProjects } from "./remove-policy-from-projects";
import { administrationPoliciesSetProjectPolicies } from "./set-project-policies";
import { administrationPoliciesValidatePolicyApplication } from "./validate-policy-application";

export const administrationPoliciesTools = [
  administrationPoliciesAddPolicyToProjects,
  administrationPoliciesGetPolicyState,
  administrationPoliciesGetProjectRules,
  administrationPoliciesListPolicies,
  administrationPoliciesRemovePolicyFromProjects,
  administrationPoliciesSetProjectPolicies,
  administrationPoliciesValidatePolicyApplication,
];
