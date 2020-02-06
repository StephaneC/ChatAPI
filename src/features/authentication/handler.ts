import * as  jwt from 'jsonwebtoken';
import { authenticateUser, addUser } from './services';
import { TchatError } from '../../core/Error';
import { getUsers } from './user.dao';

export const authenticationHanlder = async (req, res) => {
    console.log(`Will try to authenticate ${req.param.username}`)
    let user;
    try {
        user = await authenticateUser(req.body.username, req.body.pwd)
    } catch (e) {
        res.status(500).json({
            error: {
                message: 'Error happened!'
            }
        });
        return;
    }
    if (user) {
        res.json({
            success: true,
            jwt: jwt.sign({
                username: user.username,
                user: user.user,
            }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
        });
    } else {
        /*
         * If the username or password was wrong, return 401 ( Unauthorized )
         * status code and JSON error message
         */
        res.status(401).json({
            error: {
                message: 'Wrong username or password!'
            }
        });
    }
}

export const addUserHanlder = async (req, res) => {
    console.log(`Will try to add User ${req.body.username}`)
    try {
        if (!req.body.username) {
            throw new TchatError(400, 'Miss username');
        }
        await addUser(req.body.username, req.body.pwd, req.body.urlPhoto);
        res.json({
            success: true
        });
    } catch (e) {
        res.json({
            success: false,
            error: {
                message: e
            }
        });
    }
}

export const getUsersHanlder = async (req, res) => {
    const users = await getUsers();
    res.json({ success: true, users: users }); 
}