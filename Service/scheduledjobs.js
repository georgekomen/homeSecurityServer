const schedule = require('node-schedule');
 
exports.schedulejob1 = () => {
    schedule.scheduleJob('00 10 * * *', () => { //sec,min,hour,date,month,day

    });
};
