import { credentialsCredentialsCreateCredential } from "./create-credential";
import { credentialsCredentialsDeleteCredential } from "./delete-credential";
import { credentialsCredentialsGetCredential } from "./get-credential";
import { credentialsCredentialsGetCredentialDependencies } from "./get-credential-dependencies";
import { credentialsCredentialsGetCredentialType } from "./get-credential-type";
import { credentialsCredentialsGetCredentials } from "./get-credentials";
import { credentialsCredentialsTestCredential } from "./test-credential";
import { credentialsCredentialsTransferCredential } from "./transfer-credential";
import { credentialsCredentialsUpdateCredential } from "./update-credential";

export const credentialsCredentialsTools = [
  credentialsCredentialsCreateCredential,
  credentialsCredentialsDeleteCredential,
  credentialsCredentialsGetCredential,
  credentialsCredentialsGetCredentialDependencies,
  credentialsCredentialsGetCredentialType,
  credentialsCredentialsGetCredentials,
  credentialsCredentialsTestCredential,
  credentialsCredentialsTransferCredential,
  credentialsCredentialsUpdateCredential,
];
