import { DynamoDB } from 'aws-sdk';
import { generateId } from "../../core/utils";
import { TchatMessage } from '../../core/DBDataModel';

const YEAR = 365*24*60*60*1000;
const DB = process.env.MESSAGES_DB
export const addMessage = async (message: string, username: string): Promise<any> => {
    console.log(`addMessages for ${username}`);
    const params = {
        TableName: DB,
        Item: {
            messages: message,
            id: generateId(),
            username: username,
            done: false,
            ts: Date.now()
        }
    }

    // write the todo to the database
    try {
        const dynamoDb = new DynamoDB.DocumentClient();
        await dynamoDb.put(params).promise();
    } catch (e) {
        console.log(`Error adding message ${username}`, e);
        throw e;
    }
}

export const getMessagesByUser = async (username: string): Promise<any> => {
    const params = {
        TableName: DB,
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
            return res.Items as Array<TchatMessage>;
    } catch (e) {
        console.log(`Error get messages for a user ${username}`, e);
        throw e;
    }
}

export const getMessages = async (): Promise<any> => {
    var params = {
        TableName: process.env.USERS_DB,
        KeyConditionExpression: "#ts > :ts",
        ExpressionAttributeValues: {
            ':ts': Date.now()-YEAR
        }
    };

    try {
        console.log({ params });
        const dynamoDb = new DynamoDB.DocumentClient();
        const res = await dynamoDb.query(params).promise();
        console.log('called query');
        return res.Items as Array<TchatMessage>;
    } catch (e) {
        console.log(`Error get users`, e);
        throw e;
    }
}