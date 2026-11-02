import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { checkForUpdate } from "../src/cli/update/check-for-update";
import { AUTO_UPDATE_RECHECK_INTERVAL_MS } from "../src/cli/update/const";
import { startAutoUpdate } from "../src/cli/update/start-auto-update";

const compiled = vi.hoisted(() => ({ value: true }));

vi.mock("@usemcpkit/binary", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@usemcpkit/binary")>()),
  isCompiledBinary: () => compiled.value,
}));

vi.mock("../src/cli/update/check-for-update", () => ({ checkForUpdate: vi.fn(async () => undefined) }));

describe("startAutoUpdate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.mocked(checkForUpdate).mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
    compiled.value = true;
  });

  it("checks at start and again every interval while the server runs", async () => {
    startAutoUpdate();
    expect(checkForUpdate).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(AUTO_UPDATE_RECHECK_INTERVAL_MS * 3);

    expect(checkForUpdate).toHaveBeenCalledTimes(4);
  });

  it("does nothing outside the compiled binary", async () => {
    compiled.value = false;

    startAutoUpdate();
    await vi.advanceTimersByTimeAsync(AUTO_UPDATE_RECHECK_INTERVAL_MS * 2);

    expect(checkForUpdate).not.toHaveBeenCalled();
  });
});
