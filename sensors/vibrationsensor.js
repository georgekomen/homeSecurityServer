const five = require("johnny-five");
const Raspi = require("raspi-io");
const board = new five.Board({
                                 io: new Raspi()
                             });
exports.senseVibration = () => {
    let button, led;
    board.on("ready", () => {
        console.log('sensor ready');
        button = new five.Button({
                                     pin: 'GPIO6',
                                     isPullup: true
                                 });

        led = new five.Led('GPIO12');

        button.on("down", (value) => {
            console.log(value);
            led.on();
        });

        button.on("up", (value) => {
            console.log(value);
            led.off();
        });
    });
};