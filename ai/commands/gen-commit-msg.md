---
name: gen-commit-msg
description: Generate a conventional commit message from the current staged git changes.

agents:
  cursor:
    disable-model-invocation: true
---

# Generate Commit Message

Use `conventional-commits` skill to generate a commit message for the staged changes in git (`git diff --staged`).
