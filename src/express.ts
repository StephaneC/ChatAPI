import express = require('express');
import jwt from 'express-jwt';
import * as  bodyParser from 'body-parser';

import { authenticationHanlder, addUserHanlder, getUsersHanlder } from './features/authentication/handler';
import { logError, errorHandler } from './core/ErrorsHandlers';
import { asyncMiddleware } from './core/utils';
import { addMessageHanlder, getMessagesHanlder, updateMessageHanlder } from './features/messages/handler';

export interface ServerOptions {
    // Path contenant toutes les ressources statiques (css, js...)
    static: string;
    // Port de votre serveur
    port: number;
}

const jwtMW = jwt({
    secret: process.env.JWT_SECRET
});
const front = './front/dist/CKFront';


export class Express {

    public app: express.Application;

    constructor(public options: ServerOptions) {
        //create expressjs application
        this.app = express();
        //configure application
        this.app.set('port', this.options.port);
        this.config();
    }

    private cors(req, res, next) {
        const d1 = Date.now();
        console.log('Entered Cords - ' + d1);
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
        // intercept OPTIONS method
        if ('OPTIONS' == req.method) {
            res.sendStatus(200);
            const d2 = Date.now() - d1;
            console.log('end Cords - took = ' + d2);
            return;
        }
        else {
            next();
        }
    }

    /**
     * Configure application
     */
    public config() {

        // config input
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        // cors
        this.app.use(this.cors);
        // html
        this.app
            .use(express.static(front))
        // Default route
        this.app.use('/', express.static(front));

        // config JWT interceptor
        this.app.use(jwtMW.unless({
            path:
                ['/ping', '/hello', '/signin', '/signup', '/img']
        }));
        // error handlers
        //this.app.use(methodOverride());
        this.app.use(function (err, req, res, next) {
            console.log("JWT error handler", err);
            if (err.name === 'UnauthorizedError') {
                res.status(401).send({ message: "invalid token" });
            } else {
                next();
            }
        });
        // Users handlers
        this.app
            .post('/ping', (req, res) => {
                res.end('pong');            
            });
        this.app
            .get('/hello', (req, res) => {
                console.log('hello ' + req.param('name', null));
                res.end('hello ' + req.param('name', null));
            });

        // Users handlers
        this.app
            .post('/signin', asyncMiddleware(authenticationHanlder));
        this.app
            .post('/signup', asyncMiddleware(addUserHanlder));
        this.app
            .get('/users', asyncMiddleware(getUsersHanlder));

        this.app
            .post('/messages', asyncMiddleware(addMessageHanlder));
        this.app
            .get('/messages', asyncMiddleware(getMessagesHanlder));
        this.app
            .get('/messages/:id', asyncMiddleware(updateMessageHanlder));
        this.app
            .delete('/messages/:id', asyncMiddleware(updateMessageHanlder));

        // interceptors at the end to manage errors.
        this.app.use(logError);
        this.app.use(errorHandler);
    }

    /**
     * Bootstrap the application.
     */
    public static bootstrap(options: ServerOptions): Express {
        console.log("Try to start server");
        return new Express(options);
    }

}