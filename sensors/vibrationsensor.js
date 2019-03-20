const five = require("johnny-five");
let button, led;

exports.senseVibration = () => {
    five.Board().on("ready", () => {
        button = new five.Button({
                                     pin: 14,
                                     isPullup: true
                                 });

        led = new five.Led(5);

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