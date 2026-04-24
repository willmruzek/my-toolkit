---
description: Agent workflow guardrails covering pacing, communication, and change hygiene.
agents:
  copilot:
    applyTo: '**/*'
  cursor:
    alwaysApply: true
---

# Workflow

## Decision Making

- When multiple valid options exist for how to proceed, present them and wait for me to choose before taking action. Don't just implement the first one.
- Do not silently preserve backwards compatibility. Agents tend to default to backwards-compat shims, deprecation wrappers, or keeping old signatures "just in case" — don't do this. Always ask first whether backwards compatibility is needed. I usually prefer a clean break. If I do want it, provide guidance on how to do it effectively.
- If you see problems or areas for improvement beyond the current task, mention them but ask before acting on them.

## Task Discipline

- Stay focused on one commit-sized unit of work at a time. Warn me when we're drifting into changes that could be their own commit.
- Write and update relevant tests before implementing the feature or fix. Tests define the expected behavior first, then the implementation satisfies them.
- After finishing a task, briefly confirm what changed rather than re-explaining code I just watched you write.

## Terminal Commands

- Explain every terminal command before running it, including read-only commands like `pwd`, `ls`, and `cat`. The explanation should cover:
  - What the command does
  - Why it's needed for the current task
  - Any risks, side effects, or irreversible impacts
- Do not run the command until this explanation has been provided.

## Documentation

- Always update documentation alongside code changes. This includes in-code comments, docstrings, and related markdown files.
- Focus documentation on what matters: public APIs, complex logic, and non-obvious behavior. Not everything needs a README entry.
- Consider the audience. Documentation should help the next person understand the current state of the code without needing to read the full history.
- Documentation should reflect the final state, not intermediary steps. If a task goes A → B → C before committing, docs should describe A → C. Don't leave behind documentation for B that no longer matches the committed code. Update docs at the end of the task, not after each incremental change.

## Linters

- Treat lint errors as guidance toward expected code, not obstacles to suppress. If ESLint flags something, the rule exists for a reason — fix the code to satisfy it.
- Never add `eslint-disable` comments, `@ts-ignore`, or equivalent suppressions without asking first. If a rule seems wrong for a specific case, raise it so we can decide together.
- When lint errors cascade (fixing one reveals more), follow the chain. The root cause is usually a structural issue worth addressing, not a series of one-off fixes.
- Run the linter after every change and resolve all errors before considering the task done. Don't leave lint failures for a follow-up commit.
