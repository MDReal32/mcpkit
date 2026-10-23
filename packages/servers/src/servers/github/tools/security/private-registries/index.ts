import { securityPrivateRegistriesCreateOrgPrivateRegistry } from './create-org-private-registry';
import { securityPrivateRegistriesDeleteOrgPrivateRegistry } from './delete-org-private-registry';
import { securityPrivateRegistriesGetOrgPrivateRegistry } from './get-org-private-registry';
import { securityPrivateRegistriesGetOrgPublicKey } from './get-org-public-key';
import { securityPrivateRegistriesListOrgPrivateRegistries } from './list-org-private-registries';
import { securityPrivateRegistriesUpdateOrgPrivateRegistry } from './update-org-private-registry';

export const securityPrivateRegistriesTools = [
  securityPrivateRegistriesCreateOrgPrivateRegistry,
  securityPrivateRegistriesDeleteOrgPrivateRegistry,
  securityPrivateRegistriesGetOrgPrivateRegistry,
  securityPrivateRegistriesGetOrgPublicKey,
  securityPrivateRegistriesListOrgPrivateRegistries,
  securityPrivateRegistriesUpdateOrgPrivateRegistry,
];
