const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyS0', { autoOpen: false });

exports.serialcommunication = () => {
    port.open((err) => {
        if (err) {
            return console.log('Error opening port: ', err.message);
        }

        // Because there's no callback to write, write errors will be emitted on the port:
        port.write('main screen turn on')
    });

    // The open event is always emitted
    port.on('open', () => {
        // open logic
    });

    // Read data that is available but keep the stream in "paused mode"
    port.on('readable', () => {
        console.log('serial in');
        console.log('Data:', port.read());
    });
}
