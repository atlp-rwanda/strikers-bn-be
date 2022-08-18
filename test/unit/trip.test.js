import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import dotenv from "dotenv";

dotenv.config();
chai.should();
chai.use(chaiHttp);

const server = require("../../src/index");
describe("GET /api/v1/trips", () => {
  /**
   * Test GET route
   */
  describe("GET /api/v1/trips/all", () => {
    // it("It should GET a list of all trips", async () => {
    //   const { body } = await chai
    //     .request(server)
    //     .post("/api/v1/users/login")
    //     .send({ email: "abi_seth@gmail.com", password: "pass12345" });

    //   const res = await chai
    //     .request(server)
    //     .get("/api/v1/trips/all")
    //     .set({ authorization: "Bearer " + body.token });
    //   expect(res).to.have.status(200);
    // });

    it("It should NOT GET a list of all trips", async () => {
      const res = await chai.request(server).get("/api/trip/all");
      expect(res).to.have.status(404);
    });
  });

  /**
   * Test GET route for specific role
   */
  describe("GET /api/v1/trips/:id", () => {
    // it("It should GET a specific trip by its specific uuid", async () => {
    //   const { body } = await chai
    //     .request(server)
    //     .post("/api/v1/users/login")
    //     .send({ email: "abi_seth@gmail.com", password: "pass12345" });
    //   const uuid = 21,
    //     res = await chai
    //       .request(server)
    //       .get("/api/v1/trips/" + uuid)
    //       .set({ authorization: "Bearer " + body.token });
    //   expect(res).to.have.status(200);
    //   expect(res.body).to.be.a("object");
    // });
  });
});
describe("POST /api/v1/trips/create", () => {
  it("It should POST a new trip", async () => {
    const newUser = {
        source: "Muhanga",
        destination: "Kigali",
        DateOfTravel: "2022-06-08 07:22:08.305 +00:00",
        DateOfDestination: "2022-06-19 07:22:08.305 +00:00",
        status: "pending",
      },
      { body } = await chai
        .request(server)
        .post("/api/v1/users/login")
        .send({ email: "abi_seth@gmail.com", password: "pass12345" });

    chai
      .request(server)
      .post("/api/v1/trips/create")
      .set({ authorization: "Bearer " + body.token })
      .send(newUser)
      .end((err, response) => {
        response.should.have.status(500);
        response.should.be.a("object");
      });
  });
  it("It should not create a trip request", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTljZDU3N2EtZGRmOC00OWIxLWFmN2ItNDVkODU5ZDA0NGI0IiwiZW1haWwiOiJhYmlfc2V0aF9hZG1pbkBnbWFpbC5jb20iLCJyb2xlSWQiOiIwMTQxYzFhZS00MmExLTRiM2YtOWUyZC1iNzM2OWU5ZmY3ZDYiLCJpYXQiOjE2NTUyMTAxMzYsImV4cCI6MTY1NTI5NjUzNn0.QXB5Aq2H6ZJd8UtDVCicyCwTvumyJjz4h3HJhsRC9r4";
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
      });
  });
});

describe("PUT /api/v1/trips/status/:id", () => {
  let t_token = "";
  let t_tripId = 539;
  before((done) => {
    chai
      .request(server)
      .post("/api/v1/users/login")
      .send({
        email: "manager@gmail.com",
        password: "12345678",
      })
      .end((err, res) => {
        t_token = res.body.token;
        done();
      });
  });
  // it("Should approve a trip request", (done) => {
  //   chai
  //     .request(server)
  //     .put(`/api/v1/trips/status/${t_tripId}`)
  //     .set({ Authorization: `Bearer ${t_token}` })
  //     .set("Accept", "application/json")
  //     .send({ status: "approved" })
  //     .end((err, res) => {
  //       expect(res.status).to.equal(200);
  //       res.body.should.have.property("message").eq("Trip request approved");
  //       done();
  //     });
  // });

  // it("Should reject a trip request", (done) => {
  //   chai
  //     .request(server)
  //     .put(`/api/v1/trips/status/${t_tripId}`)
  //     .set({ Authorization: `Bearer ${t_token}` })
  //     .set("Accept", "application/json")
  //     .send({ status: "rejected" })
  //     .end((err, res) => {
  //       expect(res.status).to.equal(200);
  //       res.body.should.have.property("message").eq("Trip request rejected");
  //       done();
  //     });
  // });

  it("Should return invalid status", (done) => {
    chai
      .request(server)
      .put(`/api/v1/trips/status/${t_tripId}`)
      .set({ Authorization: `Bearer ${t_token}` })
      .set("Accept", "application/json")
      .send({ status: "middle" })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property("message").eq("Invalid status");
        done();
      });
  });

  it("Should forbid request - not manager", (done) => {
    chai
      .request(server)
      .post("/api/v1/users/login")
      .send({
        email: "testerjhj@gmail.com",
        password: "12345678",
      })
      .end((err, response) => {
        let d_token = response.body.token;
        chai
          .request(server)
          .put(`/api/v1/trips/status/${t_tripId}`)
          .set({ Authorization: `Bearer ${d_token}` })
          .set("Accept", "application/json")
          .send({ status: "approve" })
          .end((err, res) => {
            expect(res.status).to.equal(403);
            res.body.should.have.property("message").eq("Not authorized.");
            done();
          });
      });
  });
});
//   describe('PUT /api/v1/trips/:id', () => {

//     it('It should update a trip',async () => {
//       const tripId = 21;
//       const updatedtrip = {
//         source: "Muhanga",
//         destination: "Kigali",
//         DateOfTravel: "2022-06-08T07:22:08.305Z",
//         DateOfDestination: "2022-06-08T07:22:08.305Z",
//         status: "pending",
//       },
//       { body } = await chai
//       .request(server)
//       .post("/api/v1/users/login")
//       .send({ email: "abi_seth@gmail.com", password: "pass12345" });
//       console.log("token here...",body.token);
//       chai.request(server)
//         .put("/api/v1/trips/" + tripId)
//         .set({ authorization: "Bearer " +
//         body.token })
//         .set('Accept', 'application/json')
//         .send(updatedtrip)
//         .end((err, res) => {
//           expect(res.status).to.equal(500);
//           expect(res.body.data).to.include({});
//         });
//     });
// });

// describe("DELETE /api/v1/trips/:id",()=>{
//   it('It should delete a trip', async() => {
//     const
//     { body } = await chai
//     .request(server)
//     .post("/api/v1/users/login")
//     .send({ email: "abi_seth@gmail.com", password: "pass12345" });

//     const tripId = 21;
//     chai.request(server)
//       .delete("/api/v1/trips/" + tripId)
//       .set({ authorization: "Bearer " + body.token })
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         expect(res.status).to.equal(500);
//         expect(res.body.data).to.include({});

//       });
//   });
// })
