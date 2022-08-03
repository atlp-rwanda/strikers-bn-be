// import chai, { expect } from "chai";
// import chaiHttp from "chai-http";
// import dotenv from "dotenv";

// dotenv.config();
// chai.should();
// chai.use(chaiHttp);

// const server = require("../../src/index");

// describe("POST /api/v1/users", () => {
//   /**
//    * Should POST a new user
//    */

//   const userId = Math.floor(Math.random() * 1000);

//   // it("It should POST a new user", (done) => {
//   //   const newUser = {
//   //     firstName: `Abi${userId}`,
//   //     lastName: `Seth${userId}`,
//   //     email: `abi${userId}@gmail.com`,
//   //     roleId: "c1f1d2bf-33bd-4e11-9d7a-0331db465f95",
//   //     phoneNumber: "0781294147",
//   //     password: "pass12345",
//   //   };

//   //   chai
//   //     .request(server)
//   //     .post("/api/v1/users/register")
//   //     .send(newUser)
//   //     .end((err, response) => {
//   //       response.should.have.status(201);
//   //       response.should.be.a("object");
//   //       response.body.should.have.property("success").eq(true);
//   //       response.body.should.have
//   //         .property("message")
//   //         .eq("Account created. Please verify via email!");
//   //       response.body.should.have.property("data").be.a("object");
//   //       done();
//   //     });
//   // });

//   /**
//    * Should NOT POST a duplicate user email
//    */

//   // it("It should NOT POST a duplicate user email", (done) => {
//   //   const newUser = {
//   //     firstName: "Abi",
//   //     lastName: "Seth",
//   //     email: "abiseth@gmail.com",
//   //     roleId: "c1f1d2bf-33bd-4e11-9d7a-0331db465f95",
//   //     phoneNumber: "0781294147",
//   //     password: "pass12345",
//   //   };

//   //   chai
//   //     .request(server)
//   //     .post("/api/v1/users/register")
//   //     .send(newUser)
//   //     .end((err, response) => {
//   //       response.should.have.status(403);
//   //       response.body.should.have.property("success").eq(false);
//   //       response.body.should.have
//   //         .property("message")
//   //         .eq("This email address has already been used!");
//   //       done();
//   //     });
//   // });

//   // it("Should sign in user", (done) => {
//   //   chai
//   //     .request(server)
//   //     .post("/api/v1/users/login")
//   //     .send({
//   //       email: `abiheloaf@gmail.com`,
//   //       password: "pass12345",
//   //     })
//   //     .end((err, res) => {
//   //       // res.should.have.status(200);
//   //       res.body.should.have.property("token");
//   //       done();
//   //     });
//   // });
// });

// describe("GET /api/v1/users",()=>{
//   /**
//    * Test GET route
//    */
//    describe("GET /api/v1/users/getusers", () => {
//     it("It should GET a list of all users", async () => {
//       const res = await chai.request(server).get("/api/v1/users/getusers");
//       expect(res).to.have.status(201);
//       expect(res.body).to.be.a("array");
//     });

//     it("It should NOT GET a list of all users", async () => {
//       const res = await chai.request(server).get("/api/users/all");
//       expect(res).to.have.status(404);
//     });
//   });


//   /**
//    * Test GET route for specific role
//    */
//   describe("GET /api/v1/user/users/:uuid", () => {
//     it("It should GET a specific user by its specific uuid", async () => {
//       const uuid = "72117a46-7ba2-495d-8846-221313470ad4",
//         res = await chai.request(server).get("/api/v1/users/" + uuid);
//       expect(res).to.have.status(200);
//       expect(res.body).to.be.a("object");
//     });
//   });
// });
