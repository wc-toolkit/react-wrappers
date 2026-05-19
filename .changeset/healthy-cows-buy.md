---
 "@wc-toolkit/react-wrappers": patch
---

Fix generated React wrappers so `className` is forwarded to the host `class`
attribute before a custom element is registered, and add coverage for the
generated output.
