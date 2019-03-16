const Gpio = require('onoff').Gpio;
const button = new Gpio(14, 'in', 'rising', {debounceTimeout: 40});

exports.senseVibration = () => {
    button.watch((err, value) => {
        console.log(value);
    });
}
