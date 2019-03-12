const schedule = require('node-schedule');
 
exports.schedulejob1 = function() {
    const schedulejob1 = schedule.scheduleJob('00 10 * * *', function() { //sec,min,hour,date,month,day

    });
};
