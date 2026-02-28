# @wc-toolkit/react-wrappers

## 1.2.3

### Patch Changes

- af30010: Fixed attribute mapping for `for` to `htmlFor` prop

## 1.2.2

### Patch Changes

- 34f2302: Fixed mapping `for` property to `htmlFor`

## 1.2.1

### Patch Changes

- 16fd791: Added `Element` to strongly typed event names to prevent collisions with other event names

## 1.2.0

### Minor Changes

- ff21217: Updated event typing to strongly type the `target` for any event type

### Patch Changes

- ff21217: Fixed issue where there are events with missing names

## 1.1.1

### Patch Changes

- 2fb2394: Fixed `ref` declaration to prevent it from being `undefined`

## 1.1.0

### Minor Changes

- dfdcf99: Added logic to handle event types that extend the `Event` class

### Patch Changes

- dfdcf99: Fixed missing `ref` prop
- dfdcf99: Added check to add type in case event was incorrectly typed with the `event.detail` type

## 1.0.0

### Major Changes

- 4eec6f3: Initial commit
