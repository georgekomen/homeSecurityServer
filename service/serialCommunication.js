const serialport = require('serialport');
const default_settings = {baudrate: 9600, parser: serialport.parsers.readline("\n")};

const port = new serialport.SerialPort('/dev/serial0', default_settings, false);

exports.serialcommunication = () => {
    port.open((err) => {
        if (err) {
            return console.log('Error opening port: ', err.message);
        }
        console.log('serial open');

        port.write('AT\r', (err, results) => {
            console.log(err, results);
        });
    });

    // Switches the port into "flowing mode"
    port.on('data', (data) => {
        console.log('Data:', data);
    });

    // Read data that is available but keep the stream in "paused mode"
    // port.on('readable', () => {
    //     console.log('serial in');
    //     console.log('Data:', port.read());
    // });

    port.on('error', (err) => {
        console.log('node-serialport error!!!');
    });
}
