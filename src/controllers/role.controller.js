// @ts-nocheck
import _ from 'lodash';
import { Roles, User } from '../models';
import { validateRoleRegistration } from '../validators/role.validator';

export async function addRole(req, res) {
  try {
    const role = req.body;

    const validateRoleInput = validateRoleRegistration(role);

    if (validateRoleInput.error) {
      return res.status(400).json(validateRoleInput.error.details[0].message);
    }

    role.roleTitle = role.roleTitle.toUpperCase();

    const duplicateRole = await Roles.findOne({ where: { roleTitle: role.roleTitle } });
    if (duplicateRole) {
      return res.status(403).json({
        success: false,
        status: 403,
        message: 'Role already exists!',
      });
    }

    const newRole = await Roles.create(
      _.pick(role, [
        'roleTitle'
      ])
    );

    return res.status(201).json({
      success: true,
      status: 201,
      message: 'Role created successfully',
      data: newRole
    });
  } catch (e) {
    res.status(500).send(`Error: ${e}`);
  }
}

export async function getAllRoles(req, res) {
  try {
    await Roles.findAll().then((roles) => res.status(200).json(roles));
  } catch (e) {
    res.status(500).send(`Error: ${e}`);
  }
}

export async function getSpecificRole(req, res) {
  try {
    await Roles
      .findOne({ where: { roleId: req.params.id } })
      .then((role) => {
        if (role) res.status(200).json(role);
        else { res.status(404).send({ message: "Role with that id doesn't exist" }); }
      });
  } catch (err) {
    res.status(500).send({ message: `Error: ${err}` });
  }
}

export async function assignRole(req, res) {
  try {
    await User.find({ where: { email: req.params.email } })
      .on('success', (user) => {
        if (user) {
          user.update({
            roleId: req.params.roleId
          })
            .success(() => {});
        }
      });
  } catch (err) {
    res.status(500).send({ message: `Error: ${err}` });
  }
}
