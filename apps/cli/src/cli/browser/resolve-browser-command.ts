import type { BrowserCommand } from "../types/browser-command";

export const resolveBrowserCommand = (platform: NodeJS.Platform, url: string) => {
  switch (platform) {
    case "darwin": {
      const command: BrowserCommand = { command: "open", args: [url] };
      return command;
    }
    case "win32": {
      const command: BrowserCommand = { command: "rundll32", args: ["url.dll,FileProtocolHandler", url] };
      return command;
    }
    default: {
      const command: BrowserCommand = { command: "xdg-open", args: [url] };
      return command;
    }
  }
};
