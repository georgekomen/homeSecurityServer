const serialport = require('serialport');
const default_settings = { baudRate: 9600, autoOpen: false, dataBits: 8, parity: 'none', stopBits: 1, rtscts: true };
const port = new serialport('/dev/ttyS0', default_settings);
const Readline = require('@serialport/parser-readline');
const parserReadLine =  new Readline({ delimiter: '\r\n' });

exports.serialcommunication = () => {
    port.pipe(parserReadLine);

    port.open((err) => {
        if (err) {
            return console.log('Error opening port: ', err.message)
        }

        port.set({dtr: true, rts: false}, (err) => {
            if(err) {
                console.log('Set Error: ', err.message);
            }
            console.log('Set Done');
        });

        port.write('AT\r\n');
        port.write('AT+CLIP=1\r\n');// display caller id

        setupInternet();
        getGpsLocation();
    });

    parserReadLine.on('data', data => {
        console.log(`> ${data}`);
        if(data.includes('RING')) {
            console.log('receiving call');
            port.write('AT+DDET=1\r\n'); //enable dtmf
            port.write('ATA\r\n'); //receive call

        }
        if(data.includes('DTMF')) {
            const code = data[data.length -1];
            port.write(`AT+VTS=${code}\r\n`);
        }
    });

    port.on('error', (err) => {
        console.log('Error: ', err.message);
    });

    const setupInternet = () => {
        port.write('AT+CGATT=1\r\n');
        port.write('AT+SAPBR=3,1,\"CONTYPE\",\"GPRS\"\r\n');
        port.write('AT+SAPBR=3,1,\"APN\",\"safaricom\"\r\n');
        // port.write('AT+SAPBR=3,1,\"APN\",\"internet\"\r\n');//airtel
        port.write('AT+SAPBR=1,1\r\n');//Enable the GPRS
        port.write('AT+SAPBR=2,1\r\n');//Query if the connection is setup properly
        port.write('AT+HTTPINIT\r\n');//enable http mode
    };

    const getGpsLocation = () => {
        setTimeout(() => {
            port.write('AT+CIPGSMLOC=1,1\r\n'); //get gps loc
        }, 5000);
    };
};
