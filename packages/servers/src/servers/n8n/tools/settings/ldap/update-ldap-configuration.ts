import { defineTool } from "@usemcpkit/core";

export const settingsLdapUpdateLdapConfiguration = defineTool({
  name: "settings:ldap:update_ldap_configuration",
  description:
    "Set the LDAP configuration. Replace the LDAP configuration with the provided full object (partial updates are not supported). For bindingAdminPassword, submit the blanking placeholder from a prior GET to keep the stored password unchanged. Requires the `ldap:manage` scope and the LDAP feature to be licensed. Setting loginEnabled to false is destructive and it deletes all stored LDAP user identities and disables synchronizat…",
  input: {
    type: "object",
    properties: {
      loginEnabled: {
        type: "boolean",
        description:
          "Whether LDAP login is enabled. Setting this to false is destructive — it deletes all stored LDAP user identities and disables synchronization.",
      },
      loginLabel: {
        type: "string",
        description: "Label shown on the LDAP login button.",
      },
      connectionUrl: {
        type: "string",
        description: "LDAP server URL.",
      },
      allowUnauthorizedCerts: {
        type: "boolean",
        description: "Whether to allow unauthorized (self-signed) certificates.",
      },
      connectionSecurity: {
        type: "string",
        description: "TLS/SSL security mode for the LDAP connection.",
        enum: ["none", "tls", "startTls"],
      },
      connectionPort: {
        type: "integer",
        description: "LDAP server port.",
      },
      baseDn: {
        type: "string",
        description: "Base DN for LDAP search queries.",
      },
      bindingAdminDn: {
        type: "string",
        description: "DN of the LDAP admin user for binding.",
      },
      bindingAdminPassword: {
        type: "string",
        description:
          "Password for the LDAP admin user. To keep an existing password unchanged, submit the blanking placeholder from a prior GET response. Use an empty string to clear the password.",
      },
      firstNameAttribute: {
        type: "string",
        description: "LDAP attribute mapped to the user's first name.",
      },
      lastNameAttribute: {
        type: "string",
        description: "LDAP attribute mapped to the user's last name.",
      },
      emailAttribute: {
        type: "string",
        description: "LDAP attribute mapped to the user's email.",
      },
      loginIdAttribute: {
        type: "string",
        description: "LDAP attribute used for login (usually the same as emailAttribute).",
      },
      ldapIdAttribute: {
        type: "string",
        description: "LDAP attribute that uniquely identifies a user.",
      },
      userFilter: {
        type: "string",
        description:
          "Additional LDAP filter to apply when searching for users. Use an empty string for no additional filter.",
      },
      synchronizationEnabled: {
        type: "boolean",
        description: "Whether automatic LDAP synchronization is enabled.",
      },
      synchronizationInterval: {
        type: "integer",
        description:
          "Interval in minutes between automatic synchronizations. Ignored if synchronizationEnabled is false.",
      },
      searchPageSize: {
        type: "integer",
        description: "Number of LDAP entries to fetch per search page.",
      },
      searchTimeout: {
        type: "integer",
        description: "LDAP search timeout in seconds.",
      },
      enforceEmailUniqueness: {
        type: "boolean",
        description:
          "Whether to enforce that email addresses are unique across LDAP users. When true, if two users have the same email, only the first will be imported.",
      },
      linkExistingAccountsByEmail: {
        type: "boolean",
        description:
          "Whether an LDAP user may be linked to an existing n8n account that has the same email. When false, login and synchronization skip such users. Optional on PUT; the stored value is kept when omitted.",
      },
    },
    required: [
      "loginEnabled",
      "loginLabel",
      "connectionUrl",
      "allowUnauthorizedCerts",
      "connectionSecurity",
      "connectionPort",
      "baseDn",
      "bindingAdminDn",
      "bindingAdminPassword",
      "firstNameAttribute",
      "lastNameAttribute",
      "emailAttribute",
      "loginIdAttribute",
      "ldapIdAttribute",
      "userFilter",
      "synchronizationEnabled",
      "synchronizationInterval",
      "searchPageSize",
      "searchTimeout",
      "enforceEmailUniqueness",
    ],
  },
  request: {
    method: "PUT",
    path: "/settings/ldap",
    body: [
      "loginEnabled",
      "loginLabel",
      "connectionUrl",
      "allowUnauthorizedCerts",
      "connectionSecurity",
      "connectionPort",
      "baseDn",
      "bindingAdminDn",
      "bindingAdminPassword",
      "firstNameAttribute",
      "lastNameAttribute",
      "emailAttribute",
      "loginIdAttribute",
      "ldapIdAttribute",
      "userFilter",
      "synchronizationEnabled",
      "synchronizationInterval",
      "searchPageSize",
      "searchTimeout",
      "enforceEmailUniqueness",
      "linkExistingAccountsByEmail",
    ],
  },
});
