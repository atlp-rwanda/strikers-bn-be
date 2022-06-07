// @ts-nocheck
import { roles, User } from '../models';

const Role = roles;

export async function getAllRoles(req, res) {
  try {
    await roles.findAll().then((roles) => res.status(200).json(roles));
  } catch (e) {
    res.status(500).send(`Error: ${e}`);
  }
}

export async function getSpecificRole(req, res) {
  try {
    await roles
      .findOne({ where: { roleid: req.params.id } })
      .then((role) => {
        if (role) res.status(200).json(role);
        else
          res.status(404).send({ message: "Role with that id doesn't exist" });
      });
  } catch (err) {
    res.status(500).send({ message: `Error: ${err}` });
  }
}

export async function assignRole(req, res) {
  try {
    await User.find({ where: { uuid: req.params.userid } })
  .on('success', function (project) {
    if (user) {
      user.update({
        roleid: req.params.roleid
      })
      .success(function () {})
    }
  }) 
  }catch (err) {
    res.status(500).send({ message: `Error: ${err}` });
  }
}