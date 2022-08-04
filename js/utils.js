function perform(callback, wrappers) {
  return function (...args) {
    wrappers.forEach((wrapper) => wrapper.init());
    callback(...args);
    wrappers.forEach((wrapper) => wrapper.close());
  };
}
