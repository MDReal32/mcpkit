(async () => {
  const run = __USEMCPKIT_CODE__;
  if (typeof run !== "function") {
    throw new TypeError("the code must be an async arrow function, such as async () => { ... }");
  }
  const text = JSON.stringify(await run());
  return text === undefined ? null : text;
})().catch((error) => {
  throw error instanceof Error ? error : new Error(typeof error === "string" ? error : JSON.stringify(error));
});
