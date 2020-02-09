import { DynamoDB } from 'aws-sdk';
import { generateId } from "../../core/utils";
import { User } from '../../core/DBDataModel';

const YEAR = 365*24*60*60*1000;

export const addUser = async (username: string, pwd: string, urlPhoto: string): Promise<any> => {
    console.log(`addUser ${username}`);
    const params = {
        TableName: process.env.USERS_DB,
        Item: {
            username: username,
            password: pwd,
            ts: Date.now()
        }
    }
    if (urlPhoto && urlPhoto.length >0) {
        params.Item['urlPhoto'] = urlPhoto;
    }

    // write the todo to the database
    try {
        const dynamoDb = new DynamoDB.DocumentClient();
        await dynamoDb.put(params).promise();
    } catch (e) {
        console.log(`Error adding user ${username}`, e);
        throw e;
    }
}

export const getUser = async (username: string): Promise<any> => {
    const params = {
        TableName: process.env.USERS_DB,
        KeyConditionExpression: 'username = :username',
        ExpressionAttributeValues: {
          ':username': username
        }
    };

    try {
        console.log({ params });
        const dynamoDb = new DynamoDB.DocumentClient();
        const res = await dynamoDb.query(params).promise();
        console.log('called query');
        if (res.Items && res.Items.length>0){
            return res.Items[0] as User;
        }
        return null;
    } catch (e) {
        console.log(`Error get user ${username}`, e);
        throw e;
    }
}

export const getUsers = async (): Promise<any> => {
    var params = {
        TableName: process.env.USERS_DB,
        ProjectionExpression: 'ts, username, urlPhoto',
        FilterExpression: "ts > :ts",
        ExpressionAttributeValues: {
            ':ts': Date.now()-YEAR
        }
    };

    try {
        console.log({ params });
        const dynamoDb = new DynamoDB.DocumentClient();
        const res = await dynamoDb.scan(params).promise();
        console.log('called query');
        return res.Items as Array<User>;
    } catch (e) {
        console.log(`Error get users`, e);
        throw e;
    }
}