const serialport = require('serialport');
const default_settings = {baudRate: 9600, autoOpen: false };
const readline = require('@serialport/parser-readline');
const Delimiter = require('@serialport/parser-delimiter');
const port = new serialport('/dev/serial0', default_settings);
const parser = port.pipe(new Delimiter({ delimiter: '\n' }))

exports.serialcommunication = () => {
    const lineparser = new readline();
    port.pipe(lineparser);

    port.open((err) => {
        if (err) {
            return console.log('Error opening port: ', err.message);
        }
        console.log('serial open');

        parser.on('delimeter parser data', console.log) // emits data after every '\n'

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
