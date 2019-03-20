// We need this to build our post string
const querystring = require('querystring');
const https = require('https');
// Your login credentials
const username = 'georgekomen';
const apikey   = 'e36225a6e5630d73cfd37d66cdbf042a171161d5415d811e43ed96321f9cb556';

exports.sendMessage = (to, message) => {
    // Build the post string from an object
    const post_data = querystring.stringify({
        'username' : username,
        'to'       : to,
        'message'  : message,
        // 'from'     : 'SUNAMISOLAR'
    });
    
    const post_options = {
        host   : 'api.africastalking.com',
        path   : '/version1/messaging',
        method : 'POST',
        rejectUnauthorized : false,
        requestCert        : true,
        agent              : false,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length,
            'Accept': 'application/json',
            'apikey': apikey
        }
    };
    
    const post_req = https.request(post_options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            const jsObject   = JSON.parse(chunk);
            const recipients = jsObject.SMSMessageData.Recipients;
            if ( recipients.length > 0 ) {
                for (let i = 0; i < recipients.length; ++i ) {
                    let logStr  = 'number=' + recipients[i].number;
                    logStr     += ';cost='   + recipients[i].cost;
                    logStr     += ';status=' + recipients[i].status; // status is either "Success" or "error message"
                    logStr     += ';statusCode=' + recipients[i].statusCode;
                    console.log(logStr);
                    }
                } else {
                    console.log('Error while sending: ' + jsObject.SMSMessageData.Message);
            }
        });
    });

    // Add post parameters to the http request
    post_req.write(post_data);
    post_req.end();
};
