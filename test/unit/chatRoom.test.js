import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import dotenv from "dotenv";

dotenv.config();
chai.should();
chai.use(chaiHttp);

const server = require("../../src/index");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNzQ5NDcwOTItZmIxZC00MmQyLWE1YWYtMjkyMzNiNjcyOTc4IiwiZW1haWwiOiJicnVjZTI1MEBnbWFpbC5jb20iLCJyb2xlSWQiOiJjMWYxZDJiZi0zM2JkLTRlMTEtOWQ3YS0wMzMxZGI0NjVmOTUiLCJpYXQiOjE2NTkyOTc5Mzl9._RwzaORz9dgL2p9RnXURaJ-5GSFlWo5k8XgBuZ0WmmI";

describe("chat tests", () => {
  describe("api/v1/chat", () => {
    it("should create new chat room", (done) => {
      const chatroom = {
        name: "room1",
      };
      chai
        .request(server)
        .post("/api/v1/chat")
        .set("Authorization", `Bearer ${token}`)
        .send(chatroom)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });
    it("get all chatrooms", (done) => {
      chai
        .request(server)
        .get("/api/v1/chat")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(200);
          done();
        });
    });
  });
  describe("/api/v1/chat/roomId/messages ", () => {
    it("should add message in specific room", (done) => {
      const message1 = {
        message: 'Hello world!'
      };
      chai
      .request(server)
      .post("/api/v1/chat/1/messages")
      .set("Authorization", `Bearer ${token}`)
      .send(message1)
      .end((err,res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();        
      })
    });
    it("should get messages from specific room", (done) => {
      chai
      .request(server)
      .get("/api/v1/chat/1/messages")
      .set("Authorization", `Bearer ${token}`)
      .end((err,res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();        
      })
    });
    it("should get new messages from specific room", (done) => {
      chai
      .request(server)
      .get("/api/v1/chat/1/messages/new")
      .set("Authorization", `Bearer ${token}`)
      .end((err,res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();        
      })
    });

  });
});