import { Sfx } from "../../audio/sfx";
import { CLIENT_WINDOWS } from "./const";
import { windowStart } from "./window-start";

export const ClientsSounds = () => {
  const lastIndex = CLIENT_WINDOWS.length - 1;
  const lastWindow = CLIENT_WINDOWS[lastIndex];
  return lastWindow ? <Sfx sound="check" at={windowStart(lastIndex) + lastWindow.call.done} volume={0.3} /> : null;
};
