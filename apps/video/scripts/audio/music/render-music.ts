import { SAMPLE_RATE } from "../const";
import { applyReverb } from "../dsp/apply-reverb";
import { normalize } from "../dsp/normalize";
import { planSections } from "./plan-sections";
import { renderArp } from "./render-arp";
import { renderBass } from "./render-bass";
import { renderBells } from "./render-bells";
import { renderDrums } from "./render-drums";
import { renderPad } from "./render-pad";
import type { StereoMix } from "./stereo-mix";

/** The whole score, exactly as long as the promo. */
export const renderMusic = () => {
  const sections = planSections();
  const samples = Math.round(sections.length * SAMPLE_RATE);
  const mix: StereoMix = {
    left: new Float32Array(samples),
    right: new Float32Array(samples),
    reverbSend: new Float32Array(samples),
  };
  renderPad(sections, mix);
  renderBass(sections, mix);
  renderDrums(sections, mix);
  renderArp(sections, mix);
  renderBells(sections, mix);
  const wetLeft = applyReverb(mix.reverbSend);
  const wetRight = applyReverb(mix.reverbSend, 1.07);
  const fadeFrom = samples - Math.round(1.2 * SAMPLE_RATE);
  for (let index = 0; index < samples; index++) {
    const fade = index > fadeFrom ? 1 - (index - fadeFrom) / (samples - fadeFrom) : 1;
    mix.left[index] = Math.tanh(((mix.left[index] ?? 0) + (wetLeft[index] ?? 0)) * 1.2) * fade;
    mix.right[index] = Math.tanh(((mix.right[index] ?? 0) + (wetRight[index] ?? 0)) * 1.2) * fade;
  }
  return normalize([mix.left, mix.right], 0.89);
};
