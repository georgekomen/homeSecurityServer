const shell = require('shelljs');
const { spawn } = require('child_process');
const serialport = require('serialport');
const port = new serialport('/dev/ttyS0');

exports.accessshell = () => {
    const readserial = () => {
        // commandExe('echo \'AT\' > /dev/ttyS0');
        const child = spawn('cat /dev/ttyS0');
        // const child = spawn('pwd');

        console.log(port);

        process.stdin.pipe(child.stdin);

        child.stdout.on('data', (data) => {
            console.log(`child stdout:\n${data}`);
        });

        child.stderr.on('data', (data) => {
            console.error(`child stderr:\n${data}`);
        });

        child.on('error', (data) => {
            console.error(`child error:\n${data}`);
        });


    }

    readserial();
}


