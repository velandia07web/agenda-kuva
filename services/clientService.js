const { Client,Company } = require('../models')

const getAllClient = async function () {
  try {
    return await Client.findAndCountAll({
      order: [['name', 'ASC']]
    })
  } catch (error) {
    throw new Error(`Error al obtener los clientes: ${error.message}`)
  }
}

const getOneClient = async function (id) {
  try {
    return await Client.findOne({ where: { id } })
  } catch (error) {
    throw new Error(`Error al obtener el cliente: ${error.message}`)
  }
}

const createClient = async function (body) {
  try {
    return await Client.create({
      name: body.name,
      lastName: body.lastName,
      idZone: body.idZone,
      CC: body.CC,
      idTypeClient: body.idTypeClient,
      idTypeDocument: body.idTypeDocument,
      numberDocument: body.numberDocument,
      email: body.email,
      idCompany: body.idCompany,
      celphone: body.celphone,
      charge: body.charge,
      idUser: body.idUser,
      idSocialMedia: body.idSocialMedia,
      cupoDisponible: body.cupoDisponible,
      cupoCopado: body.cupoCopado
    })
  } catch (error) {
    throw new Error(`Error al crear el cliente: ${error.message}`)
  }
}

const updateClient = async function (id, body) {
  try {
    return await Client.update({
      name: body.name,
      lastName: body.lastName,
      idZone: body.idZone,
      CC: body.CC,
      idTypeClient: body.idTypeClient,
      idTypeDocument: body.idTypeDocument,
      numberDocument: body.numberDocument,
      email: body.email,
      idCompany: body.idCompany,
      celphone: body.celphone,
      charge: body.charge,
      idUser: body.idUser,
      idSocialMedia: body.idSocialMedia,
      cupoDisponible: body.cupoDisponible,
      cupoCopado: body.cupoCopado
    }, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el cliente: ${error.message}`)
  }
}

const deleteClient = async function (id) {
  try {
    const deletedCount = await Client.destroy({ where: { id } })
    if (deletedCount === 0) {
      throw new Error(`Cliente con id ${id} no encontrado`)
    }
    return deletedCount
  } catch (error) {
    throw new Error(`Error al eliminar el cliente: ${error.message}`)
  }
}

const getCompanyByClientName = async function (clientId) {
  try {
    const clientWithCompany = await Client.findOne({
      where: { id: clientId },
      include: [
        {
          model: Company,
          as: 'Company',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      attributes: [],
    });

    if (!clientWithCompany) {
      throw new Error(`Cliente con ID ${clientId} no encontrado.`);
    }

    return clientWithCompany.Company;
  } catch (error) {
    throw new Error(`Error al obtener la información del cliente: ${error.message}`);
  }
};

const getAllClientsWithCompany = async function () {
  try {
    const clientsWithCompanies = await Client.findAll({
      include: [
        {
          model: Company,
          as: 'associatedCompany',
          attributes: ['name'],
        },
      ],
      attributes: ['id', 'name', 'celphone', 'email', 'idTypeClient'],
    });

    if (!clientsWithCompanies.length) {
      throw new Error('No se encontraron clientes con compañías asociadas.');
    }

    const result = clientsWithCompanies.map(client => ({
      idCliente: client.id,
      nameCliente: client.name,
      nameCompany: client.associatedCompany?.name || 'Sin compañía asociada',
      telCliente: client.celphone,
      emailcliente: client.email,
      typeClient: client.idTypeClient,
    }));

    return result;
  } catch (error) {
    throw new Error(`Error al obtener los clientes con sus compañías: ${error.message}`);
  }
};



module.exports = {
  getAllClient,
  getOneClient,
  createClient,
  updateClient,
  deleteClient,
  getCompanyByClientName,
  getAllClientsWithCompany
}
