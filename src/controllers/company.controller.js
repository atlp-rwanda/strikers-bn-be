// @ts-nocheck
import _ from 'lodash';
import { User, Company } from '../models';
import { validateCompanyRegistration } from '../validators/company.validator';

export async function getAllCompanies(req, res) {
  try {
    await Company.findAll().then((companies) => res.status(200).json(companies));
  } catch (e) {
    res.status(500).send(`Error: ${e}`);
  }
}

export async function getSpecificCompany(req, res) {
  try {
    await Company.findOne({ where: { companyId: req.params.id } }).then(
      (company) => {
        if (company) res.status(200).json(company);
        else {
          res
            .status(404)
            .send({ message: "Company with that uuid doesn't exist" });
        }
      }
    );
  } catch (err) {
    res.status(500).send({ message: `Error: ${err}` });
  }
}

export async function newCompany(req, res) {
  try {
    const newCompany = { ...req.body };

    const validateCompanyInput = validateCompanyRegistration(newCompany);

    if (validateCompanyInput.error) {
      return res
        .status(400)
        .json(validateCompanyInput.error.details[0].message);
    }

    // const checkLocation = await Location.findOne({
    //   where: { locationId: newCompany.locationId },
    // });

    // if (!checkLocation) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "No location is registered with that locationId you provided",
    //   });
    // }
    const checkManager = await User.findOne({
      where: {
        uuid: newCompany.managerId,
        roleId: 'c648ab3d-5d6c-4106-bc4f-cb17ed2d8568',
      },
    });

    if (!checkManager) {
      return res.status(404).json({
        success: false,
        message: "Invalid Manager Id - Doesn't exist in the database",
      });
    }

    const checkCompany = await Company.findOne({
      where: { name: newCompany.name, managerId: newCompany.managerId },
    });

    if (checkCompany) {
      return res.status(400).json({
        success: false,
        message:
          'There is already another company with the same details you provided',
      });
    }

    const createdCompany = await Company.create(
      _.pick(newCompany, ['name', 'email', 'locationId', 'managerId'])
    );

    return res.status(201).json({
      success: true,
      status: 201,
      message: `'${newCompany.name}' Company was registered successfully`,
      data: createdCompany,
    });
  } catch (e) {
    res.status(500).send(`Error: ${e}`);
  }
}

export async function updateCompanyInfo(req, res) {
  try {
    const newCompany = { ...req.body };

    const validateCompanyInput = validateCompanyRegistration(newCompany);

    if (validateCompanyInput.error) {
      return res
        .status(400)
        .json(validateCompanyInput.error.details[0].message);
    }

    // const checkLocation = await Location.findOne({
    //   where: { locationId: newCompany.locationId },
    // });

    // if (!checkLocation) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "No location is registered with that locationId you provided",
    //   });
    // }

    const checkCompanyExists = await Company.findOne({
      where: { companyId: req.params.id },
    });

    if (!checkCompanyExists) {
      return res.status(404).json({
        success: false,
        message: 'No company is registered with that companyId you provided',
      });
    }

    const checkManager = await User.findOne({
      where: {
        uuid: newCompany.managerId,
        roleId: 'c648ab3d-5d6c-4106-bc4f-cb17ed2d8568',
      },
    });

    if (!checkManager) {
      return res.status(404).json({
        success: false,
        message: "Invalid Manager Id - Doesn't exist in the database",
      });
    }

    const checkCompany = await Company.findOne({
      where: { name: newCompany.name, managerId: newCompany.managerId },
    });

    if (checkCompany) {
      return res.status(400).json({
        success: false,
        message:
          'There is already another company with the same details you provided',
      });
    }

    const {
      name, email, locationId, managerId
    } = newCompany;

    await Company.update(
      {
        name,
        email,
        locationId,
        managerId,
      },
      { where: { companyId: req.params.id } }
    );

    checkCompanyExists.name = name;
    checkCompanyExists.email = email;
    checkCompanyExists.locationId = locationId;
    checkCompanyExists.managerId = managerId;

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'This Company was updated successfully',
      data: checkCompanyExists,
    });
  } catch (e) {
    res.status(500).send(`Error: ${e}`);
  }
}

export async function deleteCompany(req, res) {
  try {
    const { id } = req.params;
    const companyToDelete = await Company.findOne({ where: { companyId: id } });
    if (!companyToDelete) {
      return res.status(404).send({
        message: "The specified company doesn't exist in the database",
      });
    }
    await Company.destroy({ where: { companyId: id } });
    res.status(200).send({
      message: 'Successfully deleted that company.',
      deletedCompany: companyToDelete,
    });
  } catch (e) {
    res.status(500).send(`Error: ${e}`);
  }
}
