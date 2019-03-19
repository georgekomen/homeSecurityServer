const serialport = require('serialport');
const default_settings = {baudRate: 9600, autoOpen: true, lock: false };
const port = new serialport('/dev/ttyS0', default_settings);
const Readline = require('@serialport/parser-readline');
const parserReadLine =  new Readline({ delimiter: '\r\n' });
// const Delimiter = require('@serialport/parser-delimiter');
// const parserDelimeter = new Delimiter({ delimiter: '\r\n' });

exports.serialcommunication = () => {
    // port.pipe(parserDelimeter);
    port.pipe(parserReadLine);
    parserReadLine.on('data', data => {
        console.log(`> ${data}`);
        if(data.includes('RING')) {
            console.log('receiving call');
            port.write('ATA');
            port.drain();
        }
    });

    port.write('AT');
    port.drain();

    // Open errors will be emitted as an error event
    port.on('error', (err) => {
        console.log('Error: ', err.message);
    });
};
