const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyS0', { autoOpen: false, baudRate: 9600 });

exports.serialcommunication = () => {
    port.open((err) => {
        if (err) {
            return console.log('Error opening port: ', err.message);
        }
        console.log('serial open');

        // Because there's no callback to write, write errors will be emitted on the port:
        port.write('AT+CGSN');
    });

    // The open event is always emitted
    port.on('open', () => {
        // open logic
        console.log('serial open event');
    });

    // Read data that is available but keep the stream in "paused mode"
    port.on('readable', () => {
        console.log('serial in');
        console.log('Data:', port.read());
    });
}
