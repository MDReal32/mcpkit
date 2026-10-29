import { SAMPLE_RATE } from "../const.ts";
import { applyReverb } from "../dsp/apply-reverb.ts";
import { normalize } from "../dsp/normalize.ts";
import { planSections } from "./plan-sections.ts";
import { renderArp } from "./render-arp.ts";
import { renderBass } from "./render-bass.ts";
import { renderBells } from "./render-bells.ts";
import { renderDrums } from "./render-drums.ts";
import { renderPad } from "./render-pad.ts";
import type { StereoMix } from "./stereo-mix.ts";

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
