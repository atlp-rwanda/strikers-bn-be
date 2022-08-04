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
      const id="b5e423ee-2e20-4d71-abbb-8924b414f778";
      const newRating={
        userId: "86f329b4-ab3f-4cd3-bea3-a527745fbcfb",
        accomodationId: id,
        numRating: 5
      }
      chai
        .request(server)
        .post(`/api/v1/accommodations/${id}/rate`)
        .send(newRating)
        .set({ authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiODZmMzI5YjQtYWIzZi00Y2QzLWJlYTMtYTUyNzc0NWZiY2ZiIiwiZW1haWwiOiJhYmlfc2V0aEBnbWFpbC5jb20iLCJyb2xlSWQiOiIwMTQxYzFhZS00MmExLTRiM2YtOWUyZC1iNzM2OWU5ZmY3ZDYiLCJpYXQiOjE2NTg5MTM0MzV9.2gP8niTuPL7Aw8MfGmo0crFg5frkxJwHtkrXl-SZ8xs" })
        .end((err, response) => {
          response.should.have.status(201);
          response.should.be.a("object");
          response.body.should.have.property("success").eq(true);
          response.body.should.have
            .property("message")
            .eq("rating created successfully");
          response.body.should.have.property("data").be.a("object");
          // done();
        });
    });
    it("It should not rate a given accomodation", () => {
      const id="d3a3ebae-b13b-42e9-afa8-319736274c02";
      chai
        .request(server)
        .post(`/api/v1/accommodations/${id}/rate`)
        .end((err, response) => {
          response.should.have.status(403);
        //   done();
        });
    });
  });
