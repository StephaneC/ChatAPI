import { addMessage, getMessages } from "./business";

export const addMessageHanlder = async (req, res) => {
    console.log(`add message ${req.body.message}`)
    const user = req.user;
    console.log('user');
    const message = req.body.message;
    const msg = await addMessage(message, user.username);
    console.log('Message aded', msg);
    res.json({ success: true, message: msg }); 
}

export const getMessagesHanlder = async (req, res) => {
    const msgs = await getMessages();
    res.json({ success: true, messages: msgs }); 
}

export const updateMessageHanlder = async (req, res) => {

}

export const deleteMessageHanlder = async (req, res) => {

}