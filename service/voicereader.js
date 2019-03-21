const fs = require('fs');
const wav = require('wav');
const Speaker = require('speaker');
const file = fs.createReadStream('assets/audio/sample.wav');//Float32Array
const reader = new wav.Reader();

exports.readaudio = (serialport) => {
    const playvoice = () => {
        // the "format" event gets emitted at the end of the WAVE header
        reader.on('format', function (format) {
            // the WAVE header is stripped from the output of the reader
            reader.pipe(new Speaker(format));
        });
        // pipe the WAVE file to the Reader instance
        file.pipe(reader);
    };

    const streamaudiofile = (serialport) => {
        serialport.write('AT+FCLASS=8\r');//Enter Voice Mode
        serialport.write('AT+VSM=128,8000\r');//Compression Method: 8-bit linear / Sampling Rate: 8000MHz
        serialport.write('AT+VLS=1\r');//put modem into TAD mode
        serialport.write('AT+VTX\r');//put modem into TAD mode
        serialport.write(file[0]);
        // serialport.write(Buffer.from(file.buffer));
    };

    streamaudiofile(serialport);
};