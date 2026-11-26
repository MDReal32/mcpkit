import { defineServer } from "@usemcpkit/core";
import { buildLogFiles } from "./build-log-files";
import {
  JETBRAINS_CATEGORY,
  JETBRAINS_HOST_HINT,
  JETBRAINS_LOG_PORT_PATTERN,
  JETBRAINS_LOOPBACK_HOST,
  JETBRAINS_MCP_PATH,
  JETBRAINS_MCP_PORT_ENV,
} from "./const";
import type { JetBrainsIde } from "./jetbrains-ide";

export const defineJetBrainsIde = ({ name, productName, logFolder }: JetBrainsIde) =>
  defineServer({
    name,
    category: JETBRAINS_CATEGORY,
    version: "1.0.0",
    description: `${productName} through the MCP server built into the IDE (2025.2 or later, switched on under Settings → Tools → MCP Server), reached on the local port the running IDE picked, which usemcpkit reads from the IDE's own log. The tools are the IDE's: reading, creating and searching project files, code problems and linting, refactorings, run configurations and builds, the terminal, version control, and whatever the installed plugins add. They act on the projects open in the IDE and need it to be running.`,
    baseUrl: "https://{domain}",
    domain: {
      label: "IDE MCP server",
      hint: JETBRAINS_HOST_HINT,
      placeholder: `${JETBRAINS_LOOPBACK_HOST}:64342`,
      loopbackHttp: true,
      discover: {
        host: JETBRAINS_LOOPBACK_HOST,
        ports: [
          { type: "env", name: JETBRAINS_MCP_PORT_ENV },
          { type: "log", files: buildLogFiles(logFolder), pattern: JETBRAINS_LOG_PORT_PATTERN },
        ],
      },
    },
    upstream: { type: "http", url: `https://{domain}${JETBRAINS_MCP_PATH}` },
    tools: [],
  });
