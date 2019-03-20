const five = require("johnny-five");
const board = new five.Board();

exports.blinkled = () => {
    board.on("ready", () => {
        console.log('johnny ready');
        // Create an Led on pin 5
        const led = new five.Led(5);
        // Blink every half second
        led.blink(500);
    });
};