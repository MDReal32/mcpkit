import { createFileSecretStore } from "@usemcpkit/core";
import { createCredentialsForm } from "@usemcpkit/credentials-form";
import { createUsageReporter } from "../../analytics";
import type { McpOptions } from "../../mcp";
import { VERSION } from "../../version";
import { credentialsFormPage } from "../browser/credentials-form-page";
import { announceAuthorizationUrl } from "../output/announce-authorization-url";
import { announceCredentialsFormUrl } from "../output/announce-credentials-form-url";
import { printError } from "../output/print-error";

export const createServeOptions = () => {
  const requestCredentials = createCredentialsForm({ page: credentialsFormPage, onUrl: announceCredentialsFormUrl });
  const options: McpOptions = {
    onAuthorizationUrl: announceAuthorizationUrl,
    projectDir: process.cwd(),
    secretStore: createFileSecretStore(),
    requestCredentials,
    onWarning: printError,
    onToolUse: createUsageReporter({ env: process.env, version: VERSION, os: process.platform }),
  };
  return options;
};
