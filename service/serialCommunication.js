const serialport = require('serialport');
const default_settings = {baudRate: 9600, autoOpen: false };
const port = new serialport('/dev/ttyS0', default_settings);
const Readline = require('@serialport/parser-readline');
const parserReadLine =  new Readline({ delimiter: '\r\n' });
// const Delimiter = require('@serialport/parser-delimiter');
// const parserDelimeter = new Delimiter({ delimiter: '\r\n' });

exports.serialcommunication = () => {
    // port.pipe(parserDelimeter);
    port.pipe(parserReadLine);
    port.open((err) => {
        if (err) {
            return console.log('Error opening port: ', err.message);
        }
        console.log('serial open');
        parserReadLine.on('data', data => {
            console.log(`> ${data}`);
            if(data.includes('RING')) {
                setTimeout(() => {
                    console.log('receiving call');
                    port.write('ATA', 'utf8');
                    port.drain((err, res) => {
                        console.log(err);
                        console.log(res);
                    });
                }, 1000);
            }
        });

        setTimeout(() => {
            console.log('test write');
            port.write("AT", "ascii");
            port.drain((err, res) => {
                console.log(err);
                console.log(res);
            });
        }, 500);
    });
}
