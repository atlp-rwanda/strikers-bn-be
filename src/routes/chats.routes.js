import express from "express";
import { verifyToken } from "../middlewares/auth";
import { getRooms,addMessage,addRoom,getNewMessages,getMessages } from '../controllers/chat.controller';

const chatRouter = express.Router();

/**
 * @description to get all chatrooms
 * @api api/v1/chat/
 * @access Public
 * @type GET
 */
chatRouter.get('/',verifyToken, getRooms );
/**
 * @description to add new room
 * @api api/v1/chat/
 * @access Public
 * @type POST
 */
chatRouter.post('/',verifyToken, addRoom );

/**
 * @description to get new messages from chatroom since user logged in
 * @api api/v1/chat/messages/new
 * @access Public
 * @type GET
 */
chatRouter.get('/messages/new',verifyToken,getNewMessages);

/**
 * @description to get all messages of a chatroom
 * @api api/v1/chat/:chatroomId/messages
 * @access Public
 * @type GET
 */
chatRouter.get('/:chatroomId/messages',verifyToken,getMessages);

/**
 * @description to to add a message
 * @api api/v1/chat/:chatroomId/messages
 * @access Public
 * @type POST
 */
chatRouter.post('/:chatroomId/messages',verifyToken,addMessage)

export default chatRouter;