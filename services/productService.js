const { Product,ProductPrice } = require('../models')

const getAllProducts = async function (idCompany) {
  try {
    const idCompanyInt = parseInt(idCompany, 10);

    if (isNaN(idCompanyInt)) {
      throw new Error("idCompany debe ser un número entero válido.");
    }
    return await Product.findAndCountAll({
      where: {
        idCompany: idCompanyInt
      },
      order: [['name', 'ASC']]
    });
  } catch (error) {
    throw new Error(`Error al obtener los productos para idCompany ${idCompany}: ${error.message}`);
  }
};

const getOneProduct = async function (id) {
  try {
    return await Product.findOne({ where: { id } })
  } catch (error) {
    throw new Error(`Error al obtener el Product: ${error.message}`)
  }
}

const createProduct = async function (body) {
  try {
    return await Product.create({
      name: body.name,
      imagen: body.imagen,
      description: body.description,
      count: body.count,
      idZone: body.idZone
    })
  } catch (error) {
    throw new Error(`Error al crear el Product: ${error.message}`)
  }
}

const updateProduct = async function (id, body) {
  try {
    return await Product.update({
      name: body.name,
      imagen: body.imagen,
      description: body.description,
      count: body.count,
      idZone: body.idZone
    }, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el Product: ${error.message}`)
  }
}

const deleteProduct = async function (id) {
  try {
    const deletedCount = await Product.destroy({ where: { id } })
    if (deletedCount === 0) {
      throw new Error(`Product con id ${id} no encontrado`)
    }
    return deletedCount
  } catch (error) {
    throw new Error(`Error al eliminar el Product: ${error.message}`)
  }
}

const getPriceProducts = async function () {
  try {
    const productPrices = await Product.findAll({
      include: [
        {
          model: ProductPrice,
          as: 'ProductPrices',
          attributes: ['price'],
        },
      ],
      attributes: ['id', 'name'],
    });

    return productPrices.map(product => ({
      id: product.id,
      name: product.name,
      price: product.ProductPrices.length > 0 ? product.ProductPrices[0].price : null,
    }));
  } catch (error) {
    throw new Error(`Error al obtener los precios de los productos: ${error.message}`);
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getPriceProducts
}
