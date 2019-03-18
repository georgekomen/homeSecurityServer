const shell = require('shelljs');
const { spawn } = require('child_process');

exports.accessshell = () => {
    const readserial = () => {
        // commandExe('echo \'AT\' > /dev/ttyS0');
        const child = spawn('cat /dev/ttyS0');

        process.stdin.pipe(child.stdin);

        child.stdout.on('data', (data) => {
            console.log(`child stdout:\n${data}`);
        });

        child.stderr.on('data', (data) => {
            console.error(`child stderr:\n${data}`);
        });
    }

    readserial();
}


