import type { Manifest } from "@usemcpkit/core";
import { defineUI } from "@usemcpkit/core";

export const REDDIT_TOKEN_ENV = "REDDIT_ACCESS_TOKEN";

/** Reddit rejects requests without a descriptive User-Agent in the `<platform>:<app id>:<version>` form. */
export const REDDIT_USER_AGENT = "mcpkit:communication.reddit:1.0.0 (+https://github.com/MDReal32/mcpkit)";

export const REDDIT_BASE: Omit<Manifest, "name" | "description" | "tools"> = {
  category: "communication",
  version: "1.0.0",
  baseUrl: "https://oauth.reddit.com",
  headers: {
    Accept: "application/json",
    "User-Agent": REDDIT_USER_AGENT,
  },
  auth: [
    {
      type: "bearer",
      env: REDDIT_TOKEN_ENV,
      label: "Access token",
      ui: defineUI({
        inputs: {
          [REDDIT_TOKEN_ENV]: {
            label: "Access token",
            placeholder: "eyJhbGciOi…",
            hint: "An OAuth access token from your Reddit app (scopes read, identity; it lasts 24 hours); or set the REDDIT_ACCESS_TOKEN environment variable.",
          },
        },
        actions: [
          {
            type: "link",
            label: "Open your Reddit apps ↗",
            url: "https://www.reddit.com/prefs/apps",
          },
          {
            type: "link",
            label: "OAuth guide ↗",
            url: "https://github.com/reddit-archive/reddit/wiki/OAuth2",
          },
        ],
      }),
    },
  ],
};
