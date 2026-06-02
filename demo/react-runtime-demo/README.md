# React Runtime Demo

Minimal Vite + React + TypeScript app for testing runtime wrappers from this repository.

## How to run

```sh
cd demo/react-runtime-demo
pnpm install
pnpm dev
```

Open http://localhost:5173.

Build check:

```sh
pnpm build
```

## About
- Imports `wrapComponent` directly from local source (`../../../src/runtime-wrapper.ts`).
- Demonstrates:
  - property mapping (`value`)
  - attribute mapping (`label`)
  - boolean attribute handling (`active`)
  - event mapping (`onDemoChange` -> `demo-change`)
  - ref forwarding
