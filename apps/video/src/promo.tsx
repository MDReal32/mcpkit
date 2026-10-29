import { springTiming, TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { Music } from "./audio/music";
import { Background } from "./components/background";
import { CameraPush } from "./components/camera-push";
import { SCENE_SECONDS, SMOOTH_SPRING, TRANSITION_SECONDS } from "./const";
import { AssistantScene } from "./scenes/assistant/assistant-scene";
import { AssistantSounds } from "./scenes/assistant/assistant-sounds";
import { CatalogScene } from "./scenes/catalog/catalog-scene";
import { CatalogSounds } from "./scenes/catalog/catalog-sounds";
import { ClientsScene } from "./scenes/clients/clients-scene";
import { ClientsSounds } from "./scenes/clients/clients-sounds";
import { CloseScene } from "./scenes/close/close-scene";
import { CloseSounds } from "./scenes/close/close-sounds";
import { CredentialsScene } from "./scenes/credentials/credentials-scene";
import { CredentialsSounds } from "./scenes/credentials/credentials-sounds";
import { HookScene } from "./scenes/hook/hook-scene";
import { HookSounds } from "./scenes/hook/hook-sounds";
import { InstallScene } from "./scenes/install/install-scene";
import { InstallSounds } from "./scenes/install/install-sounds";
import { ProblemScene } from "./scenes/problem/problem-scene";
import { ProblemSounds } from "./scenes/problem/problem-sounds";
import { BlurFade } from "./transitions/blur-fade";
import { VoiceLine } from "./voiceover/voice-line";

export const Promo = () => {
  const { fps } = useVideoConfig();
  const transition = springTiming({ config: SMOOTH_SPRING, durationInFrames: Math.round(TRANSITION_SECONDS * fps) });
  const presentation = { component: BlurFade, props: {} };
  return (
    <AbsoluteFill>
      <Background />
      <Music />
      <TransitionSeries>
        <TransitionSeries.Sequence name="Hook" durationInFrames={Math.round(SCENE_SECONDS.hook * fps)}>
          <CameraPush seconds={SCENE_SECONDS.hook}>
            <HookScene />
          </CameraPush>
          <HookSounds />
          <VoiceLine scene="hook" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={presentation} timing={transition} />
        <TransitionSeries.Sequence name="Problem" durationInFrames={Math.round(SCENE_SECONDS.problem * fps)}>
          <CameraPush seconds={SCENE_SECONDS.problem}>
            <ProblemScene />
          </CameraPush>
          <ProblemSounds />
          <VoiceLine scene="problem" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={presentation} timing={transition} />
        <TransitionSeries.Sequence name="Install" durationInFrames={Math.round(SCENE_SECONDS.install * fps)}>
          <CameraPush seconds={SCENE_SECONDS.install}>
            <InstallScene />
          </CameraPush>
          <InstallSounds />
          <VoiceLine scene="install" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={presentation} timing={transition} />
        <TransitionSeries.Sequence name="Assistant" durationInFrames={Math.round(SCENE_SECONDS.assistant * fps)}>
          <CameraPush seconds={SCENE_SECONDS.assistant}>
            <AssistantScene />
          </CameraPush>
          <AssistantSounds />
          <VoiceLine scene="assistant" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={presentation} timing={transition} />
        <TransitionSeries.Sequence name="Clients" durationInFrames={Math.round(SCENE_SECONDS.clients * fps)}>
          <CameraPush seconds={SCENE_SECONDS.clients}>
            <ClientsScene />
          </CameraPush>
          <ClientsSounds />
          <VoiceLine scene="clients" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={presentation} timing={transition} />
        <TransitionSeries.Sequence name="Catalog" durationInFrames={Math.round(SCENE_SECONDS.catalog * fps)}>
          <CameraPush seconds={SCENE_SECONDS.catalog}>
            <CatalogScene />
          </CameraPush>
          <CatalogSounds />
          <VoiceLine scene="catalog" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={presentation} timing={transition} />
        <TransitionSeries.Sequence name="Credentials" durationInFrames={Math.round(SCENE_SECONDS.credentials * fps)}>
          <CameraPush seconds={SCENE_SECONDS.credentials}>
            <CredentialsScene />
          </CameraPush>
          <CredentialsSounds />
          <VoiceLine scene="credentials" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={presentation} timing={transition} />
        <TransitionSeries.Sequence name="Close" durationInFrames={Math.round(SCENE_SECONDS.close * fps)}>
          <CameraPush seconds={SCENE_SECONDS.close}>
            <CloseScene />
          </CameraPush>
          <CloseSounds />
          <VoiceLine scene="close" />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
