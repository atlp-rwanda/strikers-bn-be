import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import dotenv from "dotenv";

dotenv.config();
chai.should();
chai.use(chaiHttp);

const server = require("../../src/index");

const TEST_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiODZmMzI5YjQtYWIzZi00Y2QzLWJlYTMtYTUyNzc0NWZiY2ZiIiwiZW1haWwiOiJhYmlfc2V0aEBnbWFpbC5jb20iLCJyb2xlSWQiOiIwMTQxYzFhZS00MmExLTRiM2YtOWUyZC1iNzM2OWU5ZmY3ZDYiLCJpYXQiOjE2NTYwOTA2MDN9.k73YmxHw5bKaMZ-kyQNfMUc8N8xmTi9iX3YjjtBbhh0";

// Test for feedback creation
describe("feedback tests", () => {
  it("it should create a feedback", (done) => {
    chai
      .request(server)
      .post("/api/v1/feedback/5a01d786-0a99-41f0-a14e-e7688c76c12e")
      .set("Authorization", `Bearer ${TEST_TOKEN}`)
      .send({
        feedback: "This is a test feedback",
        userId: "5e9f8f8f-f8f8-f8f8-f8f8-f8f8f8f8f8f8",
      })
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("status");
        res.body.should.have.property("message");
        res.body.should.have.property("data");
        res.body.data.should.be.a("object");
        res.body.data.should.have.property("feedbackId");
        res.body.data.should.have.property("userId");
        res.body.data.should.have.property("accomodationId");
        res.body.data.should.have.property("feedback");
        res.body.data.should.have.property("createdAt");
        res.body.data.should.have.property("updatedAt");
        done();
      });
  }).timeout(10000);
  it("it should not create an empty feedback", (done) => {
    chai
      .request(server)
      .post("/api/v1/feedback/5a01d786-0a99-41f0-a14e-e7688c76c12e")
      .set("Authorization", `Bearer ${TEST_TOKEN}`)
      .send({
        userId: "5e9f8f8f-f8f8-f8f8-f8f8-f8f8f8f8f8f8",
      })
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("status");
        res.body.should.have.property("message");
        done();
      });
  }).timeout(10000);
  it("it should not create a feedback without userId", (done) => {
    chai
      .request(server)
      .post("/api/v1/feedback/5a01d786-0a99-41f0-a14e-e7688c76c12e")
      // .set("Authorization", `Bearer ${TEST_TOKEN}`)
      .send({
        feedback: "This is a test feedback",
      })
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(403);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        done();
      });
  }).timeout(10000);
  // it("should get all feedbacks", done => {
  //     chai
  //         .request(server)
  //         .get("/api/v1/feedback")
  //         .set("Authorization", `Bearer ${TEST_TOKEN}`)
  //         .end((err, res) => {
  //             console.log(res.body);
  //             res.should.have.status(200);
  //             res.body.should.be.a("object");
  //             res.body.should.have.property("success");
  //             res.body.should.have.property("status");
  //             res.body.should.have.property("message");
  //             res.body.should.have.property("data");
  //             res.body.data.should.be.a("array");
  //             done();
  //         }
  //         );
  // }
  // ).timeout(10000);
  // it("should get a feedback", done => {
  //     chai
  //         .request(server)
  //         .get("/api/v1/feedback/5a01d786-0a99-41f0-a14e-e7688c76c12e")
  //         .set("Authorization", `Bearer ${TEST_TOKEN}`)
  //         .end((err, res) => {
  //             console.log(res.body);
  //             res.should.have.status(200);
  //             res.body.should.be.a("object");
  //             res.body.should.have.property("success");
  //             res.body.should.have.property("status");
  //             res.body.should.have.property("message");
  //             res.body.should.have.property("data");
  //             res.body.data.should.be.a("object");
  //             res.body.data.should.have.property("feedbackId");
  //             res.body.data.should.have.property("userId");
  //             res.body.data.should.have.property("accomodationId");
  //             res.body.data.should.have.property("feedback");
  //             res.body.data.should.have.property("createdAt");
  //             res.body.data.should.have.property("updatedAt");
  //             done();
  //         }
  //         );
  // }
  // ).timeout(10000);
  // it("should not get a feedback", done => {
  //     chai
  //         .request(server)
  //         .get("/api/v1/feedback/5a01d786-0a99-41f0-a14e-e7688c76c12e")
  //         .set("Authorization", `Bearer ${TEST_TOKEN}`)
  //         .end((err, res) => {
  //             console.log(res.body);
  //             res.should.have.status(404);
  //             res.body.should.be.a("object");
  //             res.body.should.have.property("success");
  //             res.body.should.have.property("status");
  //             res.body.should.have.property("message");
  //             done();
  //         }
  //         );
  // }
  // ).timeout(10000);
  it("should not update a feedback", (done) => {
    chai
      .request(server)
      .put("/api/v1/feedback/5a01d786-0a99-41f0-a14e-e7688c76c12e")
      .set("Authorization", `Bearer ${TEST_TOKEN}`)
      .send({
        feedback: "This is a test feedback",
        userId: "5e9f8f8f-f8f8-f8f8-f8f8-f8f8f8f8f8f8",
      })
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(404);
        done();
      });
  }).timeout(10000);
  it("should not delete a feedback if it doesn't exist", (done) => {
    chai
      .request(server)
      .delete("/api/v1/feedback/5a01d786-0a99-41f0-a14e-e7688c76c12e")
      .set("Authorization", `Bearer ${TEST_TOKEN}`)
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("status");
        res.body.should.have.property("message");
        done();
      });
  }).timeout(10000);
});