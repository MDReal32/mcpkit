import { privateRegistriesCreateOrgPrivateRegistry } from './create-org-private-registry';
import { privateRegistriesDeleteOrgPrivateRegistry } from './delete-org-private-registry';
import { privateRegistriesGetOrgPrivateRegistry } from './get-org-private-registry';
import { privateRegistriesGetOrgPublicKey } from './get-org-public-key';
import { privateRegistriesListOrgPrivateRegistries } from './list-org-private-registries';
import { privateRegistriesUpdateOrgPrivateRegistry } from './update-org-private-registry';

export const privateRegistriesTools = [
  privateRegistriesCreateOrgPrivateRegistry,
  privateRegistriesDeleteOrgPrivateRegistry,
  privateRegistriesGetOrgPrivateRegistry,
  privateRegistriesGetOrgPublicKey,
  privateRegistriesListOrgPrivateRegistries,
  privateRegistriesUpdateOrgPrivateRegistry,
];
