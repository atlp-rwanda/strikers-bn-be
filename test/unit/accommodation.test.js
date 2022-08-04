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
