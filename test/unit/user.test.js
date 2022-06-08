import chai from "chai";
import chaiHttp from "chai-http";
import dotenv from "dotenv";

dotenv.config();
chai.should();
chai.use(chaiHttp);

const server = require("../../src/index");

describe("POST /api/v1/user", () => {
  /**
   * Should POST a new user
   */

  const userId = Math.floor(Math.random() * 1000);

  it("It should POST a new user", (done) => {
    const newUser = {
      firstName: `Abi${userId}`,
      lastName: `Seth${userId}`,
      email: `abi${userId}@gmail.com`,
      roleId: "e2a8b398-b658-4606-9b17-b9152792e875",
      phoneNumber: "0781294147",
      password: "pass12345",
    };

    chai
      .request(server)
      .post("/api/v1/user/register")
      .send(newUser)
      .end((err, response) => {
        response.should.have.status(201);
        response.should.be.a("object");
        response.body.should.have.property("success").eq(true);
        response.body.should.have
          .property("message")
          .eq("Account created. Please verify via email!");
        response.body.should.have.property("data").be.a("object");
        done();
      });
  });

  /**
   * Should NOT POST a duplicate user email
   */

  it("It should NOT POST a duplicate user email", (done) => {
    const newUser = {
      firstName: "Abi",
      lastName: "Seth",
      email: "abiseth@gmail.com",
      roleId: "e2a8b398-b658-4606-9b17-b9152792e875",
      phoneNumber: "0781294147",
      password: "pass12345",
    };

    chai
      .request(server)
      .post("/api/v1/user/register")
      .send(newUser)
      .end((err, response) => {
        response.should.have.status(403);
        response.body.should.have.property("success").eq(false);
        response.body.should.have
          .property("message")
          .eq("This email address has already been used!");
        done();
      });
  });

  it("Should sign in user", (done) => {
    chai
      .request(server)
      .post("/api/v1/user/login")
      .send({
        email: `abiheloaf@gmail.com`,
        password: "pass12345",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("token");
        done();
      });
  });
});
