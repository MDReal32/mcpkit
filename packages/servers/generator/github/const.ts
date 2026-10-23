export const SPEC_URL =
  'https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/api.github.com/dereferenced/api.github.com.2022-11-28.deref.json';

export const MAX_SCHEMA_DEPTH = 3;

export const MAX_DESCRIPTION_LENGTH = 400;

export const SERVER_VERSION = '1.0.0';

export const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete'];

export const JSON_CONTENT_TYPE = 'application/json';

export const SERVER_GROUPS = [
  {
    folder: 'github-repos',
    description: 'GitHub REST API: repositories, branches, commits, releases, deployments, checks, pages, git data.',
    categories: [
      'repos',
      'branches',
      'collaborators',
      'commits',
      'deploy-keys',
      'deployments',
      'git',
      'pages',
      'releases',
      'metrics',
      'checks',
      'code-quality',
    ],
  },
  {
    folder: 'github-issues',
    description: 'GitHub REST API: issues, pull requests, reactions, projects.',
    categories: ['issues', 'pulls', 'reactions', 'projects'],
  },
  {
    folder: 'github-actions',
    description: 'GitHub REST API: Actions workflows, runs, runners, secrets, variables, caches, artifacts.',
    categories: ['actions'],
  },
  {
    folder: 'github-security',
    description: 'GitHub REST API: code scanning, secret scanning, Dependabot, dependency graph, security advisories.',
    categories: [
      'security-advisories',
      'code-scanning',
      'code-security',
      'secret-scanning',
      'dependabot',
      'dependency-graph',
      'credentials',
      'private-registries',
    ],
  },
  {
    folder: 'github-orgs',
    description: 'GitHub REST API: organizations, teams, billing, interaction limits, migrations, classroom.',
    categories: ['orgs', 'teams', 'billing', 'interactions', 'migrations', 'campaigns', 'classroom'],
  },
  {
    folder: 'github-users',
    description: 'GitHub REST API: users, notifications and stars, gists, search.',
    categories: ['users', 'activity', 'gists', 'search'],
  },
  {
    folder: 'github-apps',
    description: 'GitHub REST API: GitHub Apps, packages, codespaces.',
    categories: ['apps', 'packages', 'codespaces'],
  },
  {
    folder: 'github-copilot',
    description: 'GitHub REST API: Copilot, agents and automations.',
    categories: ['copilot', 'copilot-spaces', 'agents', 'agent-automations', 'agent-tasks'],
  },
  {
    folder: 'github-meta',
    description:
      'GitHub REST API: meta, rate limit, emojis, gitignore templates, licenses, markdown, codes of conduct.',
    categories: ['meta', 'rate-limit', 'emojis', 'gitignore', 'licenses', 'markdown', 'codes-of-conduct'],
  },
];
