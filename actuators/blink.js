const five = require("johnny-five");
const Raspi = require("raspi-io");
const board = new five.Board({
                               io: new Raspi()
                           });
exports.blinkled = () => {
    board.on("ready", () => {
        console.log('blink ready');
        const led = new five.Led('GPIO5');
        led.blink(1000);
    });
};