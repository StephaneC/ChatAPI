/**
 * Model exposed
 */

export class User {
    username: string;
    ts: number;
    urlPhoto: string;
}

export class TchatMessage {
    id: string;
    username: string;
    ts: number;
    message: string;
    done: string;
}
