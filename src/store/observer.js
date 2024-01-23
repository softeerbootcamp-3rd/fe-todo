let currentObserver = null;

export const observe = (fn) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

export const observable = (obj) => {
  Object.keys(obj).forEach((key) => {
    let _value = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        console.log("get");
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },

      set(value) {
        console.log("set");
        _value = value;
        observers.forEach((fn) => fn());
      },
    });
  });
  return obj;
};
