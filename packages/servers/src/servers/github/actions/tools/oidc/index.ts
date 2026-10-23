import { oidcCreateOidcCustomPropertyInclusionForEnterprise } from './create-oidc-custom-property-inclusion-for-enterprise';
import { oidcCreateOidcCustomPropertyInclusionForOrg } from './create-oidc-custom-property-inclusion-for-org';
import { oidcDeleteOidcCustomPropertyInclusionForEnterprise } from './delete-oidc-custom-property-inclusion-for-enterprise';
import { oidcDeleteOidcCustomPropertyInclusionForOrg } from './delete-oidc-custom-property-inclusion-for-org';
import { oidcGetOidcCustomSubTemplateForOrg } from './get-oidc-custom-sub-template-for-org';
import { oidcListOidcCustomPropertyInclusionsForEnterprise } from './list-oidc-custom-property-inclusions-for-enterprise';
import { oidcListOidcCustomPropertyInclusionsForOrg } from './list-oidc-custom-property-inclusions-for-org';
import { oidcUpdateOidcCustomSubTemplateForOrg } from './update-oidc-custom-sub-template-for-org';

export const oidcTools = [
  oidcCreateOidcCustomPropertyInclusionForEnterprise,
  oidcCreateOidcCustomPropertyInclusionForOrg,
  oidcDeleteOidcCustomPropertyInclusionForEnterprise,
  oidcDeleteOidcCustomPropertyInclusionForOrg,
  oidcGetOidcCustomSubTemplateForOrg,
  oidcListOidcCustomPropertyInclusionsForEnterprise,
  oidcListOidcCustomPropertyInclusionsForOrg,
  oidcUpdateOidcCustomSubTemplateForOrg,
];
