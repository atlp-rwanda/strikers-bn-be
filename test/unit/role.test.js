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
    describe("GET /api/roles", () => {
        it("It should GET a list of all roles", async () => {
            const res = await chai
                .request(server)
                .get("/api/roles");
            expect(res).to.have.status(200);
            expect(res.body).to.be.a("array");
        });

        it("It should NOT GET a list of all roles", async () => {
            const res = await chai
                .request(server)
                .get("/api/role/all");
            expect(res).to.have.status(404);
        });
    });

    /** 
     * Test GET route for specific role
     */
    describe("GET /api/roles/:id", () => {
        it("It should GET a specific role by its specific id", async () => {
            const id="96c97445-d152-4a4e-9868-bee9d5a18ce2",res = await chai
                .request(server)
                .get("/api/roles/"+id);
            expect(res).to.have.status(200);
            expect(res.body).to.be.a("object");
        });

        it("It should NOT GET a specific role by its specific id (Non-existing role)", async () => {
            const id="96c97445-d152-4a4e-9868-bee9d5a18ca2",res = await chai
                .request(server)
                .get("/api/roles/"+id);
            expect(res).to.have.status(404);
        });

        it("It should NOT GET a specific role by its specific id (Invalid UUID)", async () => {
            const id="96c97445",res = await chai
                .request(server)
                .get("/api/roles/"+id);
            expect(res).to.have.status(500);
        });
    });
});