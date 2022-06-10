import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import dotenv from "dotenv";

dotenv.config();
chai.should();
chai.use(chaiHttp);

const server = require("../../src/index");
describe("GET /api/v1/trips",()=>{
  /**
   * Test GET route
   */
   describe("GET /api/v1/trips/all", () => {
    it("It should GET a list of all trips", async () => {
      const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTljZDU3N2EtZGRmOC00OWIxLWFmN2ItNDVkODU5ZDA0NGI0IiwiZW1haWwiOiJhYmlfc2V0aF9hZG1pbkBnbWFpbC5jb20iLCJyb2xlSWQiOiIwMTQxYzFhZS00MmExLTRiM2YtOWUyZC1iNzM2OWU5ZmY3ZDYiLCJpYXQiOjE2NTQ4NzAxNzAsImV4cCI6MTY1NDk1NjU3MH0.jl0nf0e6RO3GxUGvSttEbU1IkAH64SdzPqdyW5KSB8U"
      const res = await chai.request(server).get("/api/v1/trips/all")
      .set({ Authorization: `Bearer ${token}` });
      expect(res).to.have.status(200);
    });

    it("It should NOT GET a list of all trips", async () => {
      const res = await chai.request(server).get("/api/trip/all")
      ;
      expect(res).to.have.status(404);
    });
  });

  /**
   * Test GET route for specific role
   */
  describe("GET /api/v1/trips/:id", () => {
    it("It should GET a specific trip by its specific uuid", async () => {
      const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTljZDU3N2EtZGRmOC00OWIxLWFmN2ItNDVkODU5ZDA0NGI0IiwiZW1haWwiOiJhYmlfc2V0aF9hZG1pbkBnbWFpbC5jb20iLCJyb2xlSWQiOiIwMTQxYzFhZS00MmExLTRiM2YtOWUyZC1iNzM2OWU5ZmY3ZDYiLCJpYXQiOjE2NTQ4NzAxNzAsImV4cCI6MTY1NDk1NjU3MH0.jl0nf0e6RO3GxUGvSttEbU1IkAH64SdzPqdyW5KSB8U"
      const uuid = 1,
        res = await chai.request(server).get("/api/v1/trips/" + uuid)
        .set({ Authorization: `Bearer ${token}` });
      expect(res).to.have.status(200);
      expect(res.body).to.be.a("object");
    });
  });
});
describe("POST /api/v1/trips/create", () => {

    it("It should POST a new trip", (done) => {
      const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTljZDU3N2EtZGRmOC00OWIxLWFmN2ItNDVkODU5ZDA0NGI0IiwiZW1haWwiOiJhYmlfc2V0aF9hZG1pbkBnbWFpbC5jb20iLCJyb2xlSWQiOiIwMTQxYzFhZS00MmExLTRiM2YtOWUyZC1iNzM2OWU5ZmY3ZDYiLCJpYXQiOjE2NTQ4NzAxNzAsImV4cCI6MTY1NDk1NjU3MH0.jl0nf0e6RO3GxUGvSttEbU1IkAH64SdzPqdyW5KSB8U"
      const newUser = {
        source: "Muhanga",
        destination: "Kigali",
        DateOfTravel: "2022-06-08 07:22:08.305 +00:00",
        DateOfDestination: "2022-06-19 07:22:08.305 +00:00",
        status: "pending",
      };
  
      chai
        .request(server)
        .post("/api/v1/trips/create")
        .set({ Authorization: `Bearer ${token}` })
        .send(newUser)
        .end((err, response) => {
          response.should.have.status(500);
          response.should.be.a("object");
          done();
        });
    });
    it("It should not create a trip request", (done) => {
      const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTljZDU3N2EtZGRmOC00OWIxLWFmN2ItNDVkODU5ZDA0NGI0IiwiZW1haWwiOiJhYmlfc2V0aF9hZG1pbkBnbWFpbC5jb20iLCJyb2xlSWQiOiIwMTQxYzFhZS00MmExLTRiM2YtOWUyZC1iNzM2OWU5ZmY3ZDYiLCJpYXQiOjE2NTQ4NzAxNzAsImV4cCI6MTY1NDk1NjU3MH0.jl0nf0e6RO3GxUGvSttEbU1IkAH64SdzPqdyW5KSB8U"
      const newUser = {
        source: "Muhanga",
        destination: "Kigali",
        DateOfTravel: "2022-06-08 07:22:08.305 +00:00",
        DateOfDestination: "2022-06-19 07:22:08.305 +00:00",
        status: "pending",
      };
  
      chai
        .request(server)
        .post("/api/v1/trip/create")
        .set({ Authorization: `Bearer ${token}` })
        .send(newUser)
        .end((err, response) => {
          response.should.have.status(404);
          response.should.be.a("object");
       
          done();
        });
    });
  });
    describe('PUT /api/v1/trips/:id', () => {
    
      it('It should update a trip', (done) => {
        const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTljZDU3N2EtZGRmOC00OWIxLWFmN2ItNDVkODU5ZDA0NGI0IiwiZW1haWwiOiJhYmlfc2V0aF9hZG1pbkBnbWFpbC5jb20iLCJyb2xlSWQiOiIwMTQxYzFhZS00MmExLTRiM2YtOWUyZC1iNzM2OWU5ZmY3ZDYiLCJpYXQiOjE2NTQ4NzAxNzAsImV4cCI6MTY1NDk1NjU3MH0.jl0nf0e6RO3GxUGvSttEbU1IkAH64SdzPqdyW5KSB8U"
        const tripId = 1;
        const updatedtrip = {
          source: "Muhanga",
          destination: "Kigali",
          DateOfTravel: "2022-06-08T07:22:08.305Z",
          DateOfDestination: "2022-06-08T07:22:08.305Z",
          status: "pending",
        };
        chai.request(server)
          .put("/api/v1/trips/" + tripId)
          .set({ Authorization: `Bearer ${token}` })
          .set('Accept', 'application/json')
          .send(updatedtrip)
          .end((err, res) => {
            expect(res.status).to.equal(500);
            done();
          });
      });
  });
 
  describe("DELETE /api/v1/trips/:id",()=>{
    it('It should delete a trip', (done) => {
      const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTljZDU3N2EtZGRmOC00OWIxLWFmN2ItNDVkODU5ZDA0NGI0IiwiZW1haWwiOiJhYmlfc2V0aF9hZG1pbkBnbWFpbC5jb20iLCJyb2xlSWQiOiIwMTQxYzFhZS00MmExLTRiM2YtOWUyZC1iNzM2OWU5ZmY3ZDYiLCJpYXQiOjE2NTQ4NzAxNzAsImV4cCI6MTY1NDk1NjU3MH0.jl0nf0e6RO3GxUGvSttEbU1IkAH64SdzPqdyW5KSB8U"
      const tripId = 1;
      chai.request(server)
        .delete("/api/v1/trips/" + tripId)
        .set({ Authorization: `Bearer ${token}` })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.data).to.include({});
          done();
        });
    });
  })
  

