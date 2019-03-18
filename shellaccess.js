const shell = require('shelljs');
const exec = require('child_process').exec;


exports.accessshell = () => {
    const readserial = () => {
        // commandExe('\'AT\' > /dev/ttyS0');
        commandExe('cat /dev/ttyS0');
    }

    const commandExe = (command) => {
        console.log(command);
        exec(command, (error, stdout, stderr) => {
            console.log(`stdout: ${stdout}`);

            if (error) {
                console.log(`exec error: ${error}`);
            }

            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
        });
    }

    const readSerial = setInterval(readserial, 3000);
}


