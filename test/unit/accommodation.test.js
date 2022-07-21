// import chai, { expect } from "chai";
// import chaiHttp from "chai-http";
// import dotenv from "dotenv";

// dotenv.config();
// chai.should();
// chai.use(chaiHttp);

// const server = require("../../src/index");

// describe("Accommodation APIs", () => {
//   /**
//    * Test GET route
//    */
//   let token = "";
//   before((done) => {
//     chai
//       .request(server)
//       .post("/api/v1/users/login")
//       .send({
//         email: "traveladmintest@gmail.com",
//         password: "12345678",
//       })
//       .end((err, res) => {
//         token = res.body.token;
//         done();
//       });
//   });
//   describe("GET /api/v1/accommodations", () => {
//     it("It should GET  all accommodation", async () => {
//       const res = await chai
//         .request(server)
//         .get("/api/v1/accommodations")
//         .set({ Authorization: `Bearer ${token}` });
//       expect(res).to.have.status(200);
//       expect(res.body).to.be.a("array");
//     });

//     it("It should NOT GET a list of all accommodation", async () => {
//       const res = await chai
//         .request(server)
//         .get("/api/v1/accommodations")
//         .set({ Authorization: `Bearer ${token}` });
//       expect(res).to.have.status(200);
//     });
//   });
// });
