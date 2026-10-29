import { Sfx } from "../../audio/sfx";
import { FORM_CURSOR, FORM_TIMELINE } from "./const";

export const CredentialsSounds = () => (
  <>
    {FORM_CURSOR.filter((stop) => stop.click).map((stop) => (
      <Sfx key={stop.at} sound="click" at={stop.at} volume={0.45} />
    ))}
    <Sfx sound="success" at={FORM_TIMELINE.connected} volume={0.45} />
  </>
);
