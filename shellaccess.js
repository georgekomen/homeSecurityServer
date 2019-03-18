const shell = require('shelljs');
const exec = require('child_process').exec;


exports.accessshell = () => {
    const readserial = () => {
        shell.echo('\'AT\' > /dev/ttyS0');
        var str = cat('/dev/ttyS0');
        console.log(str);

        const child = exec('pwd', (error, stdout, stderr) => {
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
    }

    const readSerial = setInterval(readserial, 250);
}


