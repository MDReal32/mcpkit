# mcpkit

Project rules below override any conflicting global rules (for example: no explicit
return types, no default exports, no inline `//` comments).

## Project layout

Yarn 4 workspaces + Nx (targets are inferred from each `package.json`; pipeline in `nx.json`).

- `packages/core` (`@usemcpkit/core`, publishable) — manifest types/validation, SDK, executor, auth (fallbacks, OAuth PKCE, credentials form contract). The credentials page has no text of its own: wording, inputs and buttons come from the manifest's `ui` (`defineUI`; defaults in `manifest/ui/const.ts`), `buildCredentialRequest` turns it into the view model the CLI injects into the page, and a `cli` action carries its own `command` (a program name on PATH, no path) and `args` (with `{domain}`/`{webHost}`), which core only fills and runs without a shell when the user clicks it. Never add per-provider code to core. Deployments with different endpoints (Atlassian Cloud vs Data Center) are manifest `editions` picked by domain host suffix, never per-server code. Public surface is `src/main.ts`; it builds to `build/mcpkit.core.js` and `vite-plugin-dts` bundles its types into `build/mcpkit.core.d.ts`.
- `packages/ui` (`@usemcpkit/ui`, private) — Svelte 5 pages the CLI serves on loopback, built into one HTML file (`build/mcpkit.ui.html`, imported by the CLI with `?raw`); `src/main.ts` mounts the app. The form HTTP contract (`CREDENTIALS_FORM_API`, session header) lives in core.
- `packages/testing` (`@usemcpkit/testing`, private) — shared test fixtures.
- Saved credentials are plain text in `~/.mcpkit/secrets.json` (0600, by server then key), via core `auth/secret-file/` (`createFileSecretStore`); the domain goes to `~/.mcpkit/config.json`, handled in core `auth/config/`. No encryption, no master password.
- `packages/clients` (`@usemcpkit/clients`, private) — AI client detection and config editing (`jsonc-parser` for JSON, line-based for Codex TOML); one definition per client in `definitions/`, listed in `client-definitions.ts`.
- `packages/credentials-form` (`@usemcpkit/credentials-form`, private) — serves the one-off local credentials page the CLI hands it.
- `packages/binary` (`@usemcpkit/binary`, private) — installs and self-updates `~/.mcpkit/bin/mcpkit` (copy self, `--binary`, or download + integrity check of the platform package), plus the build targets and npm package names in `src/platform/`, shared by the CLI's binaries plugin and the runtime.
- `apps/cli` (`@usemcpkit/cli`) — CLI + MCP stdio server. `src/main.ts` is the bootstrap-only entrypoint; servers live in `src/servers/<name>/<name>.ts`, one tool per file in `tools/`.
  - `plugins/manifests/` — Vite plugin that compiles `src/servers` into JSON manifests at build time (`build/manifests`, the registry CI publishes to GitHub Pages). The binary embeds no manifests; the registry is `index.json` (id, version, tool names, link, sha256) plus `<category>/<server>.json`. `src/registry/` syncs only the index into `~/.mcpkit/manifests` and downloads a manifest lazily, verified by its sha256.
  - `plugins/binaries/` — Vite plugin (active in `--mode package`) that cross-compiles `build/mcpkit.cli.js` into per-OS binaries with Bun and writes the `@usemcpkit/cli-<target>` npm packages to `build/npm/`.
  - `src/mcp/supervisor/` — a compiled `serve` is a supervisor that owns the client's stdio and runs `serve --worker`; it swaps the worker when the binary file changes (handshake replay + `tools/list_changed`). Keep worker-side behavior in `serveStdio`, never in the supervisor.
  - `src/cli/` commands and flags, parsed by `yargs-extended` (each command file in `commands/` has a `registerXCommand`; `create-program.ts` lists them), `src/mcp/` the stdio server (four fixed meta-tools `list_servers`/`list_tools`/`describe_tool`/`call_tool`; tool ids are `category:server:tool` arguments) and supervisor, `src/registry/` manifests, `src/servers/` the server definitions. Domains with their own boundary live in packages below.
  - Vite loads its config with `--configLoader runner` because the plugins import `@usemcpkit/core` TS source; other projects use `--configLoader native`.
- `apps/npx` (`usemcpkit`) — published wrapper so `npx usemcpkit` runs `@usemcpkit/cli` (bare `mcpkit` = install).
- `src/<domain>/index.ts` is each domain's public boundary; relative imports into a folder with an `index.ts` (from outside it) target the folder, never its files. Other workspaces are imported by package name.

The private packages ship as source (`exports` points at `src/main.ts`, like `@usemcpkit/testing`) and are bundled into the CLI by Vite; only `@usemcpkit/core` has a build.

Every workspace uses `src/main.ts` as its entry; the ones that build go to `build/mcpkit.<package>.<ext>` (plus a same-named `.d.ts` when it ships types).

Commands: `yarn build`, `yarn test`, `yarn typecheck`, `yarn lint` (Biome, per project; `build` depends on it), `yarn format` (Biome `check --write`), `yarn package`. Biome config is the root `biome.json`.

## Code Styles

### Core Principles

* Prefer clarity to compactness and maintainable code over clever code.
* Prefer explicit structure, ownership, and predictable behavior.
* Preserve existing behavior unless the task explicitly changes it.
* Keep changes scoped. Clean related duplication and obsolete code in the touched area, but avoid unrelated repository-wide rewrites.
* Do not preserve bad local patterns only because they already exist; move touched code toward the best proven local pattern.
* Before using a library, framework, runtime, generator, or tool, verify the installed version first, then check official docs/types/source for that version, then search the repository for existing usage.
* Never code against guessed library behavior or stale memory when the repository can be checked.
* Prefer non-deprecated APIs when the installed version marks an API deprecated.
* Optimize for reviewability, not for fewer files.

### Structure & Ownership

* One file should have one clear responsibility.
* Prefer one file = one entity. If a second meaningful entity is needed, move it into its own file unless a documented technology-specific exception applies.
* One function = one purpose. One class/service = one responsibility.
* Prefer standalone functions for pure logic. Do not create classes only to group helper functions.
* Extracted named helper functions follow the same one-file-one-entity rule. When logic is pulled out of a main function into its own named helper, move that helper into its own file and import it; do not define the extracted helper alongside the main function it supports.
* Organize source code as a tree by the strongest ownership axis: domain, feature, runtime, layer, responsibility, provider, adapter, integration, module, protocol, transport, or platform.
* Keep source roots minimal and intentional. New features should extend the tree instead of polluting the root.
* Shared code must be promoted deliberately behind an explicit stable boundary. Do not reach into another module/package/app's internals.
* Avoid circular dependencies and hidden cross-module coupling.
* Do not create dumping-ground files or folders.
* Use descriptive domain-specific names. Avoid vague names such as `helper`, `utils`, `manager`, `processor`, `common`, `misc`, or `doStuff` when a precise name is available.
* Refactor the touched scope when a file becomes multi-purpose, a function becomes too large, responsibilities become mixed, unsafe casts appear, duplicated mapping appears, or unstable cross-module imports grow.

### Functions, Control Flow & Side Effects

* Avoid god classes, god services, deeply nested condition trees, nested ternaries, giant inline ternaries, giant one-line objects, and giant one-line conditions.
* Avoid premature abstractions, generic engines, reflection-heavy meta-programming, and magic auto-registration unless repeated concrete need proves they are justified.
* Prefer guard clauses when they improve readability. Guard clauses must use braces.
* Object literals with more than three properties should be multiline.
* Do not hide expensive I/O, network calls, storage operations, native bridge calls, or other significant side effects behind getters or seemingly pure helpers.

### Errors, Logging & Comments

* Never swallow errors silently. Never use an empty `catch {}`.
* Handle errors at the boundary where meaningful recovery, translation, logging, or presentation can occur.
* Fail explicitly instead of silently falling back.
* Logs should be structured and meaningful. Do not use `console.log` in application code.
* Default to no comments. Prefer clearer naming or extraction over explanatory inline comments.
* Never use inline `//` comments for narration or explanation. If an explanation must live in code, use rare JSDoc above the declaration for a hidden constraint, verified external-system quirk, or non-obvious invariant.

### TypeScript — General

* Use strict TypeScript.
* Never use `any` unless compatibility with an external library genuinely requires it. Prefer `unknown` and narrow explicitly.
* Avoid unsafe casts such as `as unknown as`.
* Use `import type` for type-only imports.
* Use named exports and named imports. Do not use default exports.
* Prefer `async`/`await` and keep asynchronous work explicit.

### TypeScript — Object Types

* Use `interface` for object shapes and public object contracts.
* Do not write anonymous inline object type annotations such as `value: { id: string; name: string }`, including for parameters, variables, properties, callbacks, destructured arguments, or other implementation annotations.
* If an object shape needs an explicit annotation, use an existing named interface when appropriate or create a named `interface` for that shape.
* Use `type` for unions, intersections, mapped types, conditional types, primitive aliases, tuples/function aliases, and cases that interfaces cannot express cleanly.
* Do not duplicate types or create separate DTO/domain/view-model types unless an actual boundary requires them.
* Prefer deriving related types from existing source types instead of repeating object shapes. Use TypeScript utility and indexed-access types such as `Pick`, `Omit`, `Partial`, `Required`, `Readonly`, `Record`, `Extract`, `Exclude`, `NonNullable`, and `T[K]` when they express the relationship clearly.
* Do not use utility types mechanically when they make the contract harder to understand; create a dedicated named type when it represents a genuinely distinct boundary or domain concept.
* When a union contains multiple object variants, prefer named object shapes and combine them into a union rather than writing a large unreadable inline union.
* Use generics only when they reduce duplication and improve clarity. Do not create type puzzles.

### TypeScript — Functions & Return Types

* Default to `const` arrow functions for standalone functions.
* Avoid `function` declarations unless technically required or significantly clearer. Class methods stay normal methods; object methods may use method syntax; callbacks remain arrow functions.
* Do not add explicit return type annotations to TypeScript function or method implementations. Always rely on TypeScript return-type inference when the language can infer the type.
* This rule applies to standalone functions, arrow functions, class methods, async functions, React components, hooks, callbacks, service methods, controller methods, utilities, and factory functions.
* Do not preserve an explicit return type merely because it already exists in touched implementation code; remove it when TypeScript can infer the return type correctly.
* Explicit return types are allowed only when structurally required by TypeScript or by a declaration-only contract, such as overload signatures, abstract method declarations, interface/type function signatures, declaration files, or cases where inference is technically impossible or incorrect. Readability alone is not an exception.

### TypeScript — Modules, Files & Public Boundaries

* Do not deep-import internal implementation details from another feature or package; use its public boundary.
* Do not create barrel files that blindly re-export everything. Public exports must be deliberate.
* TypeScript module and folder names use lowercase kebab-case unless a framework-specific rule overrides it.
* A filename should reflect the entity it contains. Avoid suffix noise such as `.type.ts` or `.function.ts` when the base name already communicates the entity clearly.
* Non-trivial constant data such as lookup tables, tier or threshold definitions, configuration objects, magic-number arrays, and similar reusable domain values must not live inline beside the function or class that consumes them. Move them to the closest `const.ts` owned by that directory/domain and import them.
* Trivial scalar constants that are genuinely local implementation details may remain local; do not create a `const.ts` merely to move a single obvious value out of a file.
* A directory/domain `const.ts` must stay ownership-focused. Do not turn it into a generic cross-domain constants dumping ground.
* `src/main.ts` is an allowed entrypoint exception to one-entity-per-file and should stay limited to bootstrap, initialization, configuration loading, dependency wiring, and startup.
* Libraries expose their public surface through an explicit boundary, `src/main.ts`; internal files still follow the normal ownership structure.

### NestJS

#### Module Boundaries

* One module represents one domain or one coherent domain slice.
* Preferred dependency direction is `controller -> service`.
* A service may depend on its own module's repositories, handlers, approved provider abstractions, and explicitly exported services from other modules.
* Do not call another module's repository, DTO, handler, module-local utility, or module-local type directly.
* If something becomes genuinely shared across modules, promote it deliberately to a stable shared boundary rather than deep-importing it.
* Keep provider-specific implementation details out of controllers and application orchestration when a dedicated provider/adapter boundary exists.

#### Responsibilities

* Controllers stay thin.
* Services own application orchestration and use-case coordination.
* Repositories own persistence.
* `<module>.module.ts` owns Nest wiring only: imports, providers, controllers, and exports. It must not contain business logic, mapping logic, helpers, or domain orchestration.
* `<module>.controller.ts` owns route decorators, guards/decorators/pipes, request extraction, service calls, and returning service results. It must not contain business logic, persistence, provider logic, or large mapping logic.
* `<module>.service.ts` owns application orchestration and use-case coordination. It must not contain HTTP parsing concerns, raw persistence logic when a repository exists, vendor-specific provider implementation details, or hidden cross-module repository access.
* `<module>.repository.ts` owns DB reads/writes, persistence filtering, query construction, and transaction interaction. It must not contain business orchestration, controller concerns, DTO validation, or provider calls.
* Use handlers when a use-case becomes meaningful enough to split from a service, may be triggered from multiple entrypoints, or deserves isolated tests. Do not create handlers for trivial pass-through logic.

#### Structure

* Default module structure may include `<module>.module.ts`, `<module>.controller.ts`, `<module>.service.ts`, `<module>.repository.ts`, and only-needed folders such as `database/`, `dto/`, `handlers/`, `types/`, and `utils/`.
* Do not create empty structural ceremony.
* Avoid vague module folders such as `common`, `shared`, `helpers`, `models`, `interfaces`, `entities`, `contracts`, `misc`, or `lib` as dumping grounds.
* Module-local `types/` contains types owned only by that module. Module-local `utils/` contains utilities owned only by that module.

#### Validation & Contracts

* All external input must be validated at the edge.
* Prefer Zod with `nestjs-zod` and `createZodDto` for DTO validation.
* DTO classes extend `createZodDto(schema)`.
* Do not define schemas inline inside DTO files; keep schemas in dedicated schema files and expose shared schemas through an explicit shared contract boundary when needed across apps/packages.
* Do not accept boundary payloads as anonymous inline object types when a named DTO or named type should define the contract.
* Event names should be stable, dot-separated, and centralized rather than invented ad hoc across files.

### React Native

* React Native component filenames use PascalCase, for example `AnimeCard.tsx` or `VideoPlayer.tsx`.
* Stay consistent with the existing component/file naming convention inside each package or feature.

### Drizzle

* A Drizzle table file owns one persistence entity.
* The table and its directly inferred `$inferSelect` / `$inferInsert` types stay in the same file; treat them as one persistence entity.
* Do not create separate files only for directly inferred select/insert aliases.
* Separate enum definitions, relation definitions, or reusable column builders only when they have their own meaningful responsibility.

### Zod

* A `*.schema.ts` file may keep a schema together with its directly inferred `z.infer` type and meaningful derived variants from that schema.
* Schema files must not contain unrelated functions, classes, enums, constants, or trivial duplicate aliases.
* This is an explicit exception to one-file-one-entity because the schema and its inferred type represent the same contract.

### Nx

* Prefer running build, lint, test, e2e, and similar workspace tasks through Nx rather than directly through the underlying tooling.
* Prefix Nx commands with the workspace package manager instead of relying on a globally installed CLI.
* For workspace navigation, project relationships, targets, and dependencies, use Nx-aware workspace tooling when available.
* Do not create a `project.json` merely to duplicate or re-declare scripts that already exist in `package.json`. Package scripts are already usable as Nx targets; run and configure the inferred target instead of copying its command into `project.json`.
* Create `project.json` only when that project genuinely needs project-specific Nx configuration or metadata that must be added beyond the inferred target, such as project-specific `outputs`, `inputs`, `dependsOn`, cache behavior, configurations, executor/options, tags, implicit dependencies, or equivalent Nx-specific settings.
* Do not add project-level configuration for behavior that is generic across the workspace. Put generic rules such as common `cache`, `inputs`, `outputs`, or `dependsOn` behavior in `nx.json` `targetDefaults`; use `project.json` only for genuine project-specific additions or overrides.
* Never use the `nx` property inside `package.json` for project configuration. When project-specific Nx configuration is required, prefer `project.json`.
* When adding Nx metadata for an existing package-script target, do not duplicate the underlying command unless Nx technically requires a replacement target definition. Preserve the package script as the executable source whenever possible.
* Every `build` target must participate in an explicit Nx task pipeline, preferably through `nx.json` `targetDefaults` when the rule applies workspace-wide.
* `build` must always depend on `^build` so buildable project dependencies are built first.
* `build` must also depend on every applicable finite same-project prerequisite or verification target that the project actually provides. This includes `typecheck`, `lint`, `test`, `format` or `format:check`, `check`, `validate`, `prebuild`, `codegen` or `generate`, schema/code generation or sync targets, and equivalent project-specific build-readiness tasks.
* Do not invent empty targets only to satisfy the build pipeline rule. Add a dependency when that target genuinely exists for the project or is intentionally introduced as a real validation/prerequisite step.
* Do not make `build` depend on long-running targets such as `serve`, `dev`, or `watch`. Build dependencies must terminate.
* When a project adds project-specific `build.dependsOn` entries, preserve inherited or inferred dependencies with the Nx spread token `"..."` instead of replacing them. A local override must never accidentally drop `^build` or other workspace-wide build gates.
* Prefer defining common build dependencies once in `nx.json` `targetDefaults`; use project-level configuration only for project-specific additions or exceptions.
* Verify unfamiliar Nx CLI flags before using them; do not guess flags.
* For scaffolding, use the appropriate Nx generator workflow rather than manually inventing project structure when a generator is intended.
* Use Nx documentation for advanced configuration, unfamiliar flags, migrations, plugin configuration, and edge cases rather than for routine syntax already known from the workspace.
