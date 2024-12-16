const { City } = require('../models')

const getAllCities = async function () {
  try {
    return await City.findAndCountAll({
      order: [['name', 'ASC']]
    })
  } catch (error) {
    throw new Error(`Error al obtener las Ciudades: ${error.message}`)
  }
}

const getOneCity = async function (id) {
  try {
    return await City.findOne({ where: { id } })
  } catch (error) {
    throw new Error(`Error al obtener el ciudad: ${error.message}`)
  }
}

const createCity = async function (body) {
  try {
    return await City.create({
      name: body.name,
      idZone: body.idZone,
      state: "ACTIVO"
    })
  } catch (error) {
    throw new Error(`Error al crear el ciudad: ${error.message}`)
  }
}

const updateCity = async function (id, body) {
  try {
    return await City.update({
      name: body.name,
      idZone: body.idZone
    }, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el ciudad: ${error.message}`)
  }
}

const deleteCity = async function (id) {
  try {
    const city = await City.findOne({ where: { id } });

    if (!city) {
      throw new Error(`Ciudad con id ${id} no encontrado`);
    }

    const newState = city.state === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';

    const updatedCount = await City.update(
      { state: newState },
      { where: { id } }
    );

    if (updatedCount[0] === 0) {
      throw new Error(`No se pudo actualizar el estado de la ciudad con id ${id}`);
    }

    return { id, newState };
  } catch (error) {
    throw new Error(`Error al alternar el estado de la ciudad: ${error.message}`);
  }
};

module.exports = {
  getAllCities,
  getOneCity,
  createCity,
  updateCity,
  deleteCity
}
