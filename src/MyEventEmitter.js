'use strict';

class MyEventEmitter {
  constructor() {
    this._events = new Map();
  }

  on(eventName, listener) {
    if (!this._events.has(eventName)) {
      this._events.set(eventName, []);
    }
    this._events.get(eventName).push({ listener, once: false });

    return this;
  }

  once(eventName, listener) {
    if (!this._events.has(eventName)) {
      this._events.set(eventName, []);
    }
    this._events.get(eventName).push({ listener, once: true });

    return this;
  }

  off(eventName, listener) {
    if (!this._events.has(eventName)) {
      return this;
    }

    const listeners = this._events.get(eventName);
    const index = listeners.findIndex((item) => item.listener === listener);

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    return this;
  }

  emit(eventName, ...args) {
    if (!this._events.has(eventName)) {
      return false;
    }

    const listeners = this._events.get(eventName);

    if (listeners.length === 0) {
      return false;
    }

    const toRemove = [];

    listeners.forEach((item, index) => {
      item.listener(...args);

      if (item.once) {
        toRemove.push(index);
      }
    });

    for (let i = toRemove.length - 1; i >= 0; i--) {
      listeners.splice(toRemove[i], 1);
    }

    return true;
  }

  prependListener(eventName, listener) {
    if (!this._events.has(eventName)) {
      this._events.set(eventName, []);
    }
    this._events.get(eventName).unshift({ listener, once: false });

    return this;
  }

  prependOnceListener(eventName, listener) {
    if (!this._events.has(eventName)) {
      this._events.set(eventName, []);
    }
    this._events.get(eventName).unshift({ listener, once: true });

    return this;
  }

  removeAllListeners(eventName) {
    if (eventName === undefined) {
      this._events.clear();
    } else {
      this._events.delete(eventName);
    }

    return this;
  }

  listenerCount(eventName) {
    if (!this._events.has(eventName)) {
      return 0;
    }

    return this._events.get(eventName).length;
  }
}

module.exports = MyEventEmitter;
