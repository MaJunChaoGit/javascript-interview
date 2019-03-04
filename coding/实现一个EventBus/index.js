class EventBus {
  constructor() {
    this.eventList = new Map();
  }
  $on(eventName, fn) {
    if (this.eventList.get(eventName)) {
      console.error(`duplicated event`);
      return;
    }
    this.eventList.set(eventName, fn);
    return {
      remove: () => {
        this.eventList.delete(eventName);
      }
    }
  }
  $emit(eventName, ...args) {
    let fn = this.eventList.get(eventName);
    if (!fn) {
      console.error(`event undefined`);
      return;
    }
    fn.call(this, ...args);
  }
}
