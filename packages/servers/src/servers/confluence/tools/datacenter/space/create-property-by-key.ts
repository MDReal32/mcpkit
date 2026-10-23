import { defineTool } from "@usemcpkit/core";

export const datacenterSpaceCreatePropertyByKey = defineTool({
  name: "datacenter:space:create_property_by_key",
  description:
    "[Data Center] Create a space property with a specific key. Create a space property with a specific key.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
      },
      key: {
        type: "string",
        description: "property key of the property to be created",
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
      space: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          key: {
            type: "string",
          },
          name: {
            type: "string",
          },
          status: {
            type: "string",
          },
          icon: {
            type: "object",
          },
          description: {
            type: "object",
          },
          homepage: {
            type: "object",
          },
          links: {
            type: "object",
          },
          type: {
            type: "string",
          },
          creator: {
            type: "object",
          },
          creationDate: {
            type: "string",
          },
          lastModifier: {
            type: "object",
          },
          lastModificationDate: {
            type: "string",
          },
          metadata: {
            type: "object",
          },
          retentionPolicy: {
            type: "object",
          },
          permissions: {
            type: "object",
          },
        },
      },
      spaceRef: {
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
    required: ["spaceKey", "key"],
  },
  request: {
    method: "POST",
    path: "/rest/api/space/{spaceKey}/property/{key}",
    body: {
      key: "body_key",
      value: "value",
      version: "version",
      space: "space",
      spaceRef: "spaceRef",
      _links: "_links",
      _expandable: "_expandable",
    },
  },
});
