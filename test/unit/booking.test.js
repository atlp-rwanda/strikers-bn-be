import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import dotenv from "dotenv";

dotenv.config();
chai.should();
chai.use(chaiHttp);

const server = require("../../src/index");

describe("Booking API", () => {
  /**
   * Test GET route
   */
  describe("GET /api/v1/bookings", () => {
    it("It should GET a list of all bookings", async () => {
      const { body } = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "regiskayitare@gmail.com", password: "pass12345" }),
        res = await chai
          .request(server)
          .get("/api/v1/bookings")
          .set({ authorization: `Bearer ${body.token}` });
      expect(res).to.have.status(200);
      expect(res.body).to.be.a("array");
    });

    it("It should NOT GET a list of all bookings (Invalid extra info on route)", async () => {
      const { body } = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "regiskayitare@gmail.com", password: "pass12345" }),
        res = await chai
          .request(server)
          .get("/api/v1/bookings/all")
          .set({ authorization: `Bearer ${body.token}` });
      expect(res).to.have.status(500);
    });

    it("It should NOT GET a list of all bookings (Unexisting route)", async () => {
      const res = await chai.request(server).get("/api/v1/booking/all");
      expect(res).to.have.status(404);
    });
  });
  /**
   * Test GET route for a specific booking
   */
  describe("GET /api/v1/bookings/:id", () => {
    it("It should GET a specific booking by its bookingId", async () => {
      const newCompany = {
          name: "Test1 company",
          email: "testcompany@mailbox.org",
          locationId: "96c97445-d152-4a4e-9868-bee9d5a18ca2",
          managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
        },
        res2 = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "abi_seth@gmail.com", password: "pass12345" });
      const res10 = await chai
        .request(server)
        .post("/api/v1/companies")
        .send(newCompany)
        .set({ authorization: "Bearer " + res2.body.token });
      const { companyId } = res10.body.data,
        newBooking = {
          supplierId: companyId,
          accomodationId: "d3a3ebae-b13b-42e9-afa8-319736274c02",
          roomId: "72117a46-7ba2-495d-8846-221313470ad4",
          requesterId: "86f329b4-ab3f-4cd3-bea3-a527745fbcfb",
        },
        res1 = await chai
          .request(server)
          .post("/api/v1/bookings")
          .send(newBooking);
      const { body } = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "regiskayitare@gmail.com", password: "pass12345" }),
        { bookingId } = res1.body.data,
        res = await chai
          .request(server)
          .get("/api/v1/bookings/" + bookingId)
          .set({ authorization: `Bearer ${body.token}` });
      expect(res).to.have.status(200);
      expect(res.body).to.be.a("object");
      await chai
        .request(server)
        .delete("/api/v1/bookings/" + bookingId)
        .set({ authorization: "Bearer " + body.token });
      await chai
        .request(server)
        .delete("/api/v1/companies/" + companyId)
        .set({ authorization: "Bearer " + res2.body.token });
    });

    it("It should NOT GET a specific booking by its bookingId (doesn't exist)", async () => {
      const newCompany = {
          name: "Test2 company",
          email: "testcompany@mailbox.org",
          locationId: "96c97445-d152-4a4e-9868-bee9d5a18ca2",
          managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
        },
        res2 = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "abi_seth@gmail.com", password: "pass12345" });
      const res10 = await chai
        .request(server)
        .post("/api/v1/companies")
        .send(newCompany)
        .set({ authorization: "Bearer " + res2.body.token });
      const { companyId } = res10.body.data,
        newBooking = {
          supplierId: companyId,
          accomodationId: "d3a3ebae-b13b-42e9-afa8-319736274c02",
          roomId: "72117a46-7ba2-495d-8846-221313470ad4",
          requesterId: "86f329b4-ab3f-4cd3-bea3-a527745fbcfb",
        },
        res1 = await chai
          .request(server)
          .post("/api/v1/bookings")
          .send(newBooking);
      const { body } = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "regiskayitare@gmail.com", password: "pass12345" }),
        { bookingId } = res1.body.data;
      await chai
        .request(server)
        .delete("/api/v1/bookings/" + bookingId)
        .set({ authorization: "Bearer " + body.token });
      const res = await chai
        .request(server)
        .get("/api/v1/bookings/" + bookingId)
        .set({ authorization: `Bearer ${body.token}` });
      await chai
        .request(server)
        .delete("/api/v1/companies/" + companyId)
        .set({ authorization: "Bearer " + res2.body.token });
      expect(res).to.have.status(404);
      expect(res.body).to.be.a("object");
    });

    it("It should NOT GET a specific booking by its bookingId (Invalid UUID for bookingId)", async () => {
      const bookingId = "invalid",
        { body } = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "regiskayitare@gmail.com", password: "pass12345" }),
        res = await chai
          .request(server)
          .get("/api/v1/bookings/" + bookingId)
          .set({ authorization: `Bearer ${body.token}` });
      expect(res).to.have.status(500);
    });
    it("It should NOT GET a specific booking by its bookingId (No token provided)", async () => {
      const bookingId = "invalid",
        res = await chai.request(server).get("/api/v1/bookings/" + bookingId);
      expect(res).to.have.status(403);
    });
    it("It should NOT GET a specific booking by its bookingId (Invalid token)", async () => {
      const bookingId = "invalid",
        res = await chai
          .request(server)
          .get("/api/v1/bookings/" + bookingId)
          .set({ authorization: `Bearer Invalidtoken` });
      expect(res).to.have.status(401);
    });
  });
  /**
   * Test DELETE route for a specific booking
   */
  describe("DELETE /api/v1/bookings/:id", () => {
    it("It should DELETE a specific booking by its bookingId", async () => {
      const newCompany = {
          name: "Test3 company",
          email: "testcompany@mailbox.org",
          locationId: "96c97445-d152-4a4e-9868-bee9d5a18ca2",
          managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
        },
        res2 = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "abi_seth@gmail.com", password: "pass12345" });
      const res10 = await chai
        .request(server)
        .post("/api/v1/companies")
        .send(newCompany)
        .set({ authorization: "Bearer " + res2.body.token });
      const { companyId } = res10.body.data,
        newBooking = {
          supplierId: companyId,
          accomodationId: "d3a3ebae-b13b-42e9-afa8-319736274c02",
          roomId: "72117a46-7ba2-495d-8846-221313470ad4",
          requesterId: "86f329b4-ab3f-4cd3-bea3-a527745fbcfb",
        },
        res1 = await chai
          .request(server)
          .post("/api/v1/bookings")
          .send(newBooking);
      const { body } = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "regiskayitare@gmail.com", password: "pass12345" }),
        { bookingId } = res1.body.data,
        res = await chai
          .request(server)
          .delete("/api/v1/bookings/" + bookingId)
          .set({ authorization: "Bearer " + body.token });
      expect(res).to.have.status(200);
      await chai
        .request(server)
        .delete("/api/v1/companies/" + companyId)
        .set({ authorization: "Bearer " + res2.body.token });
    });

    it("It should NOT DELETE a specific booking by its bookingId (doesn't exist)", async () => {
      const newCompany = {
          name: "Test4 company",
          email: "testcompany@mailbox.org",
          locationId: "96c97445-d152-4a4e-9868-bee9d5a18ca2",
          managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
        },
        res2 = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "abi_seth@gmail.com", password: "pass12345" });
      const res10 = await chai
        .request(server)
        .post("/api/v1/companies")
        .send(newCompany)
        .set({ authorization: "Bearer " + res2.body.token });
      const { companyId } = res10.body.data,
        newBooking = {
          supplierId: companyId,
          accomodationId: "d3a3ebae-b13b-42e9-afa8-319736274c02",
          roomId: "72117a46-7ba2-495d-8846-221313470ad4",
          requesterId: "86f329b4-ab3f-4cd3-bea3-a527745fbcfb",
        },
        res1 = await chai
          .request(server)
          .post("/api/v1/bookings")
          .send(newBooking);
      const { body } = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "regiskayitare@gmail.com", password: "pass12345" }),
        { bookingId } = res1.body.data;
      await chai
        .request(server)
        .delete("/api/v1/bookings/" + bookingId)
        .set({ authorization: "Bearer " + body.token });
      const res = await chai
        .request(server)
        .delete("/api/v1/bookings/" + bookingId)
        .set({ authorization: "Bearer " + body.token });
      expect(res).to.have.status(404);
      await chai
        .request(server)
        .delete("/api/v1/companies/" + companyId)
        .set({ authorization: "Bearer " + res2.body.token });
    });

    it("It should NOT DELETE a specific booking by its bookingId (Invalid UUID for bookingId)", async () => {
      const bookingId = "invalid",
        { body } = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "regiskayitare@gmail.com", password: "pass12345" }),
        res = await chai
          .request(server)
          .delete("/api/v1/bookings/" + bookingId)
          .set({ authorization: `Bearer ${body.token}` });
      expect(res).to.have.status(500);
    });
    it("It should NOT DELETE a specific booking by its bookingId (No token provided)", async () => {
      const bookingId = "invalid",
        res = await chai
          .request(server)
          .delete("/api/v1/bookings/" + bookingId);
      expect(res).to.have.status(403);
    });
    it("It should NOT DELETE a specific booking by its bookingId (Invalid token)", async () => {
      const bookingId = "invalid",
        res = await chai
          .request(server)
          .delete("/api/v1/bookings/" + bookingId)
          .set({ authorization: `Bearer Invalidtoken` });
      expect(res).to.have.status(401);
    });
  });
});
