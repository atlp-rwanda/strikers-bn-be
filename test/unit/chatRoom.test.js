import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import dotenv from "dotenv";

dotenv.config();
chai.should();
chai.use(chaiHttp);

const server = require("../../src/index");
describe('chat tests', () => {

    const message1 = {
        content: 'Hello world!',
        userId: 1,
        chatroomId: 1,
      };
    
      const message2 = {
        content: 'Example content.',
        userId: 1,
        chatroomId: 1,
      };
    
      const message3 = {
        content: 'Sometimes I get creative with seed data',
        userId: 1,
        chatroomId: 1,
      }; 
      
})
