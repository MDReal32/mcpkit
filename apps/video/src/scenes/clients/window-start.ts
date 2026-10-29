import { CLIENT_WINDOW } from "./const";

/** When the client window at `index` starts, in seconds into the scene. */
export const windowStart = (index: number) => 0.15 + index * CLIENT_WINDOW.step;
