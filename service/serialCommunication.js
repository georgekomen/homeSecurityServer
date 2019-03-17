const SerialPort = require('serialport');
const port = new SerialPort('/dev/serial0', { autoOpen: false, baudRate: 9600 });

exports.serialcommunication = () => {
    port.open((err) => {
        if (err) {
            return console.log('Error opening port: ', err.message);
        }
        console.log('serial open');
    });

    // Switches the port into "flowing mode"
    // port.on('data', (data) => {
    //     console.log('Data:', data);
    // });

    // Read data that is available but keep the stream in "paused mode"
    port.on('readable', () => {
        console.log('serial in');
        console.log('Data:', port.read());
    });

    port.on('error', (err) => {
        console.log('node-serialport error!!!');
    });
}
