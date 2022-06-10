/* eslint-disable import/no-import-module-exports */
import express from 'express';
import {
  addRole, getAllRoles, getSpecificRole, assignRole
} from '../controllers/role.controller';
import { verifyToken } from '../middlewares/auth';
import { adminCheck } from '../middlewares/super-admin';

const router = express.Router();

/**
 * @description To add a new role
 * @api api/roles
 * @access Private
 * @type POST
 */
router.post('/', [verifyToken, adminCheck], addRole);

/**
 * @description To get a list of all roles
 * @api api/roles
 * @access Public
 * @type GET
 */
router.get('/', getAllRoles);

/**
 * @description To get a specific role
 * @api api/roles/:id
 * @access Public
 * @type GET
 */
router.get('/:id', getSpecificRole);

/**
 * @description To assign a role to a certain user by his/her email
 * @api api/roles/:email/:roleId
 * @access Public
 * @type PATCH
 */
router.patch('/:email/:roleId', [verifyToken, adminCheck], assignRole);

export default router;
