import { defineTool } from "@usemcpkit/core";

export const settingsLogStreamingUpdateLogStreamingDestination = defineTool({
  name: "settings:log_streaming:update_log_streaming_destination",
  description:
    "Update a log streaming destination. Replace an existing log streaming destination. The update takes effect exactly as it would from the UI, using the same validation. Requires the `eventBusDestination:update` scope and the Log Streaming feature to be licensed. When destinations are managed via environment variables, the write is rejected with 409 and nothing is changed; reads still return the current values.",
  input: {
    type: "object",
    properties: {
      destinationId: {
        type: "string",
        description: "The id of the log streaming destination.",
      },
      label: {
        type: "string",
        description: "Human-readable name shown in the UI.",
      },
      enabled: {
        type: "boolean",
        description: "Whether the destination currently receives events.",
      },
      subscribedEvents: {
        type: "array",
        description:
          "Event names (or group prefixes, e.g. `n8n.workflow`, which matches all `n8n.workflow.*` events) this destination receives. Retrieve the full list of streamable event names from `GET /settings/log-streaming/event-types`.",
        items: {
          type: "string",
        },
      },
      anonymizeAuditMessages: {
        type: "boolean",
        description: "Whether audit message payloads are anonymized before being sent.",
      },
      circuitBreaker: {
        type: "object",
        description:
          "Circuit-breaker tuning for delivery. After repeated failures the destination stops sending for a cool-down window instead of hammering an unhealthy target. All fields are optional; sensible defaults apply when omitted.",
        properties: {
          maxFailures: {
            type: "integer",
            description: "Maximum failures within the sliding window before the breaker opens.",
          },
          failureWindow: {
            type: "integer",
            description: "Sliding window, in milliseconds, over which failures are counted.",
          },
        },
      },
      type: {
        type: "string",
        description: "Sends each event to a Sentry project.",
        enum: ["sentry"],
      },
      url: {
        type: "string",
        description: "Target URL that receives the event payload.",
      },
      method: {
        type: "string",
        description: "HTTP method used for the request.",
      },
      sendHeaders: {
        type: "boolean",
        description: "Whether to attach custom headers to the request.",
      },
      specifyHeaders: {
        type: "string",
        description: "How custom headers are provided — `keypair` or `json`.",
      },
      headerParameters: {
        type: "object",
        description: "Key-value pairs used when the matching `specify*` field is `keypair`.",
        properties: {
          parameters: {
            type: "array",
            items: {
              type: "object",
            },
          },
        },
        required: ["parameters"],
      },
      jsonHeaders: {
        type: "string",
        description: "Custom headers as a JSON string when `specifyHeaders` is `json`.",
      },
      sendQuery: {
        type: "boolean",
        description: "Whether to attach query parameters to the request.",
      },
      specifyQuery: {
        type: "string",
        description: "How query parameters are provided — `keypair` or `json`.",
      },
      queryParameters: {
        type: "object",
        description: "Key-value pairs used when the matching `specify*` field is `keypair`.",
        properties: {
          parameters: {
            type: "array",
            items: {
              type: "object",
            },
          },
        },
        required: ["parameters"],
      },
      jsonQuery: {
        type: "string",
        description: "Query parameters as a JSON string when `specifyQuery` is `json`.",
      },
      options: {
        type: "object",
        description: "Additional HTTP request options.",
        properties: {
          timeout: {
            type: "integer",
            description: "Request timeout in milliseconds.",
          },
          allowUnauthorizedCerts: {
            type: "boolean",
            description: "Accept self-signed or otherwise invalid TLS certificates.",
          },
          queryParameterArrays: {
            type: "string",
            description: "How array-valued query parameters are serialized into the query string.",
            enum: ["indices", "brackets", "repeat"],
          },
          redirect: {
            type: "object",
            description: "Redirect-following behaviour.",
            properties: {
              redirect: {
                type: "object",
              },
            },
            required: ["redirect"],
          },
          proxy: {
            type: "object",
            description: "Outbound proxy configuration.",
            properties: {
              proxy: {
                type: "object",
              },
            },
            required: ["proxy"],
          },
          socket: {
            type: "object",
            description: "Connection socket options.",
            properties: {
              keepAlive: {
                type: "boolean",
                description: "Whether to keep sockets open for reuse.",
              },
              maxSockets: {
                type: "integer",
                description: "Maximum sockets per host kept open at once.",
              },
              maxFreeSockets: {
                type: "integer",
                description: "Maximum idle sockets per host kept open.",
              },
            },
          },
        },
      },
      host: {
        type: "string",
        description: "Syslog server host.",
      },
      port: {
        type: "integer",
        description: "Syslog server port.",
      },
      protocol: {
        type: "string",
        description: "Transport protocol.",
        enum: ["udp", "tcp", "tls"],
      },
      facility: {
        type: "integer",
        description:
          "Syslog facility code (0–23, per RFC 5424). Common values: 0 Kernel, 1 User, 3 System, 13 Audit, 14 Alert, 16 Local0, 17 Local1, 18 Local2, 19 Local3, 20 Local4, 21 Local5, 22 Local6, 23 Local7.",
      },
      app_name: {
        type: "string",
        description: "Application name reported in the syslog message.",
      },
      tlsCa: {
        type: "string",
        description: "PEM-encoded CA certificate used when `protocol` is `tls`.",
      },
      dsn: {
        type: "string",
        description: "Sentry DSN the events are sent to.",
      },
    },
    required: ["destinationId", "type"],
  },
  request: {
    method: "PUT",
    path: "/settings/log-streaming/destinations/{destinationId}",
    body: [
      "label",
      "enabled",
      "subscribedEvents",
      "anonymizeAuditMessages",
      "circuitBreaker",
      "type",
      "url",
      "method",
      "sendHeaders",
      "specifyHeaders",
      "headerParameters",
      "jsonHeaders",
      "sendQuery",
      "specifyQuery",
      "queryParameters",
      "jsonQuery",
      "options",
      "host",
      "port",
      "protocol",
      "facility",
      "app_name",
      "tlsCa",
      "dsn",
    ],
  },
});
