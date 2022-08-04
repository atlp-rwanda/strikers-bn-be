// import chai, { expect } from "chai";
// import chaiHttp from "chai-http";
// import dotenv from "dotenv";

// dotenv.config();
// chai.should();
// chai.use(chaiHttp);

// const server = require("../../src/index");

// describe("Company API", () => {
//   /**
//    * Test GET route
//    */
//   describe("GET /api/v1/companies", () => {
//     it("It should GET a list of all companies", async () => {
//       const res = await chai.request(server).get("/api/v1/companies");
//       expect(res).to.have.status(500);
//     });

//     it("It should NOT GET a list of all companies", async () => {
//       const res = await chai.request(server).get("/api/v1/companies/all");
//       expect(res).to.have.status(500);
//     });
//   });

//   /**
//    * Test GET route for a specific company
//    */
//   describe("GET /api/v1/companies/:id", () => {
//     it("It should GET a specific company by its companyId", async () => {
//       const newCompany = {
//           name: "Test12 company",
//           email: "testcompany@mailbox.org",
//           locationId: "96c97445-d152-4a4e-9868-bee9d5a18ca2",
//           managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
//         }
//         const resa = await chai
//           .request(server)
//           .post("/api/v1/users/login")
//           .send({ email: "abi_seth@gmail.com", password: "pass12345" });
//       const res2 = await chai
//           .request(server)
//           .post("/api/v1/companies")
//           .send(newCompany)
//           .set({ authorization: "Bearer " + resa.body.token })
         
//       const res3 = await chai.request(server).get("/api/v1/companies/" + res2.body.data);
//       expect(res3).to.have.status(500);
//       await chai
//         .request(server)
//         .delete("/api/v1/companies/" + res2.body.data)
//         .set({ authorization: "Bearer " + resa.body.token });
//     });

//     it("It should NOT GET a specific company by companyId (Non-existing company)", async () => {
//       const id = "96c97445-d152-4a4e-9868-bee9d5a18ca2",
//         res = await chai.request(server).get("/api/v1/companies/" + id);
//       expect(res).to.have.status(500);
//     });

//     it("It should NOT GET a specific company by its companyId (Invalid UUID)", async () => {
//       const id = "96c97445",
//         res = await chai.request(server).get("/api/v1/companies/" + id);
//       expect(res).to.have.status(500);
//     });
//   });

//   /**
//    * Test POST route
//    */
//   describe("POST /api/v1/companies", () => {
//     it("It should POST (create) a new company", async () => {
//       const newCompany = {
//           name: "Test2comspany",
//           email: "testcompany@mailbox.org",
//           locationId: "96c97445-d152-4a4e-9868-bee9d5a18ca2",
//           managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
//         }
//         const resa = await chai
//           .request(server)
//           .post("/api/v1/users/login")
//           .send({ email: "abi_seth@gmail.com", password: "pass12345" });
//       const res2 = await chai
//         .request(server)
//         .post("/api/v1/companies")
//         .send(newCompany)
//         .set({ authorization: "Bearer " + resa.body.token });
//       expect(res2).to.have.status(500);
//       await chai
//         .request(server)
//         .delete("/api/v1/companies/" + res2.body.data)
//         .set({ authorization: "Bearer " + resa.body.token });
//     });

//     it("It should NOT POST (create) a new company (No token provided)", async () => {
//       const newCompany = {
//           name: "Test3 company",
//           email: "testcompany@mailbox.org",
//           locationId: "",
//           managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
//         },
//         res2 = await chai
//           .request(server)
//           .post("/api/v1/companies")
//           .send(newCompany);
//       expect(res2).to.have.status(403);
//     });

//     it("It should NOT POST (create) a new company (Invalid token)", async () => {
//       const newCompany = {
//           name: "Test4 company",
//           email: "testcompany@mailbox.org",
//           locationId: "",
//           managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
//         },
//         res2 = await chai
//           .request(server)
//           .post("/api/v1/companies")
//           .set({ authorization: "Bearer Invalidtoken" })
//           .send(newCompany);
//       expect(res2).to.have.status(401);
//     });

//     it("It should NOT POST (create) a new company (Invalid info)", async () => {
//       const newCompany = {
//           name: "Test5 company",
//           email: "testcompany@mailbox.org",
//         },
//         { body } = await chai
//           .request(server)
//           .post("/api/v1/users/login")
//           .send({ email: "abi_seth@gmail.com", password: "pass12345" });
//       const res2 = await chai
//         .request(server)
//         .post("/api/v1/companies")
//         .send(newCompany)
//         .set({ authorization: "Bearer " + body.token });
//       expect(res2).to.have.status(400);
//     });
//   });
//   /**
//    * Test PATCH route
//    */
//   describe("PATCH /api/v1/companies", () => {
//     it("It should PATCH (update) an existing company", async () => {
//       const newCompany = {
//           name: "Test6 company",
//           email: "testcompany@mailbox.org",
//           locationId: "96c97445-d152-4a4e-9868-bee9d5a18ca2",
//           managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
//         },
//         updatedCompanyInfo = {
//           name: "New name",
//           email: "testemail@mailbox.org",
//           locationId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
//           managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
//         },
//         { body } = await chai
//           .request(server)
//           .post("/api/v1/users/login")
//           .send({ email: "abi_seth@gmail.com", password: "pass12345" });
//       const res2 = await chai
//         .request(server)
//         .post("/api/v1/companies")
//         .send(newCompany)
//         .set({ authorization: "Bearer " + body.token });
//       const { companyId } = res2.body.data,
//         res3 = await chai
//           .request(server)
//           .patch("/api/v1/companies/" + companyId)
//           .send(updatedCompanyInfo)
//           .set({ authorization: "Bearer " + body.token });
//       expect(res3).to.have.status(200);
//       await chai
//         .request(server)
//         .delete("/api/v1/companies/" + companyId)
//         .set({ authorization: "Bearer " + body.token });
//     });

//     it("It should NOT PATCH (update) an existing company (No token provided)", async () => {
//       const newCompany = {
//           name: "Test7 company",
//           email: "testcompany@mailbox.org",
//           locationId: "96c97445-d152-4a4e-9868-bee9d5a18ca2",
//           managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
//         },
//         updatedCompanyInfo = {
//           name: "New name",
//           email: "testemail@mailbox.org",
//           locationId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
//           managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
//         },
//         { body } = await chai
//           .request(server)
//           .post("/api/v1/users/login")
//           .send({ email: "abi_seth@gmail.com", password: "pass12345" });
//       const res2 = await chai
//           .request(server)
//           .post("/api/v1/companies")
//           .send(newCompany)
//           .set({ authorization: "Bearer " + body.token }),
//         { companyId } = res2.body.data,
//         res3 = await chai
//           .request(server)
//           .patch("/api/v1/companies/" + companyId)
//           .send(updatedCompanyInfo);
//       expect(res3).to.have.status(403);
//       await chai
//         .request(server)
//         .delete("/api/v1/companies/" + companyId)
//         .set({ authorization: "Bearer " + body.token });
//     });

//     it("It should NOT PATCH (update) an existing company (Invalid token)", async () => {
//       const newCompany = {
//           name: "Test8 company",
//           email: "testcompany@mailbox.org",
//           locationId: "96c97445-d152-4a4e-9868-bee9d5a18ca2",
//           managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
//         },
//         updatedCompanyInfo = {
//           name: "New name",
//           email: "testemail@mailbox.org",
//           locationId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
//           managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
//         },
//         { body } = await chai
//           .request(server)
//           .post("/api/v1/users/login")
//           .send({ email: "abi_seth@gmail.com", password: "pass12345" });
//       const res2 = await chai
//           .request(server)
//           .post("/api/v1/companies")
//           .send(newCompany)
//           .set({ authorization: "Bearer " + body.token }),
//         { companyId } = res2.body.data,
//         res3 = await chai
//           .request(server)
//           .patch("/api/v1/companies/" + companyId)
//           .set({ authorization: "Bearer Invalidtoken" })
//           .send(updatedCompanyInfo);
//       expect(res3).to.have.status(401);
//       await chai
//         .request(server)
//         .delete("/api/v1/companies/" + companyId)
//         .set({ authorization: "Bearer " + body.token });
//     });

//     it("It should NOT PATCH (update) an existing company (Invalid info)", async () => {
//       const newCompany = {
//           name: "Test9 company",
//           email: "testcompany@mailbox.org",
//           locationId: "96c97445-d152-4a4e-9868-bee9d5a18ca2",
//           managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
//         },
//         updatedCompanyInfo = {
//           name: "New name",
//           email: "testemail",
//         },
//         { body } = await chai
//           .request(server)
//           .post("/api/v1/users/login")
//           .send({ email: "abi_seth@gmail.com", password: "pass12345" });
//       const res2 = await chai
//           .request(server)
//           .post("/api/v1/companies")
//           .send(newCompany)
//           .set({ authorization: "Bearer " + body.token }),
//         { companyId } = res2.body.data,
//         res3 = await chai
//           .request(server)
//           .patch("/api/v1/companies/" + companyId)
//           .send(updatedCompanyInfo)
//           .set({ authorization: "Bearer " + body.token });
//       expect(res3).to.have.status(400);
//       await chai
//         .request(server)
//         .delete("/api/v1/companies/" + companyId)
//         .set({ authorization: "Bearer " + body.token });
//     });
//   });
//   /**
//    * Test DELETE route
//    */
//   describe("DELETE /api/v1/companies/:id", () => {
//     it("It should DELETE a specific company by its companyId", async () => {
//       const newCompany = {
//           name: "Test10 company",
//           email: "testcompany@mailbox.org",
//           locationId: "96c97445-d152-4a4e-9868-bee9d5a18ca2",
//           managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
//         },
//         { body } = await chai
//           .request(server)
//           .post("/api/v1/users/login")
//           .send({ email: "abi_seth@gmail.com", password: "pass12345" });
//       const res2 = await chai
//           .request(server)
//           .post("/api/v1/companies")
//           .send(newCompany)
//           .set({ authorization: "Bearer " + body.token }),
//         res3 = await chai
//           .request(server)
//           .delete("/api/v1/companies/" + res2.body.data.companyId)
//           .set({ authorization: "Bearer " + body.token });
//       expect(res3).to.have.status(200);
//     });

//     it("It should NOT DELETE a specific company by its companyId (Invalid companyId)", async () => {
//       const { body } = await chai
//           .request(server)
//           .post("/api/v1/users/login")
//           .send({ email: "abi_seth@gmail.com", password: "pass12345" }),
//         res = await chai
//           .request(server)
//           .delete("/api/v1/companies/8dse43")
//           .set({ authorization: "Bearer " + body.token });
//       expect(res).to.have.status(500);
//     });

//     it("It should NOT DELETE a specific company by its companyId (Non-existing companyId)", async () => {
//       const newCompany = {
//           name: "Test11 company",
//           email: "testcompany@mailbox.org",
//           locationId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
//           managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
//         },
//         { body } = await chai
//           .request(server)
//           .post("/api/v1/users/login")
//           .send({ email: "abi_seth@gmail.com", password: "pass12345" });
//       const res2 = await chai
//         .request(server)
//         .post("/api/v1/companies")
//         .send(newCompany)
//         .set({ authorization: "Bearer " + body.token });
//       await chai
//         .request(server)
//         .delete("/api/v1/companies/" + res2.body.data.companyId)
//         .set({ authorization: "Bearer " + body.token });
//       const res3 = await chai
//         .request(server)
//         .delete("/api/v1/companies/" + res2.body.data.companyId)
//         .set({ authorization: "Bearer " + body.token });
//       expect(res3).to.have.status(404);
//     });
//   });
// });
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
      expect(res).to.have.status(500);
    });

    it("It should NOT GET a list of all companies", async () => {
      const res = await chai.request(server).get("/api/v1/company/all");
      expect(res).to.have.status(404);
    });
  });

  /**
   * Test GET route for a specific company
   */
  describe("GET /api/v1/companies/:id", () => {
    it("It should GET a specific company by its companyId", async () => {
      const newCompany = {
          name: "Test1 company",
          email: "testcompany@mailbox.org",
          locationId: "96c97445-d152-4a4e-9868-bee9d5a18ca2",
          managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
        }
        const resa = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "abi_seth@gmail.com", password: "pass12345" });
      const res2 = await chai
          .request(server)
          .post("/api/v1/companies")
          .send(newCompany)
          .set({ authorization: "Bearer " + resa.body.token })
         
      const res3 = await chai.request(server).get("/api/v1/companies/" + res2.body.data);
      expect(res3).to.have.status(500);
      await chai
        .request(server)
        .delete("/api/v1/companies/" + res2.body.data)
        .set({ authorization: "Bearer " + resa.body.token });
    });

    it("It should NOT GET a specific company by companyId (Non-existing company)", async () => {
      const id = "96c97445-d152-4a4e-9868-bee9d5a18ca2",
        res = await chai.request(server).get("/api/v1/companies/" + id);
      expect(res).to.have.status(404);
    });

    it("It should NOT GET a specific company by its companyId (Invalid UUID)", async () => {
      const id = "96c97445",
        res = await chai.request(server).get("/api/v1/companies/" + id);
      expect(res).to.have.status(500);
    });
  });

  /**
   * Test POST route
   */
  describe("POST /api/v1/companies", () => {
    it("It should POST (create) a new company", async () => {
      const newCompany = {
          name: "Test2company",
          email: "testcompany@mailbox.org",
          locationId: "96c97445-d152-4a4e-9868-bee9d5a18ca2",
          managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
        }
        const resa = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "abi_seth@gmail.com", password: "pass12345" });
      const res2 = await chai
        .request(server)
        .post("/api/v1/companies")
        .send(newCompany)
        .set({ authorization: "Bearer " + resa.body.token });
      expect(res2).to.have.status(400);
      await chai
        .request(server)
        .delete("/api/v1/companies/" + res2.body.data)
        .set({ authorization: "Bearer " + resa.body.token });
    });

    it("It should NOT POST (create) a new company (No token provided)", async () => {
      const newCompany = {
          name: "Test3 company",
          email: "testcompany@mailbox.org",
          locationId: "",
          managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
        },
        res2 = await chai
          .request(server)
          .post("/api/v1/companies")
          .send(newCompany);
      expect(res2).to.have.status(403);
    });

    it("It should NOT POST (create) a new company (Invalid token)", async () => {
      const newCompany = {
          name: "Test4 company",
          email: "testcompany@mailbox.org",
          locationId: "",
          managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
        },
        res2 = await chai
          .request(server)
          .post("/api/v1/companies")
          .set({ authorization: "Bearer Invalidtoken" })
          .send(newCompany);
      expect(res2).to.have.status(401);
    });

    it("It should NOT POST (create) a new company (Invalid info)", async () => {
      const newCompany = {
          name: "Test5 company",
          email: "testcompany@mailbox.org",
        },
        { body } = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "abi_seth@gmail.com", password: "pass12345" });
      const res2 = await chai
        .request(server)
        .post("/api/v1/companies")
        .send(newCompany)
        .set({ authorization: "Bearer " + body.token });
      expect(res2).to.have.status(400);
    });
  });
  /**
   * Test PATCH route
   */
  describe("PATCH /api/v1/companies", () => {
    it("It should PATCH (update) an existing company", async () => {
      const newCompany = {
          name: "Test6 company",
          email: "testcompany@mailbox.org",
          locationId: "96c97445-d152-4a4e-9868-bee9d5a18ca2",
          managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
        },
        updatedCompanyInfo = {
          name: "New name",
          email: "testemail@mailbox.org",
          locationId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
          managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
        },
        { body } = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "abi_seth@gmail.com", password: "pass12345" });
      const res2 = await chai
        .request(server)
        .post("/api/v1/companies")
        .send(newCompany)
        .set({ authorization: "Bearer " + body.token });
      const { companyId } = res2.body.data,
        res3 = await chai
          .request(server)
          .patch("/api/v1/companies/" + companyId)
          .send(updatedCompanyInfo)
          .set({ authorization: "Bearer " + body.token });
      expect(res3).to.have.status(200);
      await chai
        .request(server)
        .delete("/api/v1/companies/" + companyId)
        .set({ authorization: "Bearer " + body.token });
    });

    it("It should NOT PATCH (update) an existing company (No token provided)", async () => {
      const newCompany = {
          name: "Test7 company",
          email: "testcompany@mailbox.org",
          locationId: "96c97445-d152-4a4e-9868-bee9d5a18ca2",
          managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
        },
        updatedCompanyInfo = {
          name: "New name",
          email: "testemail@mailbox.org",
          locationId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
          managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
        },
        { body } = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "abi_seth@gmail.com", password: "pass12345" });
      const res2 = await chai
          .request(server)
          .post("/api/v1/companies")
          .send(newCompany)
          .set({ authorization: "Bearer " + body.token }),
        { companyId } = res2.body.data,
        res3 = await chai
          .request(server)
          .patch("/api/v1/companies/" + companyId)
          .send(updatedCompanyInfo);
      expect(res3).to.have.status(403);
      await chai
        .request(server)
        .delete("/api/v1/companies/" + companyId)
        .set({ authorization: "Bearer " + body.token });
    });

    it("It should NOT PATCH (update) an existing company (Invalid token)", async () => {
      const newCompany = {
          name: "Test8 company",
          email: "testcompany@mailbox.org",
          locationId: "96c97445-d152-4a4e-9868-bee9d5a18ca2",
          managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
        },
        updatedCompanyInfo = {
          name: "New name",
          email: "testemail@mailbox.org",
          locationId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
          managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
        },
        { body } = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "abi_seth@gmail.com", password: "pass12345" });
      const res2 = await chai
          .request(server)
          .post("/api/v1/companies")
          .send(newCompany)
          .set({ authorization: "Bearer " + body.token }),
        { companyId } = res2.body.data,
        res3 = await chai
          .request(server)
          .patch("/api/v1/companies/" + companyId)
          .set({ authorization: "Bearer Invalidtoken" })
          .send(updatedCompanyInfo);
      expect(res3).to.have.status(401);
      await chai
        .request(server)
        .delete("/api/v1/companies/" + companyId)
        .set({ authorization: "Bearer " + body.token });
    });

    it("It should NOT PATCH (update) an existing company (Invalid info)", async () => {
      const newCompany = {
          name: "Test9 company",
          email: "testcompany@mailbox.org",
          locationId: "96c97445-d152-4a4e-9868-bee9d5a18ca2",
          managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
        },
        updatedCompanyInfo = {
          name: "New name",
          email: "testemail",
        },
        { body } = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "abi_seth@gmail.com", password: "pass12345" });
      const res2 = await chai
          .request(server)
          .post("/api/v1/companies")
          .send(newCompany)
          .set({ authorization: "Bearer " + body.token }),
        { companyId } = res2.body.data,
        res3 = await chai
          .request(server)
          .patch("/api/v1/companies/" + companyId)
          .send(updatedCompanyInfo)
          .set({ authorization: "Bearer " + body.token });
      expect(res3).to.have.status(400);
      await chai
        .request(server)
        .delete("/api/v1/companies/" + companyId)
        .set({ authorization: "Bearer " + body.token });
    });
  });
  /**
   * Test DELETE route
   */
  describe("DELETE /api/v1/companies/:id", () => {
    it("It should DELETE a specific company by its companyId", async () => {
      const newCompany = {
          name: "Test10 company",
          email: "testcompany@mailbox.org",
          locationId: "96c97445-d152-4a4e-9868-bee9d5a18ca2",
          managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
        },
        { body } = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "abi_seth@gmail.com", password: "pass12345" });
      const res2 = await chai
          .request(server)
          .post("/api/v1/companies")
          .send(newCompany)
          .set({ authorization: "Bearer " + body.token }),
        res3 = await chai
          .request(server)
          .delete("/api/v1/companies/" + res2.body.data.companyId)
          .set({ authorization: "Bearer " + body.token });
      expect(res3).to.have.status(200);
    });

    it("It should NOT DELETE a specific company by its companyId (Invalid companyId)", async () => {
      const { body } = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "abi_seth@gmail.com", password: "pass12345" }),
        res = await chai
          .request(server)
          .delete("/api/v1/companies/8dse43")
          .set({ authorization: "Bearer " + body.token });
      expect(res).to.have.status(500);
    });

    it("It should NOT DELETE a specific company by its companyId (Non-existing companyId)", async () => {
      const newCompany = {
          name: "Test11 company",
          email: "testcompany@mailbox.org",
          locationId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
          managerId: "bd8ba2ce-9e9c-400d-aa0c-e5bbb9d1c900",
        },
        { body } = await chai
          .request(server)
          .post("/api/v1/users/login")
          .send({ email: "abi_seth@gmail.com", password: "pass12345" });
      const res2 = await chai
        .request(server)
        .post("/api/v1/companies")
        .send(newCompany)
        .set({ authorization: "Bearer " + body.token });
      await chai
        .request(server)
        .delete("/api/v1/companies/" + res2.body.data.companyId)
        .set({ authorization: "Bearer " + body.token });
      const res3 = await chai
        .request(server)
        .delete("/api/v1/companies/" + res2.body.data.companyId)
        .set({ authorization: "Bearer " + body.token });
      expect(res3).to.have.status(404);
    });
  });
});