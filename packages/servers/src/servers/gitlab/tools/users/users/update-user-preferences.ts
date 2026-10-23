import { defineTool } from '@usemcpkit/core';

export const usersUsersUpdateUserPreferences = defineTool({
  name: 'users:users:update_user_preferences',
  description: 'Update your user preferences. Updates your user preferences.',
  input: {
    type: 'object',
    properties: {
      view_diffs_file_by_file: {
        type: 'boolean',
        description:
          'If `true`, the user sees only one file diff per page. At least one of `view_diffs_file_by_file`, `show_whitespace_in_diffs`, `pass_user_identities_to_ci_jwt`, `policy_advanced_editor`, `emoji_skin_tone` must be provided.',
      },
      show_whitespace_in_diffs: {
        type: 'boolean',
        description:
          'If `true`, the user sees whitespace changes in diffs. At least one of `view_diffs_file_by_file`, `show_whitespace_in_diffs`, `pass_user_identities_to_ci_jwt`, `policy_advanced_editor`, `emoji_skin_tone` must be provided.',
      },
      pass_user_identities_to_ci_jwt: {
        type: 'boolean',
        description:
          "If `true`, passes the user's external identities to CI jobs as part of a JSON web token. This attribute is internal to GitLab and must not be passed to third-party services. For more information, see Token Payload. At least one of `view_diffs_file_by_file`, `show_whitespace_in_diffs`, `pass_user_identities_to_ci_jwt`, `policy_advanced_editor`, `emoji_skin_tone` must be provided.",
      },
      policy_advanced_editor: {
        type: 'boolean',
        description:
          'If `true`, enables the advanced editor. At least one of `view_diffs_file_by_file`, `show_whitespace_in_diffs`, `pass_user_identities_to_ci_jwt`, `policy_advanced_editor`, `emoji_skin_tone` must be provided.',
      },
      emoji_skin_tone: {
        type: 'string',
        description:
          'Default skin tone for emoji that have skin tone variants. One of `default`, `light`, `medium_light`, `medium`, `medium_dark`, or `dark`. At least one of `view_diffs_file_by_file`, `show_whitespace_in_diffs`, `pass_user_identities_to_ci_jwt`, `policy_advanced_editor`, `emoji_skin_tone` must be provided.',
        enum: ['default', 'light', 'medium_light', 'medium', 'medium_dark', 'dark'],
      },
    },
  },
  request: {
    method: 'PUT',
    path: '/user/preferences',
    body: [
      'view_diffs_file_by_file',
      'show_whitespace_in_diffs',
      'pass_user_identities_to_ci_jwt',
      'policy_advanced_editor',
      'emoji_skin_tone',
    ],
  },
});
