const http = require('http');

export const apiLogin = (user, success, error) => {
    const options = {
        method: 'POST',
        hostname: 'localhost',
        port: '3000',
        path: '/auth'
    }

    const req = http.request(options, (res) => {
        res.setEncoding('utf8');

        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    req.write(user);
    req.end();
};


export const apiSignup = (user, success, error) => {
    const options = {
        method: 'POST',
        hostname: 'localhost',
        port: '3000',
        path: '/user'
    };

    const req = http.request(options, (res) => {
        let data = '';

        // A chunk of data has been recieved.
        res.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        res.on('end', () => {
            success(JSON.parse(data));
        });

    }).on("error", (err) => {
        error(err.message);
    });
    req.write(user);
    req.end();
}
