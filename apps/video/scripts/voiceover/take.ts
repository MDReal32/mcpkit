import type { TakeAlignment } from "./take-alignment.ts";

export interface Take {
  audio: Buffer;
  alignment: TakeAlignment;
}
