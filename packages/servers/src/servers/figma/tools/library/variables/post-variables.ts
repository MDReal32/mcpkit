import { defineTool } from "@usemcpkit/core";

export const libraryVariablesPostVariables = defineTool({
  name: "library:variables:post_variables",
  description:
    "Create/modify/delete variables. **This API is available to full members of Enterprise orgs with Editor seats.**",
  input: {
    type: "object",
    properties: {
      file_key: {
        type: "string",
        description:
          "File to modify variables in. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.",
      },
      variableCollections: {
        type: "array",
        description: "For creating, updating, and deleting variable collections.",
        items: {
          type: "object",
          properties: {
            action: {
              type: "string",
              description: "The action to perform for the variable collection.",
              enum: ["DELETE"],
            },
            id: {
              type: "string",
              description: "The id of the variable collection to delete.",
            },
            name: {
              type: "string",
              description: "The name of this variable collection.",
            },
            initialModeId: {
              type: "string",
              description:
                "The initial mode refers to the mode that is created by default. You can set a temporary id here, in order to reference this mode later in this request.",
            },
            hiddenFromPublishing: {
              type: "boolean",
              description: "Whether this variable collection is hidden when publishing the current file as a library.",
              default: false,
            },
            parentVariableCollectionId: {
              type: "string",
              description: "The id of the parent variable collection that this variable collection is extending from.",
            },
            initialModeIdToParentModeIdMapping: {
              type: "object",
              description:
                "Maps inherited modes from the parent variable collection to the initial mode ids on the extended variable collection.",
            },
          },
          required: ["action"],
        },
      },
      variableModes: {
        type: "array",
        description: "For creating, updating, and deleting modes within variable collections.",
        items: {
          type: "object",
          properties: {
            action: {
              type: "string",
              description: "The action to perform for the variable mode.",
              enum: ["DELETE"],
            },
            id: {
              type: "string",
              description:
                "The id of the variable mode to delete. Modes cannot be deleted on extended collections unless its parent mode has been deleted.",
            },
            name: {
              type: "string",
              description: "The name of this variable mode.",
            },
            variableCollectionId: {
              type: "string",
              description:
                "The variable collection that contains the mode. Modes cannot be updated on extended collections.",
            },
          },
          required: ["action"],
        },
      },
      variables: {
        type: "array",
        description: "For creating, updating, and deleting variables.",
        items: {
          type: "object",
          properties: {
            action: {
              type: "string",
              description: "The action to perform for the variable.",
              enum: ["DELETE"],
            },
            id: {
              type: "string",
              description: "The id of the variable to delete.",
            },
            name: {
              type: "string",
              description: "The name of this variable.",
            },
            variableCollectionId: {
              type: "string",
              description:
                "The variable collection that will contain the variable. You can use the temporary id of a variable collection.",
            },
            resolvedType: {
              type: "string",
              description: "Defines the types of data a VariableData object can eventually equal",
              enum: ["BOOLEAN", "FLOAT", "STRING", "COLOR"],
            },
            description: {
              type: "string",
              description: "The description of this variable.",
            },
            hiddenFromPublishing: {
              type: "boolean",
              description: "Whether this variable is hidden when publishing the current file as a library.",
              default: false,
            },
            scopes: {
              type: "array",
              description:
                "An array of scopes in the UI where this variable is shown. Setting this property will show/hide this variable in the variable picker UI for different fields.",
              items: {
                type: "string",
                description:
                  "Scopes allow a variable to be shown or hidden in the variable picker for various fields. This declutters the Figma UI if you have a large number of variables. Variable scopes are currently supported on `FLOAT`, `STRING`, and `COLOR` variables.",
                enum: [
                  "ALL_SCOPES",
                  "TEXT_CONTENT",
                  "CORNER_RADIUS",
                  "WIDTH_HEIGHT",
                  "GAP",
                  "ALL_FILLS",
                  "FRAME_FILL",
                  "SHAPE_FILL",
                  "TEXT_FILL",
                  "STROKE_COLOR",
                  "STROKE_FLOAT",
                  "EFFECT_FLOAT",
                  "EFFECT_COLOR",
                  "OPACITY",
                  "COLOR_OPACITY",
                  "FONT_FAMILY",
                  "FONT_STYLE",
                  "FONT_WEIGHT",
                  "FONT_SIZE",
                  "LINE_HEIGHT",
                  "LETTER_SPACING",
                  "PARAGRAPH_SPACING",
                  "PARAGRAPH_INDENT",
                  "FONT_VARIATIONS",
                ],
              },
            },
            codeSyntax: {
              type: "object",
              description:
                "An object containing platform-specific code syntax definitions for a variable. All platforms are optional.",
            },
          },
          required: ["action"],
        },
      },
      variableModeValues: {
        type: "array",
        description: "For setting a specific value, given a variable and a mode.",
        items: {
          type: "object",
          description: "An object that represents a value for a given mode of a variable. All properties are required.",
          properties: {
            variableId: {
              type: "string",
              description: "The target variable. You can use the temporary id of a variable.",
            },
            modeId: {
              type: "string",
              description: "Must correspond to a mode in the variable collection that contains the target variable.",
            },
            value: {
              type: "object",
              description:
                "The value for the variable. The value must match the variable's type. If setting to a variable alias, the alias must resolve to this type. If overriding a value, the value type must match the variable's type. If removing an overridden value, the value must be `null`.",
            },
          },
          required: ["variableId", "modeId", "value"],
        },
      },
    },
    required: ["file_key"],
  },
  request: {
    method: "POST",
    path: "/v1/files/{file_key}/variables",
    body: ["variableCollections", "variableModes", "variables", "variableModeValues"],
  },
});
