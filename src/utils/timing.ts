export const debounce = (fn: Function, timeout: number = 500) => {
  let timer: number | undefined;
  return (...args: any[]) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
        fn.apply(this, args);
    }, timeout);
  };
}