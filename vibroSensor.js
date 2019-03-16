const Gpio = require('onoff').Gpio;
const button = new Gpio(14, 'in', 'both');

exports.senseVibration = () => {
    button.watch((err, value) => {
        led.write(value);
        console.log(value);
    });
}
