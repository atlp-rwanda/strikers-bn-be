import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import dotenv from "dotenv";

dotenv.config();
chai.should();
chai.use(chaiHttp);

const server = require("../../src/index");

describe("Accommodation APIs", () => {
    /**
     * Test GET accommodations
     */
    describe("GET /api/v1/accommodations", () => {
        it("It should GET all accommodations", (done) => {
        chai.request(server)
            .get("/api/v1/accommodations")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                done();
            });
            
        });
    });    

    describe("GET /api/v1/accommodations/:accommodationId/like", () => {
        it("It should like or unlike accommodations", async () => {
            const { body } = await chai
                .request(server)
                .post("/api/v1/users/login")
                .send({ email: "abi_seth@gmail.com", password: "pass12345" });
            await chai.request(server)
                .get("/api/v1/accommodations/3fd8cb0c-b370-4673-8fe0-51b1e74d08aa/like")
                .set({ authorization: "Bearer " + body.token })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a("object");
                });
        });
    });


});
