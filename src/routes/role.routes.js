import express from "express";
import { getAllRoles, getSpecificRole, assignRole } from "../controllers/role.controller";
import authenticate from '../middlewares/auth';
import adminCheck from '../middlewares/super-admin';

const router = express.Router();

router.get("/", getAllRoles);
router.get("/:id", getSpecificRole)
router.patch("/:userid/:roleid", [auth, adminCheck], assignRole);

module.exports = router;
