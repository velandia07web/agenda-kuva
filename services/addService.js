const { Add } = require('../models')

const getAllAdds = async function () {
  try {
    return await Add.findAndCountAll({
      order: [['name', 'ASC']]
    })
  } catch (error) {
    throw new Error(`Error al obtener los adds: ${error.message}`)
  }
}

const getOneAdd = async function (id) {
  try {
    return await Add.findOne(
      {
        where: { id }
      }
    )
  } catch (error) {
    throw new Error(`Error al obtener el Add: ${error.message}`)
  }
}

const createAdd = async function (body) {
  try {
    return await Add.create({
      name: body.name,
      price: body.price,
      idTypePrice: body.idTypePrice,
      state: "ACTIVO"
    })
  } catch (error) {
    throw new Error(`Error al crear el add: ${error.message}`)
  }
}

const updateAdd = async function (id, body) {
  try {
    // Crear un objeto con los campos que se van a actualizar
    const updateData = {
      name: body.name,
      price: body.price,
      idTypePrice: body.idTypePrice,
      state: "ACTIVO"
    }

    // Actualizar el usuario solo con los campos presentes en updateData
    return await Add.update(updateData, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el Add: ${error.message}`)
  }
}

const deleteAdd = async function (id) {
  try {
    const add = await Add.findOne({ where: { id } });

    if (!add) {
      throw new Error(`Add con id ${id} no encontrado`);
    }

    const newState = add.state === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';

    const updatedCount = await Add.update(
      { state: newState },
      { where: { id } }
    );

    if (updatedCount[0] === 0) {
      throw new Error(`No se pudo actualizar el estado del Add con id ${id}`);
    }

    return { id, newState };
  } catch (error) {
    throw new Error(`Error al alternar el estado del Add: ${error.message}`);
  }
};

module.exports = {
  getAllAdds,
  getOneAdd,
  createAdd,
  updateAdd,
  deleteAdd
}
