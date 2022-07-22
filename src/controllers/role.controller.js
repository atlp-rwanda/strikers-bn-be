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

    const duplicateRole = await Roles.findOne({
      where: { roleTitle: role.roleTitle },
    });
    if (duplicateRole) {
      return res.status(403).json({
        success: false,
        status: 403,
        message: 'Role already exists!',
      });
    }

    const newRole = await Roles.create(_.pick(role, ['roleTitle']));

    return res.status(201).json({
      success: true,
      status: 201,
      message: 'Role created successfully',
      data: newRole,
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
    await Roles.findOne({ where: { roleId: req.params.id } }).then((role) => {
      if (role) res.status(200).json(role);
      else res.status(404).send({ message: "Role with that id doesn't exist" });
    });
  } catch (err) {
    res.status(500).send({ message: `Error: ${err}` });
  }
}

export async function assignRole(req, res) {
  try {
    const user = await User.find({ where: { email: req.params.email } });
    if (!user) {
      return res
        .status(404)
        .send({
          success: false,
          message: "User with that email doesn't exist",
        });
    }
    await User.update({
      roleId: req.params.roleId,
    }).success(() => {});
  } catch (err) {
    res.status(500).send({ message: `Error: ${err}` });
  }
}

export async function updateRole(req, res) {
  try {
    let { roleTitle } = req.body,
      { roleId } = req.params;

    const validateRoleInput = validateRoleRegistration(req.body);

    if (validateRoleInput.error) {
      return res.status(400).json(validateRoleInput.error.details[0].message);
    }

    roleTitle = roleTitle.toUpperCase();

    const otherExistsAlready = await Roles.findOne({
      where: { roleTitle },
    });
    if (otherExistsAlready) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "There's already another role with the same title!",
      });
    }

    const existing = await Roles.findOne({
      where: { roleId },
    });
    if (!existing) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "That role doesn't exist!",
      });
    }

    const updatedRole = await Roles.update(
      { roleTitle },
      { where: { roleId } }
    );

    existing.roleTitle = roleTitle;

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Role title updated successfully',
      data: existing,
    });
  } catch (e) {
    res.status(500).send(`Error: ${e}`);
  }
}

export async function deleteRole(req, res) {
  try {
    const { roleId } = req.params;
    const roleToDelete = await Roles.findOne({ where: { roleId } });
    if (!roleToDelete) {
      return res.status(404).send({
        message: "The specified roleId doesn't exist in the database",
      });
    }
    await Roles.destroy({ where: { roleId } });
    res.status(200).send({
      message: `Successfully deleted the ${roleToDelete.roleTitle} role.`,
      deletedRole: roleToDelete,
    });
  } catch (e) {
    res.status(500).send(`Error: ${e}`);
  }
}