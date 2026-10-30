import type { VoiceLineData } from "./voice-line-data";

/** One line per scene: `text` is what it says, `speech` how the voice should read it, `at` seconds into the scene. */
export const VOICE_LINES: readonly VoiceLineData[] = [
  { scene: "hook", at: 0.1, text: "Every API. One MCP server.", speech: "Every API. One MCP server." },
  {
    scene: "problem",
    at: 0.2,
    text: "No more seven servers and seven tokens.",
    speech: "No more seven servers and seven tokens.",
  },
  {
    scene: "install",
    at: 0.25,
    text: "One command adds mcpkit to every AI client.",
    speech: "One command adds MCP kit to every AI client.",
  },
  {
    scene: "assistant",
    at: 0.3,
    text: "Just ask. mcpkit opens only the tools it needs.",
    speech: "Just ask, and MCP kit opens only the tools it needs.",
  },
  {
    scene: "clients",
    at: 0.2,
    text: "Same tools in Claude, Cursor, VS Code and Codex.",
    speech: "Same tools in Claude, Cursor, VS Code and Codex.",
  },
  {
    scene: "catalog",
    at: 0.2,
    text: "Over five thousand tools, and this is only the alpha.",
    speech: "Over five thousand tools, and this is only the alpha.",
  },
  {
    scene: "credentials",
    at: 0.2,
    text: "Credentials are saved only after the API accepts them.",
    speech: "Credentials are saved only after the API accepts them.",
  },
  {
    scene: "close",
    at: 0.15,
    text: "Self-updating. One binary. npx usemcpkit.",
    speech: "Self-updating. One binary. NPX use MCP kit.",
  },
];

export const VOICE_DIR = "voiceover";
