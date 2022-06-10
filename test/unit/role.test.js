import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import dotenv from "dotenv";

dotenv.config();
chai.should();
chai.use(chaiHttp);

const server = require("../../src/index");

describe("Role API", () => {
  /**
   * Test GET route
   */
  describe("GET /api/v1/roles", () => {
    it("It should GET a list of all roles", async () => {
      const res = await chai.request(server).get("/api/v1/roles");
      expect(res).to.have.status(200);
      expect(res.body).to.be.a("array");
    });

    it("It should NOT GET a list of all roles", async () => {
      const res = await chai.request(server).get("/api/v1/role/all");
      expect(res).to.have.status(404);
    });
  });

  /**
   * Test GET route for specific role
   */
  describe("GET /api/v1/roles/:id", () => {
    it("It should GET a specific role by its specific id", async () => {
<<<<<<< HEAD
      const id = "e2a8b398-b658-4606-9b17-b9152792e875",
=======
      const id = "c1f1d2bf-33bd-4e11-9d7a-0331db465f95",
>>>>>>> 7dfaed695c40d67e3a94c95117877cbd4f5ee65a
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
<<<<<<< HEAD
=======

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
          .send({ email: "abi_seth@gmail.com", password: "pass12345" }),
        res2 = await chai
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

  /**
   * Test the PATCH route
   */
  describe("PATCH /api/v1/roles/:roleId", () => {
    it("It should PATCH (update) an existing role", async () => {
      const newRole = {
          roleTitle: "System Tester",
        },
        updatedRole = {
          roleTitle: "System Maintainer",
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
        { roleId } = res2.body.data,
        res3 = await chai
          .request(server)
          .patch("/api/v1/roles/" + roleId)
          .send(updatedRole)
          .set({ authorization: "Bearer " + body.token });
      expect(res3).to.have.status(200);
      await chai
        .request(server)
        .delete("/api/v1/roles/" + roleId)
        .set({ authorization: "Bearer " + body.token });
    });

    it("It should NOT PATCH (update) an existing role (Another role with the new name already exists)", async () => {
      const newRole = {
          roleTitle: "System Tester",
        },
        newRole2 = {
          roleTitle: "System Maintainer",
        },
        updatedRole = {
          roleTitle: "System Maintainer",
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
        { roleId } = res2.body.data,
        res3 = await chai
          .request(server)
          .post("/api/v1/roles")
          .send(newRole2)
          .set({ authorization: "Bearer " + body.token }),
        res4 = await chai
          .request(server)
          .patch("/api/v1/roles/" + roleId)
          .send(updatedRole)
          .set({ authorization: "Bearer " + body.token });
      expect(res4).to.have.status(400);
      await chai
        .request(server)
        .delete("/api/v1/roles/" + roleId)
        .set({ authorization: "Bearer " + body.token });
      await chai
        .request(server)
        .delete("/api/v1/roles/" + res3.body.data.roleId)
        .set({ authorization: "Bearer " + body.token });
    });

    it("It should NOT PATCH (update) an existing role (Not authenticated as Super Administrator)", async () => {
      const newRole = {
          roleTitle: "System Tester",
        },
        updatedRole = {
          roleTitle: "System Maintainer",
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
        { roleId } = res2.body.data,
        res3 = await chai
          .request(server)
          .patch("/api/v1/roles/" + roleId)
          .send(updatedRole);
      expect(res3).to.have.status(403);
      await chai
        .request(server)
        .delete("/api/v1/roles/" + roleId)
        .set({ authorization: "Bearer " + body.token });
    });

    it("It should NOT POST (create) a new role (Invalid Title/name)", async () => {
      const newRole = {
          roleTitle: "System Tester",
        },
        updatedRole = {
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
          .set({ authorization: "Bearer " + body.token }),
        { roleId } = res2.body.data,
        res3 = await chai
          .request(server)
          .patch("/api/v1/roles/" + roleId)
          .send(updatedRole)
          .set({ authorization: "Bearer " + body.token });
      expect(res3).to.have.status(400);
      await chai
        .request(server)
        .delete("/api/v1/roles/" + roleId)
        .set({ authorization: "Bearer " + body.token });
    });
  });
>>>>>>> 7dfaed695c40d67e3a94c95117877cbd4f5ee65a
});
