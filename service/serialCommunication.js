const serialport = require('serialport');
const default_settings = {baudRate: 9600, autoOpen: false };
const port = new serialport('/dev/serial0', default_settings);

exports.serialcommunication = () => {
    port.open((err) => {
        if (err) {
            return console.log('Error opening port: ', err.message);
        }

        // Switches the port into "flowing mode"
        port.on('data', (data) => {
            console.log('serial in');
            console.log('Data:', data);
        });

        port.on('error', (err) => {
            console.log('serial error!');
        });

        port.write('AT\r', (err, results) => {
            console.log('writing serial');
            console.log(err, results);
        });

    });
}
