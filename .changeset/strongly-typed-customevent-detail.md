---
"@wc-toolkit/react-wrappers": patch
---

Fix the generated `.d.ts` for strongly typed events whose detail is a named type (e.g. `CustomEvent<MyDetail>`). The event handler now references the declared per-event alias instead of that alias concatenated onto the base event type, and the detail type is imported alongside the element so the alias resolves. A single named detail is recovered and imported; unions, nested generics, arrays and namespaced details have no single importable name and are left as-is. Events with a bare `CustomEvent`/`Event` type, and components without typed event details, are unaffected.
