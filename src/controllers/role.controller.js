// @ts-nocheck
import { Role } from "../models/role.model";

export async function getAllRoles(req, res) {
  try {
    await (await Role()).findAll().then((roles) => res.status(200).json(roles));
  } catch (e) {
    res.status(500).send(`Error: ${e}`);
  }
}

export async function getSpecificRole(req, res) {
  try {
    await (await Role())
      .findOne({ where: { role_id: req.params.id } })
      .then((role) => {
        if (role) res.status(200).json(role);
        else
          res.status(404).send({ message: "Role with that id doesn't exist" });
      });
  } catch (err) {
    res.status(500).send({ message: `Error: ${err}` });
  }
}
