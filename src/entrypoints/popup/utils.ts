export const events =
  <E extends Event>(...fns: ((e: E) => void)[]) =>
  (e: E) => {
    fns.forEach((fn) => fn(e));
  };
