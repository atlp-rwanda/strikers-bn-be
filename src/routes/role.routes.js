import express from "express";
import { getAllRoles, getSpecificRole } from "../controllers/role.controller";

const router = express.Router();

router.get("/", getAllRoles);

module.exports = router;
