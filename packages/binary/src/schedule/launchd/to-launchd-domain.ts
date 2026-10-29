/** The per-user GUI domain a LaunchAgent is bootstrapped into. */
export const toLaunchdDomain = () => `gui/${process.getuid?.() ?? 0}`;
