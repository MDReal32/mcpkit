import { defineTool } from "@usemcpkit/core";

export const settingsOtelGetOtelSettings = defineTool({
  name: "settings:otel:get_otel_settings",
  description:
    "Retrieve the OpenTelemetry configuration. Retrieve the current OpenTelemetry configuration, including every field exposed in the UI. Requires the `otel:manage` scope.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/settings/otel",
  },
});
