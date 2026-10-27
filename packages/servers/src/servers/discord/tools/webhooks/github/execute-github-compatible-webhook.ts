import { defineTool } from "@usemcpkit/core";

export const webhooksGithubExecuteGithubCompatibleWebhook = defineTool({
  name: "webhooks:github:execute_github_compatible_webhook",
  description: "",
  input: {
    type: "object",
    properties: {
      webhook_id: {
        type: "string",
      },
      webhook_token: {
        type: "string",
      },
      wait: {
        type: "boolean",
      },
      thread_id: {
        type: "string",
      },
      action: {
        type: "string",
      },
      ref: {
        type: "string",
      },
      ref_type: {
        type: "string",
      },
      comment: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          html_url: {
            type: "string",
          },
          user: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              login: {
                type: "string",
              },
              html_url: {
                type: "string",
              },
              avatar_url: {
                type: "string",
              },
            },
            required: ["id", "login", "html_url", "avatar_url"],
          },
          commit_id: {
            type: "string",
          },
          body: {
            type: "string",
          },
        },
      },
      issue: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          number: {
            type: "integer",
          },
          html_url: {
            type: "string",
          },
          user: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              login: {
                type: "string",
              },
              html_url: {
                type: "string",
              },
              avatar_url: {
                type: "string",
              },
            },
            required: ["id", "login", "html_url", "avatar_url"],
          },
          title: {
            type: "string",
          },
          body: {
            type: "string",
          },
          pull_request: {},
        },
      },
      pull_request: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          number: {
            type: "integer",
          },
          html_url: {
            type: "string",
          },
          user: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              login: {
                type: "string",
              },
              html_url: {
                type: "string",
              },
              avatar_url: {
                type: "string",
              },
            },
            required: ["id", "login", "html_url", "avatar_url"],
          },
          title: {
            type: "string",
          },
          body: {
            type: "string",
          },
          pull_request: {},
        },
      },
      repository: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          html_url: {
            type: "string",
          },
          name: {
            type: "string",
          },
          full_name: {
            type: "string",
          },
        },
      },
      forkee: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          html_url: {
            type: "string",
          },
          name: {
            type: "string",
          },
          full_name: {
            type: "string",
          },
        },
      },
      sender: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          login: {
            type: "string",
          },
          html_url: {
            type: "string",
          },
          avatar_url: {
            type: "string",
          },
        },
        required: ["id", "login", "html_url", "avatar_url"],
      },
      member: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          login: {
            type: "string",
          },
          html_url: {
            type: "string",
          },
          avatar_url: {
            type: "string",
          },
        },
      },
      release: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          tag_name: {
            type: "string",
          },
          html_url: {
            type: "string",
          },
          author: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              login: {
                type: "string",
              },
              html_url: {
                type: "string",
              },
              avatar_url: {
                type: "string",
              },
            },
            required: ["id", "login", "html_url", "avatar_url"],
          },
        },
      },
      head_commit: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          url: {
            type: "string",
          },
          message: {
            type: "string",
          },
          author: {
            type: "object",
            properties: {
              username: {
                type: "string",
              },
              name: {
                type: "string",
              },
            },
            required: ["name"],
          },
        },
      },
      commits: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            url: {
              type: "string",
            },
            message: {
              type: "string",
            },
            author: {
              type: "object",
            },
          },
          required: ["id", "url", "message", "author"],
        },
      },
      forced: {
        type: "boolean",
      },
      compare: {
        type: "string",
      },
      review: {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              login: {
                type: "string",
              },
              html_url: {
                type: "string",
              },
              avatar_url: {
                type: "string",
              },
            },
            required: ["id", "login", "html_url", "avatar_url"],
          },
          body: {
            type: "string",
          },
          html_url: {
            type: "string",
          },
          state: {
            type: "string",
          },
        },
      },
      check_run: {
        type: "object",
        properties: {
          conclusion: {
            type: "string",
          },
          name: {
            type: "string",
          },
          html_url: {
            type: "string",
          },
          check_suite: {
            type: "object",
            properties: {
              conclusion: {
                type: "string",
              },
              head_branch: {
                type: "string",
              },
              head_sha: {
                type: "string",
              },
              pull_requests: {
                type: "array",
                items: {
                  type: "object",
                },
              },
              app: {
                type: "object",
              },
            },
            required: ["head_sha", "app"],
          },
          details_url: {
            type: "string",
          },
          output: {
            type: "object",
            properties: {
              title: {
                type: "string",
              },
              summary: {
                type: "string",
              },
            },
          },
          pull_requests: {
            type: "array",
            items: {
              type: "object",
            },
          },
        },
      },
      check_suite: {
        type: "object",
        properties: {
          conclusion: {
            type: "string",
          },
          head_branch: {
            type: "string",
          },
          head_sha: {
            type: "string",
          },
          pull_requests: {
            type: "array",
            items: {
              type: "object",
            },
          },
          app: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
            },
            required: ["name"],
          },
        },
      },
      discussion: {
        type: "object",
        properties: {
          title: {
            type: "string",
          },
          number: {
            type: "integer",
          },
          html_url: {
            type: "string",
          },
          answer_html_url: {
            type: "string",
          },
          body: {
            type: "string",
          },
          user: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              login: {
                type: "string",
              },
              html_url: {
                type: "string",
              },
              avatar_url: {
                type: "string",
              },
            },
            required: ["id", "login", "html_url", "avatar_url"],
          },
        },
      },
      answer: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          html_url: {
            type: "string",
          },
          user: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              login: {
                type: "string",
              },
              html_url: {
                type: "string",
              },
              avatar_url: {
                type: "string",
              },
            },
            required: ["id", "login", "html_url", "avatar_url"],
          },
          commit_id: {
            type: "string",
          },
          body: {
            type: "string",
          },
        },
      },
    },
    required: ["webhook_id", "webhook_token", "sender"],
  },
  request: {
    method: "POST",
    path: "/webhooks/{webhook_id}/{webhook_token}/github",
    query: ["wait", "thread_id"],
    body: [
      "action",
      "ref",
      "ref_type",
      "comment",
      "issue",
      "pull_request",
      "repository",
      "forkee",
      "sender",
      "member",
      "release",
      "head_commit",
      "commits",
      "forced",
      "compare",
      "review",
      "check_run",
      "check_suite",
      "discussion",
      "answer",
    ],
  },
});
