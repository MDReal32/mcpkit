import { Composition } from "remotion";
import { VIDEO } from "./const";
import { Promo } from "./promo";
import { promoFrames } from "./promo-frames";

export const RemotionRoot = () => (
  <Composition
    id="Promo"
    component={Promo}
    durationInFrames={promoFrames(VIDEO.fps)}
    fps={VIDEO.fps}
    width={VIDEO.width}
    height={VIDEO.height}
  />
);
