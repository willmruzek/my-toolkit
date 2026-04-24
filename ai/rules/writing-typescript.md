---
description: Strict TypeScript rules that ban type casts and any, and require structural refactors for safe typing.
agents:
  copilot:
    applyTo: '**/*.ts, **/*.tsx'
  cursor:
    globs: '**/*.ts,**/*.tsx'
---

# Writing TypeScript

Treat every rule below as a hard requirement, not a preference.

## Type Safety

- Avoid type casts at all costs. If you think a cast is unavoidable, treat it as a structural issue first — refactor the types, API boundaries, or data flow to keep strict typing.
- Avoid `any` at all costs. Same rule applies: if `any` feels necessary, the types need reworking, not an escape hatch.
- Do not give up early on typing problems. Keep iterating toward a fully typed solution before escalating.
- Narrow `unknown` values with type guards and schema validation instead of casting.
- If a third-party API is weakly typed, create typed wrappers at the boundary so the rest of the codebase stays strict.

## Type Modeling

- Always prefer `type` aliases over `interface`. Only use `interface` when you need declaration merging to extend a global or library type.
- Prefer discriminated unions over optional properties when a value's shape depends on a mode or state. This makes exhaustiveness checking work for you.
- Add or improve shared type aliases, generics, and discriminated unions where they reduce duplication or clarify intent.
- Use runtime validation (e.g., Zod, io-ts) at system boundaries — API responses, user input, config files — and derive static types from the schema when possible.

## Function Signatures

- If a function has more than one parameter, strongly consider consolidating into a single object parameter. This simulates keyword args and makes the call site self-documenting. One exception may be a context param: `fn(context, args)`.
- Prefer explicit return types on exported functions — it catches accidental changes to the return shape and improves IDE hover info. Omit the return type when the inferred type is intentionally narrower (e.g., literal types, const tuples) and the function has tests covering the contract.
- Use `readonly` on parameters and properties by default. Only remove it when mutation is intentional and documented.

## Lint and Error Discipline

- Follow lint errors and fix them. Do not ignore, suppress, or bypass lint rules to make code pass.
- If a lint/type error seems hard to resolve, continue refactoring until the root cause is addressed — the error is a signal, not an obstacle.
- If resolving typing or lint issues requires a major refactor, explain why the refactor is needed, provide pros and cons, and ask for approval before implementing it.
