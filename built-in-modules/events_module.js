// EventEmitter is class returned by events module.
const EventEmitter = require("node:events");

const emitter = new EventEmitter();

// respond to event
emitter.on("order-pizza", () => {
  console.log("Order recived !");
});

// specify the event
emitter.emit("order-pizza");

// passing arguments from event
emitter.on("order-soap", (soapType, total) => {
  console.log(`ordered ${soapType} of total: ${total}`);
});

emitter.emit("order-soap", "mysoorsandle", 10);
