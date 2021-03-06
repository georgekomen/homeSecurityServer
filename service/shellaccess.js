const { spawn } = require('child_process');

exports.accessshell = () => {
    const readserial = () => {
        // commandExe('echo \'AT\' > /dev/ttyS0');
        const child = spawn('/dev/ttyS0');
        // const child = spawn('pwd');

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
    };
    readserial();
};


