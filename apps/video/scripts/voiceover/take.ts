import type { TakeAlignment } from "./take-alignment";

export interface Take {
  audio: Buffer;
  alignment: TakeAlignment;
}
