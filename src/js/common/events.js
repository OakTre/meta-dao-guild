const handlers = {};

export function subscribe(eventName, handler) {
  if (!handlers[eventName]) handlers[eventName] = [];
  handlers[eventName].push(handler);
}

export function emit(eventName, payload) {
  (handlers[eventName] || []).forEach((handler) => {
    handler(payload);
  });
}
