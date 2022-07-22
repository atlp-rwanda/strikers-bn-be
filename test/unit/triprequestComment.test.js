import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import dotenv from "dotenv";

dotenv.config();
chai.should();
chai.use(chaiHttp);

const server = require("../../src/index");

const TEST_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNzIxMTdhNDYtN2JhMi00OTVkLTg4NDYtMjIxMzEzNDcwYWQ0IiwiZW1haWwiOiJhYmloZWxvYWZAZ21haWwuY29tIiwicm9sZUlkIjoiYTc3YTUwYzItODlkMy00N2ZmLThkMjgtNDljMGMxN2VjOGE2IiwiaWF0IjoxNjU4MTgxMjk2fQ.nV7T-6r9sh0UUbu-LRFmW3zF8Pr1rbgRFdOZLQ6cWHE";

describe("Trip Request comment tests", () => {
    it("it should create a comment", done => {
        chai
            .request(server)
            .post("/api/v1/trips/124/comments/")
            .set("Authorization", `Bearer ${TEST_TOKEN}`)
            .send({
                userId: "5e9f8f8f-f8f8-f8f8-f8f8-f8f8f8f8f8f8"
            })
            .end((err, res) => {
                console.log(res.body)
                res.should.have.status(403);
                res.body.should.be.a("object");
                res.body.should.have.property("message");
                // res.body.should.have.property("data");
                done();
            });
    })
    it("it should not create an empty comment", done => {
        chai
            .request(server)
            .post("/api/v1/trips/124/comments/")
            .set("Authorization", `Bearer ${TEST_TOKEN}`)
            .send({
                userId: "5e9f8f8f-f8f8-f8f8-f8f8-f8f8f8f8f8f8"
            })
            .end((err, res) => {
                console.log(res.body);
                res.should.have.status(403);
                res.body.should.be.a("object");
                res.body.should.have.property("message");
                done();
            }
            );
    })
    it("it should not create a comment without userId", done => {
        chai
            .request(server)
            .post("/api/v1/trips/124/comments/")
            .send({
                comment: "This is a test comment"
            })
            .end((err, res) => {
                console.log(res.body);
                res.should.have.status(403);
                res.body.should.be.a("object");
                res.body.should.have.property("message");
                done();
            }
            );
    }
    )
    // it("should get all comment", done => {
    //     chai
    //         .request(server)
    //         .get("/api/v1/trips/124/comments/")
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
    )
    it("should delete a comment", done => {
        chai
            .request(server)            
            .delete("/api/v1/trips/124/comments/12")
            .set("Authorization", `Bearer ${TEST_TOKEN}`)  
            .end((err, res) => {
                console.log(res.body);
                res.should.have.status(404);
                res.body.should.be.a("object");
                res.body.should.have.property("success");
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                done();
            }
            );
    }
    )
    it("should not delete a comment if it doesn't exist", done => {
        chai
            .request(server)
            .delete("/api/v1/trips/:tripId/comments/12")
            .set("Authorization", `Bearer ${TEST_TOKEN}`)
            .end((err, res) => {
                console.log(res.body);
                res.should.have.status(404);
                res.body.should.be.a("object");
                res.body.should.have.property("success");
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                done();
            }
            );
    })

});