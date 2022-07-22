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
//   describe("GET /api/v1/accommodations", () => {
//     it("It should GET  all accommodation", async () => {
//       const res = await chai.request(server).get("/api/v1/accommodations").set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNzIxMTdhNDYtN2JhMi00OTVkLTg4NDYtMjIxMzEzNDcwYWQ0IiwiZW1haWwiOiJhYmloZWxvYWZAZ21haWwuY29tIiwicm9sZUlkIjoiYTc3YTUwYzItODlkMy00N2ZmLThkMjgtNDljMGMxN2VjOGE2IiwiaWF0IjoxNjU4MTgxMjk2fQ.nV7T-6r9sh0UUbu-LRFmW3zF8Pr1rbgRFdOZLQ6cWHE");
//       expect(res).to.have.status(200);
//       expect(res.body).to.be.a("object")
//     });

//     it("It should NOT GET a list of all accommodation", async () => {
//       const res = await chai.request(server).get("/api/v1/accommodations").set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNzIxMTdhNDYtN2JhMi00OTVkLTg4NDYtMjIxMzEzNDcwYWQ0IiwiZW1haWwiOiJhYmloZWxvYWZAZ21haWwuY29tIiwicm9sZUlkIjoiYTc3YTUwYzItODlkMy00N2ZmLThkMjgtNDljMGMxN2VjOGE2IiwiaWF0IjoxNjU4MTgxMjk2fQ.nV7T-6r9sh0UUbu-LRFmW3zF8Pr1rbgRFdOZLQ6cWHE");
//       expect(res).to.have.status(404);
//     });
//   });
// });
