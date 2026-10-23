import { defineTool } from "@usemcpkit/core";

export const aiCodeSuggestionsCreateCodeSuggestionsCompletions = defineTool({
  name: "ai:code_suggestions:create_code_suggestions_completions",
  description:
    "Generate code completions. Generates code completions. Uses the AI abstraction layer to generate code completions. Requests to this endpoint are proxied to the AI Gateway.",
  input: {
    type: "object",
    properties: {
      current_file: {
        type: "object",
        description: "Attributes of the file that suggestions are generated for.",
        properties: {
          file_name: {
            type: "string",
            description: "Name of the current file.",
          },
          content_above_cursor: {
            type: "string",
            description: "Content above cursor.",
          },
          content_below_cursor: {
            type: "string",
            description: "Content below cursor.",
          },
        },
        required: ["file_name", "content_above_cursor"],
      },
      intent: {
        type: "string",
        description: "Intent of the completion request.",
        enum: ["completion", "generation"],
      },
      generation_type: {
        type: "string",
        description: "Type of event for generation requests.",
        enum: ["comment", "empty_function", "small_file"],
      },
      stream: {
        type: "boolean",
        description: "If `true`, streams the response as smaller chunks as they are ready, if applicable.",
        default: false,
      },
      project_path: {
        type: "string",
        description: "Path of the project.",
      },
      user_instruction: {
        type: "string",
        description:
          "User's instructions for Code Suggestions. Generally available in GitLab 18.6. Feature flag `code_suggestions_context` removed.",
      },
      context: {
        type: "array",
        description:
          "Additional context to use for Code Suggestions. Generally available in GitLab 18.6. Feature flag `code_suggestions_context` removed.",
        items: {
          type: "object",
          properties: {
            type: {
              type: "string",
              description: "Type of the context part.",
              enum: ["file", "snippet"],
            },
            name: {
              type: "string",
              description: "Name of the context part.",
            },
            content: {
              type: "string",
              description: "Content of the context part.",
            },
          },
          required: ["type", "name", "content"],
        },
      },
    },
    required: ["current_file"],
  },
  request: {
    method: "POST",
    path: "/code_suggestions/completions",
    body: ["current_file", "intent", "generation_type", "stream", "project_path", "user_instruction", "context"],
  },
});
