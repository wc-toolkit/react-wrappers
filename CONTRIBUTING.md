# Contributing to @wc-toolkit/react-wrappers

Thank you for helping improve the React wrappers for WC Toolkit. This guide explains how to set up the project, build and test it locally, and what to do before opening a pull request.

## Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm 9+ (preferred). npm and yarn work, but examples below use pnpm.
- Git

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Enable git hooks (runs automatically via `prepare`, but you can re-run if needed):

   ```bash
   pnpm prepare
   ```

## Useful scripts

Run from the repository root:

- Lint: `pnpm lint`
- Lint (auto-fix): `pnpm lint:fix`
- Tests: `pnpm test`
- Build (CJS + ESM + types): `pnpm build`
- Format: `pnpm format`
- Demo wrapper generation: `pnpm demo`
- CEM analysis (used for demo fixtures): `pnpm analyze`
- Clean untracked/ignored build artifacts: `pnpm clean`

## Local development workflow

1. Make changes in `src/`.
2. Run fast feedback loops:
   - `pnpm lint`
   - `pnpm test`
3. Build to verify output artifacts: `pnpm build`
4. If touching demo-related code, regenerate demo wrappers: `pnpm demo`

## Adding a changeset (required for any PR that changes code or user-facing behavior)

We use Changesets to track version bumps and changelog entries.

1. Run:

   ```bash
   pnpm changeset
   ```

2. Select the package(s) to version (typically `@wc-toolkit/react-wrappers`).
3. Choose the change type (patch/minor/major).
4. Write a concise summary of the change.
5. Commit the generated file in `.changeset/`.

PRs that change code should include exactly one new changeset unless there is a specific reason to add more.

## Before opening a PR: checklist

- [ ] Code changes are committed to a feature branch (not `main`).
- [ ] `pnpm lint` succeeds.
- [ ] `pnpm test` succeeds (or tests are added/updated as appropriate).
- [ ] `pnpm build` succeeds.
- [ ] Demo artifacts regenerated if relevant: `pnpm demo`.
- [ ] A changeset has been added and committed for any code or behavior changes.
- [ ] Files are formatted (`pnpm format`) or pre-commit hooks have run.
- [ ] PR description clearly states what changed, why, and how to test.

## Making a pull request

1. Push your branch to your fork or the origin.
2. Open a PR against `main`.
3. Link any related issues.
4. Ensure CI is green; address any comments or requested changes.
5. Once approved and checks pass, a maintainer will handle merging and releasing.

## Reporting issues

If you run into problems, please open an issue with:
- A clear description of the problem.
- Steps to reproduce (include commands and minimal repro code/manifest if applicable).
- Your Node.js and package manager versions.

Thanks for contributing!