const { matchedData } = require('express-validator')
const clientService = require('../services/clientService')

const getAllClients = async function (req, res) {
  try {
    const allclients = await clientService.getAllClient()
    return res.status(200).json({ status: 200, message: 'Clientes:', data: allclients })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener los clientes.', error: error.message })
  }
}

const  getOneClients = async function (req, res) {
  try {
    const client = await clientService.getOneClient(req.params.id)
    if (client) {
      return res.status(200).json({ status: 200, message: 'Cliente por ID:', data: client })
    } else {
      return res.status(404).json({ status: 404, message: 'Cliente no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener el cliente por ID.', error: error.message })
  }
}

const createClients = async function (req, res) {
  try {
    const validData = matchedData(req)
    const createClient = await clientService.createClient(validData)
    return res.status(201).json({ status: 201, message: 'Cliente creado satisfactoriamente', data: createClient })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al crear el cliente.', error: error.message })
  }
}

const updateClients = async function (req, res) {
  try {
    const idClient = req.params.id

    if (!idClient) {
      return res.status(404).json({ status: 404, message: 'Cliente no encontrado.' })
    }

    const validData = matchedData(req)

    const updatedClient = await clientService.updateClient(idClient, validData)
    return res.status(200).json({ status: 200, message: 'Cliente actualizado satisfactoriamente', data: updatedClient })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al actualizar el cliente.', error: error.message })
  }
}

const deleteClients = async function (req, res) {
  try {
    const deletedAdd = await clientService.deleteClient(req.params.id)
    if (deletedAdd) {
      return res.status(200).json({ status: 200, message: 'Cliente eliminado satisfactoriamente', data: deletedAdd })
    } else {
      return res.status(404).json({ status: 404, message: 'Cliente no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al eliminar el cliente.', error: error.message })
  }
}

const getCompanyByClientName = async function (req, res) {
  try {
    const { clientId } = req.params;

    if (!clientId) {
      return res.status(400).json({ status: 400, message: 'Id del cliente no proporcionado.' });
    }

    const clientWithCompany = await clientService.getCompanyByClientName(clientId);

    return res.status(200).json({
      status: 200,
      message: `Compañía asociada al cliente ${clientId}:`,
      data: clientWithCompany,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Error al obtener la compañía del cliente.',
      error: error.message,
    });
  }
};

const getAllClientsCompany = async function (req, res) {
  try {
    const data = await clientService.getAllClientsWithCompany();
    return res.status(200).json({ status: 200, message: 'Clientes y compañías:', data });
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener clientes y compañías.', error: error.message });
  }
};


module.exports = {
  getAllClients,
  getOneClients,
  createClients,
  updateClients,
  deleteClients,
  getCompanyByClientName,
  getAllClientsCompany
}
