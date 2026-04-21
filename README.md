# My Toolkit

A centralized repository for reusable configurations and standards for development tools and AI agents.

## Structure

### `ai/`

Agent configurations, skills, and guidelines for consistent AI-assisted development.

- **commands/** — Custom commands for agent workflows (e.g., `gen-commit-msg` for generating conventional commits)
- **rules/** — Behavioral guidelines and standards for agents (personality, workflow discipline, coding practices)
- **skills/** — Specialized agent capabilities and knowledge modules
- **skills.lock.json** — Dependency lock file for installed skills

### `eslint/`

Reusable ESLint flat configs exported from `@willmruzek/my-toolkit/eslint`.

- `recommended` — TypeScript ESLint recommended type-checked rules plus import sorting
- `strict` — TypeScript ESLint strict type-checked rules plus import sorting

Both presets enable `parserOptions.projectService: true` and automatically disable type-aware rules for JavaScript files (such as config scripts).

Import sorting is limited to imports and groups them in this order:

- side effects
- `node:*`
- React packages
- external packages
- `@/*`
- `#*`
- `../../../`
- `../../`
- `../`
- `./`
- styles

### `prettier/`

Reusable Prettier configuration (coming soon).

### `typescript/`

Reusable TypeScript configurations (coming soon).

## Getting Started

This repo is currently in early stages.
