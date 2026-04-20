---
description: General test-writing principles covering structure, naming, isolation, and coverage strategy.
agents:
  copilot:
    applyTo: '**/*.test.ts, **/*.test.tsx'
---

# Writing Tests

## Test Isolation

- Application code should never be used to set up tests. Application code should only ever be under test.
- Build test inputs from scratch using plain objects, factory functions, or builder helpers defined in test files. This keeps tests deterministic and decoupled from production internals.
- Each test must be independent. Shared mutable state between tests leads to flaky ordering bugs. Reset state in `beforeEach` or create fresh data per test.
- Never import production helpers solely to construct test fixtures — if the helper has a bug, the test will silently pass with the same bug baked in.

## Arrange / Act / Assert

- Add comments noting the **Arrange**, **Act**, and **Assert** sections of each test. Briefly explain what each section does.
- **Arrange** — set up inputs, dependencies, and expected values.
- **Act** — call the unit under test exactly once.
- **Assert** — verify the result and any side effects.
- Keep each section short. If Arrange is long, extract a helper. If Assert is long, the test may be covering too much.

## Small, Focused Tests

- One behavior per test. If a test name contains "and", it likely needs splitting.
- Test names should tell a story of each expected result. A reader should understand the expected behavior without reading the test body.
- Prefer the pattern: `"<unit> <expected behavior> when <condition>"` — e.g., `"formatDate returns ISO string when given a Date object"`.
- If a test fails, the name and assertion message should be specific enough to signal what broke and in which context, without needing to read the implementation.

## Test Organization

- Group related tests with `describe` blocks that mirror the unit's public API or logical behaviors.
- Use `beforeEach` / `afterEach` to reduce boilerplate and keep individual tests focused on what varies.
- Keep arrange helpers close to where they're used — in the same `describe` block or in a shared section at the top of the file.
- When multiple tests share the same `when <condition>` clause, group them in a nested `describe('when <condition>')` block. This reduces repetition in test names, co-locates shared setup, and makes the test output read like a specification:

  ```typescript
  describe('formatDate', () => {
    describe('when given a Date object', () => {
      test('returns ISO string', () => {
        /* ... */
      });
      test('includes timezone offset', () => {
        /* ... */
      });
    });

    describe('when given undefined', () => {
      test('returns fallback string', () => {
        /* ... */
      });
    });
  });
  ```

- Nest `describe` blocks as deep as the structure calls for — even 4+ levels is fine. Depth mirrors the branching logic of the unit under test and produces readable, hierarchical test output. Each level should add meaningful context (a method name, a condition, a state) rather than nesting for its own sake.

  ```typescript
  describe('ShoppingCart', () => {
    describe('checkout', () => {
      describe('when the cart has items', () => {
        describe('when a discount code is applied', () => {
          test('reduces the total by the discount percentage', () => {
            /* ... */
          });
          test('includes the discount in the receipt', () => {
            /* ... */
          });
        });
      });
    });
  });
  ```

## Mocking Strategy

- Only mock what you must: external I/O, timers, and third-party services. Prefer real implementations for internal pure functions.
- Mock at the boundary, not deep inside the call stack. Over-mocking couples tests to implementation details and makes refactors painful.
- Assert that mocks were called with expected arguments — don't just assert the return value when the side effect is the behavior under test.

## Edge Cases and Error Paths

- Always test the sad path: invalid inputs, empty collections, null/undefined where allowed, and thrown errors.
- For error-throwing code, assert both the error type and the message when the message is user-facing or part of the API contract.
- Boundary values deserve their own tests: zero, one, max, empty string, empty array.

## What Not to Test

- Don't test private internals or implementation details. Test observable behavior through the public API.
- Don't test framework or library code. If you're testing that `Array.map` works, the test isn't adding value.
- Don't write tests that pass regardless of the implementation (tautological tests). Every test should be able to fail meaningfully.
