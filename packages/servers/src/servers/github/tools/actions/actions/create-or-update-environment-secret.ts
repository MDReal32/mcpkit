import { defineTool } from "@usemcpkit/core";

export const actionsActionsCreateOrUpdateEnvironmentSecret = defineTool({
  name: "actions:actions:create_or_update_environment_secret",
  description:
    'Create or update an environment secret. Creates or updates an environment secret with an encrypted value. Encrypt your secret using LibSodium. For more information, see "Encrypting secrets for the REST API."',
  input: {
    type: "object",
    properties: {
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
      },
      environment_name: {
        type: "string",
        description:
          "The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`.",
      },
      secret_name: {
        type: "string",
        description: "The name of the secret.",
      },
      encrypted_value: {
        type: "string",
        description:
          "Value for your secret, encrypted with LibSodium using the public key retrieved from the Get an environment public key endpoint.",
      },
      key_id: {
        type: "string",
        description: "ID of the key you used to encrypt the secret.",
      },
    },
    required: ["owner", "repo", "environment_name", "secret_name", "encrypted_value", "key_id"],
  },
  request: {
    method: "PUT",
    path: "/repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}",
    body: ["encrypted_value", "key_id"],
  },
});
