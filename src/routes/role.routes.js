import express from "express";
import { getAllRoles, getSpecificRole, assignRole } from "../controllers/role.controller";
import { verifyToken } from '../middlewares/auth';
import { adminCheck } from '../middlewares/super-admin';

const router = express.Router();

/**
 * @description To get a list of all roles
 * @api api/roles
 * @access Public
 * @type GET
 */
router.get("/", getAllRoles);

/**
 * @description To get a specific role
 * @api api/roles/:id
 * @access Public
 * @type GET
 */
router.get("/:id", getSpecificRole)

/**
 * @description To assign a role to a certain user by his/her email
 * @api api/roles/:email/:roleid
 * @access Public
 * @type PATCH
 */
router.patch("/:email/:roleid", [verifyToken, adminCheck], assignRole);

module.exports = router;
