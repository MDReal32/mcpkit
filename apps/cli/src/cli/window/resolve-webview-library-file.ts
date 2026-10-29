/**
 * The prebuilt webview library from `webview-bun` for this OS. Every import names a fixed file, so `bun build --compile`
 * embeds all of them and the binary picks its own at run time.
 */
export const resolveWebviewLibraryFile = async () => {
  if (process.platform === "darwin") {
    return (await import("webview-bun/build/libwebview.dylib")).default;
  }
  if (process.platform === "win32") {
    return (await import("webview-bun/build/libwebview.dll")).default;
  }
  if (process.arch === "arm64") {
    return (await import("webview-bun/build/libwebview-arm64.so")).default;
  }
  return (await import("webview-bun/build/libwebview-x64.so")).default;
};
