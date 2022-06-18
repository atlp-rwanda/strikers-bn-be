import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import dotenv from "dotenv";

dotenv.config();
chai.should();
chai.use(chaiHttp);

const server = require("../../src/index");

describe("Company API", () => {
  /**
   * Test GET route
   */
  describe("GET /api/v1/companies", () => {
    it("It should GET a list of all companies", async () => {
      const res = await chai.request(server).get("/api/v1/companies");
      expect(res).to.have.status(200);
      expect(res.body).to.be.a("array");
    });

    it("It should NOT GET a list of all companies", async () => {
      const res = await chai.request(server).get("/api/v1/companies/all");
      expect(res).to.have.status(404);
    });
  });

  /**
   * Test GET route for a specific company
   */
  describe("GET /api/v1/companies/:id", () => {
    it("It should GET a specific role by its specific id", async () => {
      const id = "c1f1d2bf-33bd-4e11-9d7a-0331db465f95",
        res = await chai.request(server).get("/api/v1/roles/" + id);
      expect(res).to.have.status(200);
      expect(res.body).to.be.a("object");
    });

    it("It should NOT GET a specific role by its specific id (Non-existing role)", async () => {
      const id = "96c97445-d152-4a4e-9868-bee9d5a18ca2",
        res = await chai.request(server).get("/api/v1/roles/" + id);
      expect(res).to.have.status(404);
    });

    it("It should NOT GET a specific role by its specific id (Invalid UUID)", async () => {
      const id = "96c97445",
        res = await chai.request(server).get("/api/v1/roles/" + id);
      expect(res).to.have.status(500);
    });
  });

  /**
   * Test POST route
   */
  describe("POST /api/v1/roles", () => {
    it("It should POST (create) a new role", async () => {
      const newRole = {
          roleTitle: "System Tester",
        },
        { body } = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "abi_seth@gmail.com", password: "pass12345" });
      console.log("token here...", body.token);
      const res2 = await chai
        .request(server)
        .post("/api/v1/roles")
        .send(newRole)
        .set({ authorization: "Bearer " + body.token });
      expect(res2).to.have.status(201);
      await chai
        .request(server)
        .delete("/api/v1/roles/" + res2.body.data.roleId)
        .set({ authorization: "Bearer " + body.token });
    });

    it("It should NOT POST (create) a new role (Role already exists)", async () => {
      const newRole = {
          roleTitle: "System Tester",
        },
        { body } = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "abi_seth@gmail.com", password: "pass12345" }),
        res2 = await chai
          .request(server)
          .post("/api/v1/roles")
          .send(newRole)
          .set({ authorization: "Bearer " + body.token }),
        res3 = await chai
          .request(server)
          .post("/api/v1/roles")
          .send(newRole)
          .set({ authorization: "Bearer " + body.token });
      expect(res3).to.have.status(403);
      await chai
        .request(server)
        .delete("/api/v1/roles/" + res2.body.data.roleId)
        .set({ authorization: "Bearer " + body.token });
    });

    it("It should NOT POST (create) a new role (Not authenticated as Super Administrator)", async () => {
      const newRole = {
          roleTitle: "System Tester",
        },
        { body } = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "abi_seth@gmail.com", password: "pass12345" }),
        res2 = await chai.request(server).post("/api/v1/roles").send(newRole);
      expect(res2).to.have.status(403);
    });

    it("It should NOT POST (create) a new role (Invalid Title/name)", async () => {
      const newRole = {
          roleTitle: "S",
        },
        { body } = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "abi_seth@gmail.com", password: "pass12345" }),
        res2 = await chai
          .request(server)
          .post("/api/v1/roles")
          .send(newRole)
          .set({ authorization: "Bearer " + body.token });
      expect(res2).to.have.status(400);
    });
  });
});
