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

        setTimeout(() => {
            port.write('AT\n\r', (err, results) => {
                console.log('writing serial');
                console.log(err, results);
            });
        }, 500);

        setTimeout(() => {
            port.write('AT\r\n', (err, results) => {
                console.log('writing serial2');
                console.log(err, results);
            });
        }, 1000);

        setTimeout(() => {
            port.write('AT', (err, results) => {
                console.log('writing serial3');
                console.log(err, results);
            });
        }, 1500);

    });
}
