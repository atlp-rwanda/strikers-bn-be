import chai, { expect } from "chai";
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
      roleId: "9340272366132983293",
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
      roleId: "9340272366132983293",
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

describe("GET /api/v1/users",()=>{
  /**
   * Test GET route
   */
   describe("GET /api/v1/user/users", () => {
    it("It should GET a list of all users", async () => {
      const res = await chai.request(server).get("/api/v1/user/users");
      expect(res).to.have.status(200);
      expect(res.body).to.be.a("array");
    });

    it("It should NOT GET a list of all users", async () => {
      const res = await chai.request(server).get("/api/user/all");
      expect(res).to.have.status(404);
    });
  });

  /**
   * Test GET route for specific role
   */
  describe("GET /api/v1/user/users/:uuid", () => {
    it("It should GET a specific user by its specific uuid", async () => {
      const uuid = "3f7c1962-ea61-4ceb-8130-2f6d32b661af",
        res = await chai.request(server).get("/api/v1/user/users/" + uuid);
      expect(res).to.have.status(200);
      expect(res.body).to.be.a("object");
    });

    it("It should NOT GET a specific user by its specific id (Non-existing user)", async () => {
      const uuid = "1234345445",
        res = await chai.request(server).get("/api/v1/user/users/" + uuid);
      expect(res).to.have.status(404);
    });
  });
});

