exports.serialcommunication = () => {
    const serialport = require('serialport');
    const default_settings = {baudRate: 9600, autoOpen: false };
    const port = new serialport('/dev/serial0', default_settings);
    const Readline = require('@serialport/parser-readline');
    const Delimiter = require('@serialport/parser-delimiter')
    const parserReadLine =  port.pipe(new Readline());
    const parserDelimeter = port.pipe(new Delimiter({ delimiter: '\r\n' }))


    port.open((err) => {
        if (err) {
            return console.log('Error opening port: ', err.message);
        }

        parserReadLine.on('data', line => {
            console.log(`> ${line}`);
            if(line.includes('RING')){
                console.log('receiving call');
                port.write('ATA');
            }
        });

        // port.on('data', data => console.log('data', data));

        port.on('error', (err) => {
            console.log('serial error!');
        });

    });
}
