const serialport = require('serialport');
const default_settings = {baudRate: 9600, autoOpen: false };
const port = new serialport('/dev/serial0', default_settings);
const Readline = require('@serialport/parser-readline');
const parser = new Readline();

exports.serialcommunication = () => {
    port.pipe(parser);
    port.open((err) => {
        if (err) {
            return console.log('Error opening port: ', err.message);
        }

        parser.on('data', line => console.log(`> ${line}`));

        port.on('error', (err) => {
            console.log('serial error!');
        });

        port.write(new Buffer.from("AT\r"), (err, res) => {
            console.log(err, res);
        });

    });
}
