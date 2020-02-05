import {Express, ServerOptions} from './express';
const serverless = require('serverless-http');

const options = {
//    static: `src/main/static`,
    port: 8080
} as ServerOptions;

const server = Express.bootstrap(options).app;

/*const s = http.createServer(server)
    .listen(options.port)
    .on("listening", () => console.debug('Listening on port ' + options.port));
s.timeout = 30000;
*/
module.exports.handler = serverless(server);
