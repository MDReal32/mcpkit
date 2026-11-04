import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CREDENTIALS_FORM_API, CREDENTIALS_FORM_SESSION_HEADER, CREDENTIALS_REQUEST_ELEMENT_ID } from "../src/main";

const RUST_GOLDEN = new URL("../../../crates/auth/tests/fixtures/credentials-form.golden.json", import.meta.url);

describe("credentials form contract", () => {
  it("matches the constants the Rust form server uses", () => {
    const golden: unknown = JSON.parse(readFileSync(RUST_GOLDEN, "utf8"));

    expect(golden).toMatchObject({
      constants: {
        api: CREDENTIALS_FORM_API,
        sessionHeader: CREDENTIALS_FORM_SESSION_HEADER,
        requestElementId: CREDENTIALS_REQUEST_ELEMENT_ID,
      },
    });
  });
});
