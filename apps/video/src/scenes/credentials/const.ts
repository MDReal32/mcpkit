import type { CursorStop } from "../../components/cursor-stop";

export const SERVER_NAME = "Jira";

export const DOMAIN_QUERY = "acme";

export const SAVED_HOSTS: readonly string[] = ["acme.atlassian.net", "jira.acme.internal"];

export const TOKEN_LENGTH = 22;

/** When each step of filling the form happens, in seconds into the scene. */
export const FORM_TIMELINE = {
  pageIn: 0.05,
  clickDomain: 0.42,
  typeDomain: { start: 0.48, end: 0.7 },
  listOpen: 0.6,
  pickHost: 1.08,
  clickToken: 1.38,
  typeToken: { start: 1.44, end: 1.84 },
  press: 2.18,
  checking: 2.24,
  connected: 2.95,
} as const;

/** Where the pointer goes on the page, in pixels inside the window below its title bar. */
export const FORM_CURSOR: readonly CursorStop[] = [
  { at: 0, x: 720, y: 470 },
  { at: FORM_TIMELINE.clickDomain, x: 290, y: 218, click: true },
  { at: FORM_TIMELINE.pickHost, x: 300, y: 290, click: true },
  { at: FORM_TIMELINE.clickToken, x: 300, y: 342, click: true },
  { at: FORM_TIMELINE.press, x: 610, y: 436, click: true },
  { at: FORM_TIMELINE.connected + 0.5, x: 680, y: 480 },
];

export const FIELD_HEIGHT = 64;

export const PAGE_WIDTH = 760;
