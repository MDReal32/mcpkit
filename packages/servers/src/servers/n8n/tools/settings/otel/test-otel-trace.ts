import { defineTool } from "@usemcpkit/core";

export const settingsOtelTestOtelTrace = defineTool({
  name: "settings:otel:test_otel_trace",
  description:
    "Test the connection to an OTLP collector. Send a single test span to the given OTLP collector and report whether it was accepted. This tests the supplied connection details without changing the stored configuration. Fields managed declaratively via environment variables are overridden with their effective value before the test is sent. Requires the `otel:manage` scope.",
  input: {
    type: "object",
    properties: {
      exporterProtocol: {
        type: "string",
        description:
          "The wire protocol used to send the test span. Collectors conventionally serve OTLP/HTTP on port 4318 and OTLP/gRPC on port 4317. The endpoint scheme (`http://` or `https://`) controls TLS for both protocols. Optional: omitting it selects `http/protobuf`, unless an environment variable manages this field, which then supplies the value.",
        default: "http/protobuf",
        enum: ["http/protobuf", "grpc"],
      },
      exporterEndpoint: {
        type: "string",
        description:
          "The base URL of the OTLP collector to export traces to. The value must be an `http://` or `https://` URL, because the scheme selects TLS — for gRPC, `https://` uses SSL and `http://` is plaintext.",
      },
      exporterTracingPath: {
        type: "string",
        description:
          "The path appended to the endpoint for the OTLP traces signal. Ignored when `exporterProtocol` is `grpc`, which takes no URL path.",
      },
      exporterServiceName: {
        type: "string",
        description: "The `service.name` resource attribute reported on the test span.",
      },
      exporterHeaders: {
        type: "string",
        description:
          "Additional headers sent to the OTLP collector, as a single string of comma-separated `key=value` pairs (e.g. `authorization=Bearer my-token,x-tenant-id=acme`). Whitespace around each key and value is trimmed; a value may contain spaces but not commas. Use an empty string when unused.",
      },
      startupConnectivityTimeoutMs: {
        type: "integer",
        description: "How long, in milliseconds, to wait for the collector to respond.",
      },
    },
    required: [
      "exporterEndpoint",
      "exporterTracingPath",
      "exporterServiceName",
      "exporterHeaders",
      "startupConnectivityTimeoutMs",
    ],
  },
  request: {
    method: "POST",
    path: "/settings/otel/test-trace",
    body: [
      "exporterProtocol",
      "exporterEndpoint",
      "exporterTracingPath",
      "exporterServiceName",
      "exporterHeaders",
      "startupConnectivityTimeoutMs",
    ],
  },
});
