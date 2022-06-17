// import chai, { expect } from "chai";
// import chaiHttp from "chai-http";
// import dotenv from "dotenv";

// dotenv.config();
// chai.should();
// chai.use(chaiHttp);

// const server = require("../../src/index");

// describe("Accomodation APIs", () => {
//   /**
//    * Test GET route
//    */
//   describe("GET /api/v1/accommodation", () => {
//     it("It should GET  all accommodation", async () => {
//       const res = await chai.request(server).get("/api/v1/accommodation");
//       expect(res).to.have.status(200);
//       expect(res.body).to.be.a("object");
//     });

//     it("It should NOT GET a list of all accommodation", async () => {
//       const res = await chai.request(server).get("/api/v1/accommodation");
//       expect(res).to.have.status(404);
//     });
//   });
// });
