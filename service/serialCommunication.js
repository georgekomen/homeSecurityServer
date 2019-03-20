const serialport = require('serialport/test'); // TODO - remove /test
const default_settings = { baudRate: 9600, autoOpen: true, dataBits: 8, parity: 'none', stopBits: 1 };

const MockBinding = serialport.Binding;// TODO remove
MockBinding.createPort('/dev/ROBOT', { echo: true, record: true }); //TODO remove

const port = new serialport('/dev/ROBOT', default_settings);//TODO - change /dev/ROBOT to /dev/ttyS0
const Readline = require('@serialport/parser-readline');
const parserReadLine =  new Readline({ delimiter: '\r\n' });

// const Delimiter = require('@serialport/parser-delimiter');
// const parserDelimeter = new Delimiter({ delimiter: '\r\n' });

exports.serialcommunication = () => {
    // port.pipe(parserDelimeter);
    port.pipe(parserReadLine);

    // port._write(Buffer.from('AT', 'ascii'));
    port.write("AT+CMGF=1");
    port.write("\r");

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
};
