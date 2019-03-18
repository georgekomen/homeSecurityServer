const shell = require('shelljs');

exports.accessshell = () => {
    const readserial = () => {
        shell.echo('"AT" > /dev/ttyS0');
        var str = shell.cat('/dev/ttyS0');
        console.log(str);
    }

    const readSerial = setInterval(readserial, 250);
}