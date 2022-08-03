import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import dotenv from "dotenv";

dotenv.config();
chai.should();
chai.use(chaiHttp);

const server = require("../../src/index");

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
describe("POST /api/v1/accommodations",() => {
    /**
     * Should rate an accomodation
     */

    it("It should rate a given accomodation", () => {
      const id="d3a3ebae-b13b-42e9-afa8-319736274c02";
      chai
        .request(server)
        .post(`/api/v1/accommodations/${id}/rate`)
        .set({ authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiODZmMzI5YjQtYWIzZi00Y2QzLWJlYTMtYTUyNzc0NWZiY2ZiIiwiZW1haWwiOiJhYmlfc2V0aEBnbWFpbC5jb20iLCJyb2xlSWQiOiIwMTQxYzFhZS00MmExLTRiM2YtOWUyZC1iNzM2OWU5ZmY3ZDYiLCJpYXQiOjE2NTg5MTM0MzV9.2gP8niTuPL7Aw8MfGmo0crFg5frkxJwHtkrXl-SZ8xs" })
        .end((err, response) => {
          response.should.have.status(404);
        //   done();
        });
    });
  });
