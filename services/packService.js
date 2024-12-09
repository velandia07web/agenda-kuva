const { Pack, PricePack } = require('../models')

const getAllPacks = async function () {
  try {
    return await Pack.findAndCountAll({
      order: [['name', 'ASC']],
      include: [
        {
          model: PricePack,
          as: 'PricePack',
          attributes: ['id', 'price']
        }
      ]
    });
  } catch (error) {
    throw new Error(`Error al obtener los packs: ${error.message}`);
  }
};

const getOnePack = async function (id) {
  try {
    return await Pack.findOne({ where: { id } })
  } catch (error) {
    throw new Error(`Error al obtener el Pack: ${error.message}`)
  }
}

const createPack = async function (body) {
  try {
    return await Pack.create({
      name: body.name,
      description: body.description,
      price: body.price,
      idProduct: body.idProduct,
      idZone: body.idZone
    })
  } catch (error) {
    throw new Error(`Error al crear el pack: ${error.message}`)
  }
}

const updatePack = async function (id, body) {
  try {
    return await Pack.update({
      name: body.name,
      description: body.description,
      price: body.price,
      idProduct: body.idProduct,
      idZone: body.idZone
    }, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el Pack: ${error.message}`)
  }
}

const deletePack = async function (id) {
  try {
    const deletedCount = await Pack.destroy({ where: { id } })
    if (deletedCount === 0) {
      throw new Error(`Pack con id ${id} no encontrado`)
    }
    return deletedCount
  } catch (error) {
    throw new Error(`Error al eliminar el Pack: ${error.message}`)
  }
}

const getPricePacks = async function () {
  try {
    const packs = await Pack.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: PricePack,
          as: 'PricePack',
          attributes: ['price'],
        },
      ],
    });

    return packs.map((pack) => ({
      id: pack.id,
      name: pack.name,
      price: pack.PricePack?.[0]?.price || null,
    }));
  } catch (error) {
    throw new Error(`Error al obtener los PricePacks: ${error.message}`);
  }
};

module.exports = {
  getAllPacks,
  getOnePack,
  createPack,
  updatePack,
  deletePack,
  getPricePacks
}
