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
- sibling imports (for example, `./foo`)
- index imports (`./`)
- styles
- unknown imports

### `prettier/`

Reusable Prettier configuration.

### `typescript/`

Reusable TypeScript configurations:

- `@willmruzek/my-toolkit/typescript/base`
- `@willmruzek/my-toolkit/typescript/frontend-lib`
- `@willmruzek/my-toolkit/typescript/react-lib`
- `@willmruzek/my-toolkit/typescript/react-app`
- `@willmruzek/my-toolkit/typescript/next-app`
- `@willmruzek/my-toolkit/typescript/tanstack-start-app`
- `@willmruzek/my-toolkit/typescript/node-lib`
- `@willmruzek/my-toolkit/typescript/node-app`

## Getting Started

This repo is currently in early stages.

- [ ] Nix (devenv) environments
