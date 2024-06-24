# Better Zustand Selector

A better way to use selectors with zustand that allows you to access multiple states from the store at once without causing unnecessary re-renders.

## Installation

```bash
npm install better-zustand-selector

pnpm install better-zustand-selector

yarn add better-zustand-selector
```

## Demo

Try it out on [Code Sandbox](https://codesandbox.io/s/better-zustand-selector-forked-z1j1q?file=/src/App.tsx)

## Usage

```tsx
import { create } from "zustand";
import { createSelector } from "better-zustand-selector";

const useCounterStore = createSelector(counterStore);
const counterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

const Counter = () => {
  const { count, increment } = useCounterStore("count", "increment");
  return <button onClick={increment}>{count}</button>;
};
```

## Partial Selectors

You can also retrieve partial states from the store without causing re-renders when the unaccessed states change.
For example, if you only want to access the `count` state from the store, you can use the `useCounterStore` hook like this:

```tsx
const { count } = useCounterStore("count");
```
