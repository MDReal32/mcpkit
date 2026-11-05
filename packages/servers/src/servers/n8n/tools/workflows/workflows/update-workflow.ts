import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsUpdateWorkflow = defineTool({
  name: "workflows:workflows:update_workflow",
  description:
    "Update a workflow. Update a workflow. If the workflow is published, the updated version will be automatically re-published unless `publishIfActive` is set to `false`. Because that re-publication puts a new version live, it additionally requires the `workflow:activate` API key scope and the `workflow:publish` project permission. A caller without either can still save: the new version is stored as a draft and the res…",
  input: {
    type: "object",
    properties: {
      workflowId: {
        type: "string",
        description: "The ID of the workflow.",
      },
      publishIfActive: {
        type: "string",
        description:
          "Whether to publish the update if the workflow is currently published. Set to `false` to save the change as a draft on the existing published version instead of releasing it. Has no effect on a workflow that isn't currently published.",
        default: "true",
        enum: ["true", "false"],
      },
      id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      active: {
        type: "boolean",
        description: "Deprecated. Check whether `activeVersionId` is not null instead.",
      },
      activeVersionId: {
        type: "string",
      },
      createdAt: {
        type: "string",
      },
      updatedAt: {
        type: "string",
      },
      isArchived: {
        type: "boolean",
      },
      versionId: {
        type: "string",
        description: "Current version identifier used for optimistic locking",
      },
      triggerCount: {
        type: "integer",
        description: "Number of active trigger nodes in the workflow",
      },
      nodes: {
        type: "array",
        description: "Nodes that make up the workflow",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            webhookId: {
              type: "string",
            },
            disabled: {
              type: "boolean",
            },
            notesInFlow: {
              type: "boolean",
            },
            notes: {
              type: "string",
            },
            type: {
              type: "string",
            },
            typeVersion: {
              type: "number",
            },
            executeOnce: {
              type: "boolean",
            },
            alwaysOutputData: {
              type: "boolean",
            },
            retryOnFail: {
              type: "boolean",
            },
            maxTries: {
              type: "number",
            },
            waitBetweenTries: {
              type: "number",
            },
            continueOnFail: {
              type: "boolean",
              description: "use onError instead",
            },
            onError: {
              type: "string",
            },
            position: {
              type: "array",
              items: {
                type: "number",
              },
            },
            parameters: {
              type: "object",
            },
            credentials: {
              type: "object",
            },
            customTelemetryTags: {
              type: "object",
            },
            extendsCredential: {
              type: "string",
            },
            createdAt: {
              type: "string",
            },
            updatedAt: {
              type: "string",
            },
          },
        },
      },
      connections: {
        type: "object",
        description: "Connections between nodes, keyed by source node name",
      },
      settings: {
        type: "object",
        properties: {
          saveExecutionProgress: {
            type: "boolean",
          },
          saveManualExecutions: {
            type: "boolean",
          },
          saveDataErrorExecution: {
            type: "string",
            enum: ["all", "none"],
          },
          saveDataSuccessExecution: {
            type: "string",
            enum: ["all", "none"],
          },
          executionTimeout: {
            type: "number",
          },
          errorWorkflow: {
            type: "string",
            description: "The ID of the workflow that contains the error trigger node.",
          },
          timezone: {
            type: "string",
          },
          executionOrder: {
            type: "string",
          },
          binaryMode: {
            type: "string",
            description:
              "Controls how binary data is resolved from a node's input. This is a derived, internal setting rather than something intended to be set programmatically. It is included in workflow responses for reference, but any value sent when creating or updating a workflow is ignored.",
            enum: ["separate", "combined"],
          },
          engineType: {
            type: "string",
            description:
              "The execution engine that runs this workflow. It is included in workflow responses for reference, but any value sent when creating or updating a workflow is ignored.",
          },
          callerPolicy: {
            type: "string",
            description:
              "Controls which workflows are allowed to call this workflow using the Execute Workflow node. Defaults to workflowsFromSameOwner.",
            enum: ["any", "none", "workflowsFromAList", "workflowsFromSameOwner"],
          },
          callerIds: {
            type: "string",
            description:
              "Comma-separated list of workflow IDs allowed to call this workflow (only used with the workflowsFromAList policy)",
          },
          timeSavedMode: {
            type: "string",
            description: "Controls how the time saved per execution is calculated.",
            enum: ["fixed", "dynamic"],
          },
          timeSavedPerExecution: {
            type: "number",
            description: "Estimated time saved per execution in minutes",
          },
          redactionPolicy: {
            type: "string",
            description: "Controls whether execution data is redacted for this workflow.",
            enum: ["none", "non-manual", "manual-only", "all"],
          },
          redactCallerExecutions: {
            type: "boolean",
            description:
              "Controls whether a workflow that calls this workflow as a sub-workflow has its executions redacted on the same channels as this workflow. The calling execution keeps a copy of the output of this workflow. Defaults to true. Turn it off only when the output of this workflow is not sensitive. Redaction that this workflow received from its own sub-workflows always passes to the caller.",
          },
          availableInMCP: {
            type: "boolean",
            description:
              "Controls whether this workflow is reachable over the Model Context Protocol (MCP). Defaults to false. The workflow must be active and must hold at least one active Webhook node.",
          },
          customTelemetryTags: {
            type: "array",
            items: {
              type: "object",
            },
          },
          credentialResolverId: {
            type: "string",
            description:
              "ID of the credential resolver that resolves credentials for this workflow. This is a derived, internal setting managed through the credential resolver configuration rather than something intended to be set programmatically. It is included in workflow responses for reference, but any value sent when creating or updating a workflow is ignored.",
          },
        },
      },
      nodeGroups: {
        type: "array",
        description: "Visual groupings of nodes shown as frames on the canvas",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the node group",
            },
            name: {
              type: "string",
              description: "Display name of the node group",
            },
            description: {
              type: "string",
              description: "Optional plain-text description of the node group",
            },
            nodeIds: {
              type: "array",
              description: "IDs of the nodes that belong to this group",
              items: {
                type: "string",
              },
            },
          },
          required: ["id", "name", "nodeIds"],
        },
      },
      staticData: {
        type: "object",
        description: "Data the workflow keeps between executions",
      },
      pinData: {
        type: "object",
        description: "Pinned sample data for nodes, keyed by node name",
      },
      parentFolderId: {
        type: "string",
        description:
          "ID of the folder to move the workflow into. Pass null to move it to the project root; omit to leave its current folder unchanged.",
      },
      meta: {
        type: "object",
        description: "Workflow metadata such as template information",
        properties: {
          onboardingId: {
            type: "string",
          },
          templateId: {
            type: "string",
          },
          instanceId: {
            type: "string",
          },
          templateCredsSetupCompleted: {
            type: "boolean",
          },
        },
      },
      tags: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            createdAt: {
              type: "string",
            },
            updatedAt: {
              type: "string",
            },
          },
          required: ["name"],
        },
      },
      shared: {
        type: "array",
        description: "Accepted for compatibility and ignored. The owner share is derived from the target project.",
        items: {
          type: "object",
          properties: {
            role: {
              type: "string",
            },
            workflowId: {
              type: "string",
            },
            projectId: {
              type: "string",
            },
            project: {
              type: "object",
            },
            createdAt: {
              type: "string",
            },
            updatedAt: {
              type: "string",
            },
          },
        },
      },
      activeVersion: {
        type: "object",
        properties: {
          versionId: {
            type: "string",
            description: "Unique identifier for this workflow version",
          },
          workflowId: {
            type: "string",
            description: "The workflow this version belongs to",
          },
          nodes: {
            type: "array",
            description: "Nodes that make up the workflow",
            items: {
              type: "object",
            },
          },
          connections: {
            type: "object",
            description: "Connections between nodes, keyed by source node name",
          },
          nodeGroups: {
            type: "array",
            description: "Visual groupings of nodes shown as frames on the canvas",
            items: {
              type: "object",
            },
          },
          authors: {
            type: "string",
            description: "Comma-separated list of author IDs who contributed to this version",
          },
          name: {
            type: "string",
            description: "Optional name for this workflow version",
          },
          description: {
            type: "string",
            description: "Optional description for this workflow version",
          },
          autosaved: {
            type: "boolean",
            description: "Whether this version was created by autosave",
          },
          createdAt: {
            type: "string",
          },
          updatedAt: {
            type: "string",
          },
        },
      },
      description: {
        type: "string",
        description: "Description of the workflow",
      },
    },
    required: ["workflowId", "name", "nodes", "connections", "settings"],
  },
  request: {
    method: "PUT",
    path: "/workflows/{workflowId}",
    query: ["publishIfActive"],
    body: [
      "id",
      "name",
      "active",
      "activeVersionId",
      "createdAt",
      "updatedAt",
      "isArchived",
      "versionId",
      "triggerCount",
      "nodes",
      "connections",
      "settings",
      "nodeGroups",
      "staticData",
      "pinData",
      "parentFolderId",
      "meta",
      "tags",
      "shared",
      "activeVersion",
      "description",
    ],
  },
});
