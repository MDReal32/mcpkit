import { globalGatewayTools } from "./gateway";
import { globalSoundboardDefaultSoundsTools } from "./soundboard-default-sounds";
import { globalStickerPacksTools } from "./sticker-packs";
import { globalStickersTools } from "./stickers";
import { globalVoiceTools } from "./voice";

export const globalGroupTools = [
  ...globalGatewayTools,
  ...globalSoundboardDefaultSoundsTools,
  ...globalStickerPacksTools,
  ...globalStickersTools,
  ...globalVoiceTools,
];
