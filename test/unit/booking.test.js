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
});
