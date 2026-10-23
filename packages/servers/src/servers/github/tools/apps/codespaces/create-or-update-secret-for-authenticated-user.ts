import { defineTool } from "@usemcpkit/core";

export const appsCodespacesCreateOrUpdateSecretForAuthenticatedUser = defineTool({
  name: "apps:codespaces:create_or_update_secret_for_authenticated_user",
  description:
    'Create or update a secret for the authenticated user. Creates or updates a development environment secret for a user\'s codespace with an encrypted value. Encrypt your secret using LibSodium. For more information, see "Encrypting secrets for the REST API."',
  input: {
    type: "object",
    properties: {
      secret_name: {
        type: "string",
        description: "The name of the secret.",
      },
      encrypted_value: {
        type: "string",
        description:
          "Value for your secret, encrypted with LibSodium using the public key retrieved from the Get the public key for the authenticated user endpoint.",
      },
      key_id: {
        type: "string",
        description: "ID of the key you used to encrypt the secret.",
      },
      selected_repository_ids: {
        type: "array",
        description:
          "An array of repository ids that can access the user secret. You can manage the list of selected repositories using the List selected repositories for a user secret, Set selected repositories for a user secret, and Remove a selected repository from a user secret endpoints.",
        items: {},
      },
    },
    required: ["secret_name", "key_id"],
  },
  request: {
    method: "PUT",
    path: "/user/codespaces/secrets/{secret_name}",
    body: ["encrypted_value", "key_id", "selected_repository_ids"],
  },
});
