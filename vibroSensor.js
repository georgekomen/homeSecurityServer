const Gpio = require('onoff').Gpio;
const button = new Gpio(14, 'in', 'both');

exports.senseVibration = () => {
    button.watch((err, value) => {
        console.log(value);
    });
}
