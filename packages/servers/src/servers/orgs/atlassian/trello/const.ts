import type { Manifest, OpenApiSource } from "@usemcpkit/core";
import { defineUI } from "@usemcpkit/core";

export const TRELLO_API_KEY_ENV = "TRELLO_API_KEY";

export const TRELLO_TOKEN_ENV = "TRELLO_TOKEN";

/** Trello's description from Atlassian's developer site; its endpoints name OAuth scopes, which the key and token serve as well. */
export const TRELLO_SOURCES: OpenApiSource[] = [
  {
    name: "rest",
    url: "https://developer.atlassian.com/cloud/trello/swagger.v3.json",
    basePath: "",
  },
];

export const TRELLO_BASE: Omit<Manifest, "name" | "description" | "tools"> = {
  category: "orgs/atlassian",
  version: "1.0.0",
  baseUrl: "https://api.trello.com/1",
  headers: { Accept: "application/json" },
  auth: [
    {
      type: "query",
      name: "key",
      env: TRELLO_API_KEY_ENV,
      extra: [{ name: "token", env: TRELLO_TOKEN_ENV }],
      label: "API key + token",
      ui: defineUI({
        inputs: {
          [TRELLO_API_KEY_ENV]: {
            label: "API key",
            placeholder: "Paste the API key",
            secret: false,
            hint: "Create a Power-Up on trello.com/power-ups/admin and copy its API key; or set the TRELLO_API_KEY environment variable.",
          },
          [TRELLO_TOKEN_ENV]: {
            label: "Token",
            placeholder: "Paste the token",
            hint: "Generate it from the API key page with the Token link, with the access you need; or set the TRELLO_TOKEN environment variable.",
          },
        },
        actions: [
          {
            type: "link",
            label: "Open Power-Ups admin ↗",
            url: "https://trello.com/power-ups/admin",
          },
          {
            type: "link",
            label: "Authorization guide ↗",
            url: "https://developer.atlassian.com/cloud/trello/guides/rest-api/authorization/",
          },
        ],
      }),
    },
  ],
};
