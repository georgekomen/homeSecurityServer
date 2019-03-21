const fs = require('fs');
const wav = require('wav');
const Speaker = require('speaker');

const file = fs.createReadStream('assets/audio/sample.wav');
const reader = new wav.Reader();

exports.readaudio = () => {
// the "format" event gets emitted at the end of the WAVE header
    reader.on('format', function (format) {

        // the WAVE header is stripped from the output of the reader
        reader.pipe(new Speaker(format));
    });

// pipe the WAVE file to the Reader instance
    file.pipe(reader);
};