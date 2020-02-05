import { TchatMessage } from "../../core/DBDataModel";
import { TchatError } from "../../core/Error";
import * as dao from "./messages.dao";

export const addMessage = async (message: string, username: string): Promise<TchatMessage> => {
    if (!message || message.length === 0) {
        throw new TchatError(400, 'Empty message');
    }
    return dao.addMessage(message, username);
}

export const getMessages = async (): Promise<TchatMessage> => {
    return dao.getMessages();
}