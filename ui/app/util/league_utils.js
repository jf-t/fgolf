const http = require('http');

export const apiGetLeagues = (currentUser, success, error) => {
    const options = {
        method: 'GET',
        hostname: 'localhost',
        port: '3000',
        path: '/leagues',
        headers: {
            sessionToken: currentUser.sessionToken
        }
    };

    const req = http.request(options, (res) => {
        res.setEncoding('utf8');

        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            success(JSON.parse(data));
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    req.end();
};
