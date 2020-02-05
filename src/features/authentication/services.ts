import * as bcrypt from 'bcryptjs';
import { TchatError } from '../../core/Error';
import * as userDAO from './user.dao';
import { User } from '../../core/DBDataModel';

const saltRounds = 10;

export const authenticateUser = async (login: string, password: string): Promise<User | null> => {
    if (!login || !password) {
        throw new TchatError(400, "missing username or password");
    }
    try {
        const user = await userDAO.getUser(login);
        console.log('Found User', user)
        let isSame = false;
        if (user) {
            isSame = bcrypt.compareSync(password, user.password);
        }
        if (isSame)
            return user;
        else return null;
    } catch (e) {
        console.error(`Error authenticating user ${login}`, e);
        throw e;
    }
}

export const addUser = async (login: string, password: string, urlPhoto?: string) => {
    if (!login || !password) {
        throw new TchatError(400, "missing username or password");
    }
    try {
        const user = await userDAO.getUser(login);
        console.log('Found User before adding', user)
        if (user) {
            console.error(`User already exist ${login}`);
            throw new TchatError(500, 'User already exist');
        }
    } catch (e) {
        if (e instanceof TchatError) {
            throw (e)
        } else {
            throw new TchatError(500, 'Error checking user');
        }
    }
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return await userDAO.addUser(login, hash, urlPhoto);
    } catch (e) {
        console.error(`Error adding user ${login}`, e);
        throw (new TchatError(500, 'Error adding user'))
    }
}