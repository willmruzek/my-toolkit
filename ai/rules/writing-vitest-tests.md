---
description: Vitest-specific testing rules for mocks, async behavior, and deterministic test setup.

agents:
  copilot:
    applyTo: '**/*.test.ts, **/*.test.tsx'
  cursor:
    globs: '**/*.test.ts,**/*.test.tsx'
---

# Writing Vitest Tests

Use this file for Vitest-specific behavior. Pair it with `writing-tests.md` for general test design.

## Mocking Defaults

- Prefer `vi.mock` + `vi.mocked` over `vi.hoisted`. This keeps mocks type-safe and easier to reason about.
- Do not use broad casts to force mock typing. If typing is hard, improve the mock shape or add a typed wrapper.
- Mock at module boundaries (I/O, network, filesystem, time), not internal helpers.

## Module Mock Pattern

- Keep `vi.mock(...)` declarations near the top of the file so test setup is explicit.
- Import the module under test after mock declarations when ordering matters.
- Use `vi.mocked(fn)` before configuring return values so helpers like `mockResolvedValue` stay typed.

```typescript
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fetchUser } from './api';

vi.mock('./api', () => ({
  fetchUser: vi.fn(),
}));

const mockFetchUser = vi.mocked(fetchUser);

beforeEach(() => {
  mockFetchUser.mockReset();
});
```

## Mock Lifecycle Hygiene

- Use `beforeEach` to reset per-test behavior (`mockReset`) so tests remain isolated.
- Use `vi.clearAllMocks()` when you only need to clear call history.
- Use `vi.restoreAllMocks()` when using `vi.spyOn` and you need original implementations restored.
- Choose one cleanup strategy per file and apply it consistently.

## Async and Timers

- For async behavior, `await` the action under test and assert on the resolved result or rejection.
- Use `await expect(promise).rejects...` for failure paths instead of manual `try/catch` unless you also need intermediate assertions.
- Use fake timers only when time is part of the behavior.
- When using fake timers, restore real timers in `afterEach` to avoid cross-test leakage.

## Assertions and Signals

- Prefer explicit assertions on outputs and side effects (`toEqual`, `toHaveBeenCalledWith`, `toHaveBeenCalledTimes`).
- In mock-heavy tests, assert both the returned value and key collaborator calls.
- Keep assertion failure messages clear through specific expectation targets, not broad snapshot-style assertions.

## What to Avoid

- Avoid `vi.hoisted` unless there is a concrete ordering problem that cannot be solved with normal mock setup.
- Avoid overusing snapshots for business logic; prefer targeted assertions.
- Avoid test setup magic hidden in shared global helpers. Keep setup close to the test file unless reuse is clearly valuable.
