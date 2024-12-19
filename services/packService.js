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
      idZone: body.idZone,
      state: "ACTIVO"
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
    const pack = await Pack.findOne({ where: { id } });

    if (!pack) {
      throw new Error(`Pack con id ${id} no encontrado`);
    }

    const newState = pack.state === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';

    const updatedCount = await Pack.update(
      { state: newState },
      { where: { id } }
    );

    if (updatedCount[0] === 0) {
      throw new Error(`No se pudo actualizar el estado del Pack con id ${id}`);
    }

    return { id, newState };
  } catch (error) {
    throw new Error(`Error al alternar el estado del Pack: ${error.message}`);
  }
};

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

const getPacksWithPricesByZone = async function (idZone) {
  try {
    const packs = await Pack.findAll({
      where: { idZone },
      include: [
        {
          model: PricePack,
          as: 'PricePack',
          attributes: ['id', 'price', 'priceDeadHour'],
        },
      ],
      attributes: ['id', 'name', 'description'],
    });

    return packs.map(pack => {
      return pack.PricePack.map(price => ({
        id: price.id,
        name: pack.name,
        description: pack.description,
        price: price.price,
        priceDeadHour: price.priceDeadHour
      }));
    }).flat();
  } catch (error) {
    throw new Error(`Error al obtener los packs y precios por zona: ${error.message}`);
  }
};

module.exports = {
  getAllPacks,
  getOnePack,
  createPack,
  updatePack,
  deletePack,
  getPricePacks,
  getPacksWithPricesByZone
}
