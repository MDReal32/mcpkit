import { claudeCode } from './definitions/claude-code';
import { claudeDesktop } from './definitions/claude-desktop';
import { cline } from './definitions/cline';
import { codex } from './definitions/codex';
import { copilotCli } from './definitions/copilot-cli';
import { cursor } from './definitions/cursor';
import { devinDesktop } from './definitions/devin-desktop';
import { geminiCli } from './definitions/gemini-cli';
import { junie } from './definitions/junie';
import { kiro } from './definitions/kiro';
import { lmStudio } from './definitions/lm-studio';
import { opencode } from './definitions/opencode';
import { rooCode } from './definitions/roo-code';
import { vscode } from './definitions/vscode';
import { vscodeInsiders } from './definitions/vscode-insiders';
import { warp } from './definitions/warp';
import { windsurf } from './definitions/windsurf';
import { zed } from './definitions/zed';
import type { ClientDefinition } from './types/client-definition';

export const CLIENT_DEFINITIONS: readonly ClientDefinition[] = [
  claudeDesktop,
  claudeCode,
  cursor,
  vscode,
  vscodeInsiders,
  devinDesktop,
  windsurf,
  cline,
  rooCode,
  copilotCli,
  codex,
  geminiCli,
  zed,
  opencode,
  kiro,
  lmStudio,
  junie,
  warp,
];
