const shell = require('shelljs');
const { spawn } = require('child_process');

exports.accessshell = () => {
    const readserial = () => {
        // commandExe('echo \'AT\' > /dev/ttyS0');
        const child = spawn('cat /dev/ttyS0');

        child.stdout.on('data', (data) => {
            console.log(`child stdout:\n${data}`);
        });
    }


    const readSerial = setInterval(readserial, 100);
}


