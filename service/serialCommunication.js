const serialport = require('serialport');
const default_settings =
    { baudRate: 9600, autoOpen: false, lock: false, dataBits: 8,
        parity: 'none', stopBits: 1, flowControl: false };
const port = new serialport('/dev/ttyS0', default_settings);
const Readline = require('@serialport/parser-readline');
const parserReadLine =  new Readline({ delimiter: '\r\n' });
// const Delimiter = require('@serialport/parser-delimiter');
// const parserDelimeter = new Delimiter({ delimiter: '\r\n' });

exports.serialcommunication = () => {
    // port.pipe(parserDelimeter);
    port.pipe(parserReadLine);

    port.open( (err) => {
        if (err) {
            return console.log('Error opening port: ', err.message)
        }

        // port._write(Buffer.from('AT', 'ascii'));
        port.write(Buffer.from('AT', 'ascii'), function(err) {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written');
        });

        parserReadLine.on('data', data => {
            console.log(`> ${data}`);
            if(data.includes('RING')) {
                console.log('receiving call');
                port.write('ATA\r');
            }
        });

        // Open errors will be emitted as an error event
        port.on('error', (err) => {
            console.log('Error: ', err.message);
        });
    });
};
