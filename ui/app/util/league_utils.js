const http = require('http');

export const apiGetLeagues = (currentUser, success, error) => {
    const options = {
        method: 'GET',
        hostname: 'localhost',
        port: '3000',
        path: '/leagues',
        headers: {
            'Access-Control-Request-Headers': 'sessionToken',
            'sessionToken': currentUser.sessionToken
        }
    };

    let response = "";
    const req = http.request(options, (res) => {
        res.setEncoding('utf8');

        res.on('data', (chunk) => {
            response += chunk;
        });
        res.on('end', () => {
            success(JSON.parse(response));
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    req.end();
};


export const apiGetLeague = (currentUser, id, success, error) => {
    const options = {
        method: 'GET',
        hostname: 'localhost',
        port: 3000,
        path: `/league/${id}`,
        headers: {
            'Access-Control-Request-Headers': 'sessionToken',
            'sessionToken': currentUser.sessionToken
        }
    };

    let response = "";
    const req = http.request(options, (res) => {
        res.setEncoding('utf8');

        res.on('data', (chunk) => {
            response += chunk;
        });

        res.on('end', () => {
            success(JSON.parse(response));
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    req.end();
}
