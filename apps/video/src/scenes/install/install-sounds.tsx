import { Sfx } from "../../audio/sfx";
import { DETECTED_CLIENTS, ROW_STEP, ROWS_AT, TYPING_WINDOW } from "./const";

export const InstallSounds = () => (
  <>
    <Sfx sound="click" at={TYPING_WINDOW.end + 0.12} volume={0.5} />
    <Sfx sound="check" at={ROWS_AT + (DETECTED_CLIENTS.length - 1) * ROW_STEP + 0.22} volume={0.35} />
  </>
);
