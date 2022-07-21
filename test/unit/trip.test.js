// import chai, { expect } from "chai";
// import chaiHttp from "chai-http";
// import dotenv from "dotenv";

// dotenv.config();
// chai.should();
// chai.use(chaiHttp);

// const server = require("../../src/index");

// describe("GET /api/v1/trips", () => {
//   let token = "";
//   before((done) => {
//     chai
//       .request(server)
//       .post("/api/v1/users/login")
//       .send({
//         email: "testerjhj@gmail.com",
//         password: "12345678",
//       })
//       .end((err, res) => {
//         token = res.body.token;
//         done();
//       });
//   });
//   describe("GET /api/v1/trips/all", () => {
//     it("It should GET a list of all trips", async () => {
//       const res = await chai
//         .request(server)
//         .get("/api/v1/trips/all")
//         .set({ Authorization: `Bearer ${token}` });
//       expect(res).to.have.status(200);
//     });

//     it("It should NOT GET a list of all trips", async () => {
//       const res = await chai.request(server).get("/api/trip/all");
//       expect(res).to.have.status(404);
//     });
//   });

//   describe("GET /api/v1/trips/:id", () => {
//     it("It should GET a specific trip by its specific uuid", async () => {
//       const uuid = 34,
//         res = await chai
//           .request(server)
//           .get("/api/v1/trips/" + uuid)
//           .set({ Authorization: `Bearer ${token}` });
//       expect(res).to.have.status(200);
//       expect(res.body).to.be.a("object");
//     });
//   });

//   describe("POST /api/v1/trips/create", () => {
//     it("It should POST a new trip", (done) => {
//       const newTrip = {
//         source: "testerloc",
//         destination: "Kigali",
//         DateOfTravel: "2022-06-08 07:22:08.305 +00:00",
//         DateOfDestination: "2022-06-19 07:22:08.305 +00:00",
//         status: "pending",
//       };

//       chai
//         .request(server)
//         .post("/api/v1/trips/create")
//         .set({ Authorization: `Bearer ${token}` })
//         .send(newTrip)
//         .end((err, response) => {
//           response.should.have.status(201);
//           response.should.be.a("object");

//           done();
//         });
//     });
//     it("It should not create a trip request", (done) => {
//       const newTrip = {
//         source: "testerloc",
//         destination: "Kigali",
//         DateOfTravel: "2022-06-08 07:22:08.305 +00:00",
//         DateOfDestination: "2022-06-19 07:22:08.305 +00:00",
//         status: "pending",
//       };
//       chai
//         .request(server)
//         .post("/api/v1/trip/create")
//         .set({ Authorization: `Bearer ${token}` })
//         .send(newTrip)
//         .end((err, response) => {
//           response.should.have.status(404);
//           response.should.be.a("object");

//           done();
//         });
//     });
//   });

//   describe("PUT /api/v1/trips/:id - Update status", () => {
//     it("It should update a trip", (done) => {
//       const tripId = 1;
//       const updatedtrip = {
//         source: "Muhanga",
//         destination: "Kigali",
//         DateOfTravel: "2022-06-08T07:22:08.305Z",
//         DateOfDestination: "2022-06-08T07:22:08.305Z",
//         status: "pending",
//       };
//       chai
//         .request(server)
//         .put("/api/v1/trips/" + tripId)
//         .set({ Authorization: `Bearer ${token}` })
//         .set("Accept", "application/json")
//         .send(updatedtrip)
//         .end((err, res) => {
//           expect(res.status).to.equal(500);
//           done();
//         });
//     });
//   });

//   describe("PUT /api/v1/trips/status/:id", () => {
//     let t_token = "";
//     let t_tripId = 4;
//     before((done) => {
//       chai
//         .request(server)
//         .post("/api/v1/users/login")
//         .send({
//           email: "manager@gmail.com",
//           password: "12345678",
//         })
//         .end((err, res) => {
//           t_token = res.body.token;
//           done();
//         });
//     });

//     it("Should approve a trip request", (done) => {
//       chai
//         .request(server)
//         .put(`/api/v1/trips/status/${t_tripId}`)
//         .set({ Authorization: `Bearer ${t_token}` })
//         .set("Accept", "application/json")
//         .send({ status: "approved" })
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           res.body.should.have.property("message").eq("Trip request approved");
//           done();
//         });
//     });

//     it("Should reject a trip request", (done) => {
//       chai
//         .request(server)
//         .put(`/api/v1/trips/status/${t_tripId}`)
//         .set({ Authorization: `Bearer ${t_token}` })
//         .set("Accept", "application/json")
//         .send({ status: "rejected" })
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           res.body.should.have.property("message").eq("Trip request rejected");
//           done();
//         });
//     });

//     it("Should return invalid status", (done) => {
//       chai
//         .request(server)
//         .put(`/api/v1/trips/status/${t_tripId}`)
//         .set({ Authorization: `Bearer ${t_token}` })
//         .set("Accept", "application/json")
//         .send({ status: "middle" })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           res.body.should.have.property("message").eq("Invalid status");
//           done();
//         });
//     });

//     it("Should forbid request - not manager", (done) => {
//       chai
//         .request(server)
//         .post("/api/v1/users/login")
//         .send({
//           email: "testerjhj@gmail.com",
//           password: "12345678",
//         })
//         .end((err, response) => {
//           let d_token = response.body.token;
//           chai
//             .request(server)
//             .put(`/api/v1/trips/status/${t_tripId}`)
//             .set({ Authorization: `Bearer ${d_token}` })
//             .set("Accept", "application/json")
//             .send({ status: "approve" })
//             .end((err, res) => {
//               expect(res.status).to.equal(403);
//               res.body.should.have.property("message").eq("Not authorized.");
//               done();
//             });
//         });
//     });
//   });

//   describe("DELETE /api/v1/trips/:id", () => {
//     it("It should delete a trip", (done) => {
//       const tripId = 1;
//       chai
//         .request(server)
//         .delete("/api/v1/trips/" + tripId)
//         .set({ Authorization: `Bearer ${token}` })
//         .set("Accept", "application/json")
//         .end((err, res) => {
//           expect(res.status).to.equal(500);
//           expect(res.body.data).to.include({});
//           done();
//         });
//     });
//   });
// });
