import { defineTool } from "@usemcpkit/core";

export const datacenterContentCreatePropertyByKey = defineTool({
  name: "datacenter:content:create_property_by_key",
  description: "[Data Center] ",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      key: {
        type: "string",
      },
      body_key: {
        type: "string",
      },
      value: {
        type: "object",
        properties: {
          value: {
            type: "string",
          },
        },
      },
      version: {
        type: "object",
        properties: {
          by: {
            type: "object",
          },
          when: {
            type: "string",
          },
          message: {
            type: "string",
          },
          number: {
            type: "integer",
          },
          minorEdit: {
            type: "boolean",
          },
          hidden: {
            type: "boolean",
          },
          syncRev: {
            type: "string",
          },
          content: {
            type: "object",
          },
          contentRef: {
            type: "object",
          },
        },
      },
      body_id: {
        type: "string",
      },
      content: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          type: {
            type: "string",
          },
          status: {
            type: "string",
          },
          title: {
            type: "string",
          },
          links: {
            type: "object",
          },
          space: {
            type: "object",
          },
          history: {
            type: "object",
          },
          version: {
            type: "object",
          },
          ancestors: {
            type: "array",
            items: {},
          },
          position: {
            type: "integer",
          },
          operations: {
            type: "array",
            items: {
              type: "object",
            },
          },
          children: {
            type: "object",
          },
          descendants: {
            type: "object",
          },
          container: {},
          body: {
            type: "object",
          },
          metadata: {
            type: "object",
          },
          extensions: {
            type: "object",
          },
          restrictions: {
            type: "object",
          },
          relevantViewRestrictions: {
            type: "object",
          },
          extractedTextLink: {
            type: "string",
          },
          historyRef: {
            type: "object",
          },
          spaceRef: {
            type: "object",
          },
          containerRef: {
            type: "object",
          },
          versionRef: {
            type: "object",
          },
        },
      },
      contentRef: {
        type: "object",
        properties: {
          idProperties: {
            type: "object",
          },
          expanded: {
            type: "boolean",
          },
        },
      },
      _links: {
        type: "object",
        properties: {
          base: {
            type: "string",
          },
          context: {
            type: "string",
          },
          self: {
            type: "string",
          },
        },
      },
      _expandable: {
        type: "object",
        properties: {
          attribute: {
            type: "string",
          },
        },
      },
    },
    required: ["id", "key"],
  },
  request: {
    method: "POST",
    path: "/rest/api/content/{id}/property/{key}",
    body: {
      key: "body_key",
      value: "value",
      version: "version",
      id: "body_id",
      content: "content",
      contentRef: "contentRef",
      _links: "_links",
      _expandable: "_expandable",
    },
  },
});
