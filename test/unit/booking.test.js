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
      const res = await chai.request(server).get("/api/v1/bookings");
      expect(res).to.have.status(200);
      expect(res.body).to.be.a("array");
    });

    it("It should NOT GET a list of all bookings", async () => {
      const res = await chai.request(server).get("/api/v1/bookings/all");
      expect(res).to.have.status(500);
    });

    it("It should NOT GET a list of all bookings", async () => {
      const res = await chai.request(server).get("/api/v1/booking/all");
      expect(res).to.have.status(404);
    });
  });
});
