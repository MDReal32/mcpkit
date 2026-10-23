import { defineTool } from '@usemcpkit/core';

export const reposGitCreateTag = defineTool({
  name: 'repos:git:create_tag',
  description:
    'Create a tag object. Note that creating a tag object does not create the reference that makes a tag in Git. If you want to create an annotated tag in Git, you have to do this call to create the tag object, and then create the `refs/tags/[tag]` reference. If you want to create a lightweight tag, you only have to create the tag reference - this call would be unnecessary.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      tag: {
        type: 'string',
        description: 'The tag\'s name. This is typically a version (e.g., "v0.0.1").',
      },
      message: {
        type: 'string',
        description: 'The tag message.',
      },
      object: {
        type: 'string',
        description: 'The SHA of the git object this is tagging.',
      },
      type: {
        type: 'string',
        description:
          "The type of the object we're tagging. Normally this is a `commit` but it can also be a `tree` or a `blob`.",
        enum: ['commit', 'tree', 'blob'],
      },
      tagger: {
        type: 'object',
        description: 'An object with information about the individual creating the tag.',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the author of the tag',
          },
          email: {
            type: 'string',
            description: 'The email of the author of the tag',
          },
          date: {
            type: 'string',
            description: 'When this object was tagged. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.',
          },
        },
        required: ['name', 'email'],
      },
    },
    required: ['owner', 'repo', 'tag', 'message', 'object', 'type'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/git/tags',
    body: ['tag', 'message', 'object', 'type', 'tagger'],
  },
});
