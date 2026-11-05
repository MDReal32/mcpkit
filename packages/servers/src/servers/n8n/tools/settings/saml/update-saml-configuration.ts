import { defineTool } from "@usemcpkit/core";

export const settingsSamlUpdateSamlConfiguration = defineTool({
  name: "settings:saml:update_saml_configuration",
  description:
    "Set the SAML SSO configuration. Replace the SAML SSO configuration with the provided full object. Every writable field must be sent; use empty strings or empty arrays when a value is unset. Read-only `entityID` / `returnUrl` from GET are ignored if included, so a GET response can be sent back as a PUT body. Redacted secret placeholders keep the stored values unchanged. The update takes effect exactly as it would from the UI, us…",
  input: {
    type: "object",
    properties: {
      mapping: {
        type: "object",
        description:
          "Mapping of SAML attributes to n8n user fields. Use empty strings / empty arrays for unused attributes.",
        properties: {
          email: {
            type: "string",
            description: "SAML attribute mapped to the user's email.",
          },
          firstName: {
            type: "string",
            description: "SAML attribute mapped to the user's first name.",
          },
          lastName: {
            type: "string",
            description: "SAML attribute mapped to the user's last name.",
          },
          userPrincipalName: {
            type: "string",
            description: "SAML attribute mapped to the user's principal name.",
          },
          emailVerified: {
            type: "string",
            description:
              "SAML attribute that states whether the identity provider verified the user's email. Accepted values are `true` and `false`, case-insensitive. Use an empty string when unused.",
          },
          n8nInstanceRole: {
            type: "string",
            description: "SAML attribute mapped to the n8n instance role. Use an empty string when unused.",
          },
          n8nProjectRoles: {
            type: "array",
            description:
              "SAML attributes mapped to n8n project roles, formatted as `<projectId>:<role>`. Use an empty array when unused.",
            items: {
              type: "string",
            },
          },
        },
        required: [
          "email",
          "firstName",
          "lastName",
          "userPrincipalName",
          "emailVerified",
          "n8nInstanceRole",
          "n8nProjectRoles",
        ],
      },
      metadata: {
        type: "string",
        description:
          "Identity provider metadata in XML format. Use an empty string to clear stored metadata (also clears metadataUrl when no URL is provided). Use the redaction placeholder from a prior GET to leave an existing value unchanged.",
      },
      metadataUrl: {
        type: "string",
        description: "URL to fetch identity provider metadata from. Use an empty string to clear a stored URL.",
      },
      ignoreSSL: {
        type: "boolean",
        description: "Whether to ignore SSL certificate errors when fetching metadata from a URL.",
      },
      loginBinding: {
        type: "string",
        description: "SAML login request binding.",
        enum: ["redirect", "post"],
      },
      loginEnabled: {
        type: "boolean",
        description: "Whether SAML login is enabled.",
      },
      loginLabel: {
        type: "string",
        description: "Label shown on the SAML login button.",
      },
      authnRequestsSigned: {
        type: "boolean",
        description: "Whether authentication requests are signed.",
      },
      wantAssertionsSigned: {
        type: "boolean",
        description: "Whether signed assertions are required.",
      },
      wantMessageSigned: {
        type: "boolean",
        description: "Whether signed SAML messages are required.",
      },
      emailVerifiedRequired: {
        type: "boolean",
        description:
          "Whether the identity provider must assert that the user's email address is verified before a login is linked to an existing user by email. When disabled, only an explicit negative assertion is rejected.",
      },
      signingPrivateKey: {
        type: "string",
        description:
          "PEM-encoded private key for signing SAML AuthnRequests. Use an empty string to clear an existing key, or the redaction placeholder from a prior GET to leave it unchanged.",
      },
      signingCertificate: {
        type: "string",
        description:
          "PEM-encoded certificate containing the public key matching the signing private key. Use an empty string when unused or to clear an existing certificate.",
      },
      acsBinding: {
        type: "string",
        description: "Assertion Consumer Service binding.",
        enum: ["redirect", "post"],
      },
      signatureConfig: {
        type: "object",
        description: "Configuration for the signature in SAML requests and responses.",
        properties: {
          prefix: {
            type: "string",
          },
          location: {
            type: "object",
            properties: {
              reference: {
                type: "string",
              },
              action: {
                type: "string",
                enum: ["before", "after", "prepend", "append"],
              },
            },
            required: ["reference", "action"],
          },
        },
        required: ["prefix", "location"],
      },
      relayState: {
        type: "string",
        description: "Default relay state value for SAML requests. Use an empty string when unused.",
      },
      entityID: {
        type: "string",
        description:
          "Service provider entity ID. Returned by GET for convenience; ignored on write so a GET response can be sent back as a PUT body.",
      },
      returnUrl: {
        type: "string",
        description:
          "Assertion Consumer Service return URL. Returned by GET for convenience; ignored on write so a GET response can be sent back as a PUT body.",
      },
    },
    required: [
      "mapping",
      "metadata",
      "metadataUrl",
      "ignoreSSL",
      "loginBinding",
      "loginEnabled",
      "loginLabel",
      "authnRequestsSigned",
      "wantAssertionsSigned",
      "wantMessageSigned",
      "emailVerifiedRequired",
      "signingPrivateKey",
      "signingCertificate",
      "acsBinding",
      "signatureConfig",
      "relayState",
    ],
  },
  request: {
    method: "PUT",
    path: "/settings/sso/saml",
    body: [
      "mapping",
      "metadata",
      "metadataUrl",
      "ignoreSSL",
      "loginBinding",
      "loginEnabled",
      "loginLabel",
      "authnRequestsSigned",
      "wantAssertionsSigned",
      "wantMessageSigned",
      "emailVerifiedRequired",
      "signingPrivateKey",
      "signingCertificate",
      "acsBinding",
      "signatureConfig",
      "relayState",
      "entityID",
      "returnUrl",
    ],
  },
});
