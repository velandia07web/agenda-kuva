const { Product,ProductPrice,  Add, Pack, PricePack, City} = require('../models');
const { sequelize } = require('../models');
const { Op } = require("sequelize");

const getAllProducts = async function () {
  try {
    return await Product.findAndCountAll();
  } catch (error) {
    throw new Error(`Error al obtener los productos: ${error.message}`);
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
  const transaction = await sequelize.transaction();
  try {
    const newProduct = await Product.create(
        {
          name: body.name,
          imagen: body.imagen,
          description: body.description,
          active: body.active !== undefined ? body.active : true,
          idZone: body.idZone,
          count: body.count || 0,
          state: "ACTIVO"
        },
        { transaction }
    );

    if (body.prices && Array.isArray(body.prices)) {
      const prices = body.prices.map(price => ({
        product_id: newProduct.id,
        hour: price.hour,
        idZone: body.idZone,
        price: price.price,
        priceDeadHour: price.priceDeadHour,
        type_price_id: price.type_price_id,
      }));

      await ProductPrice.bulkCreate(prices, { transaction });
    }

    await transaction.commit();
    return newProduct;
  } catch (error) {
    await transaction.rollback();
    throw new Error(`Error al crear el producto: ${error.message}`);
  }
};

const updateProduct = async function (id, body) {
  const transaction = await sequelize.transaction();
  try {
    await Product.update(
        {
          name: body.name,
          imagen: body.imagen,
          description: body.description,
          active: body.active !== undefined ? body.active : true,
          idZone: body.idZone,
          count: body.count !== undefined ? body.count : undefined,
        },
        { where: { id }, transaction }
    );

    if (body.prices && Array.isArray(body.prices)) {
      await ProductPrice.destroy({ where: { product_id: id }, transaction });

      const newPrices = body.prices.map(price => ({
        product_id: id,
        hour: price.hour,
        idZone: body.idZone,
        price: price.price,
        priceDeadHour: price.priceDeadHour,
        type_price_id: price.type_price_id,
      }));

      await ProductPrice.bulkCreate(newPrices, { transaction });
    }

    await transaction.commit();
    return { message: 'Producto actualizado exitosamente' };
  } catch (error) {
    await transaction.rollback();
    throw new Error(`Error al actualizar el producto: ${error.message}`);
  }
};

const deleteProduct = async function (id) {
  try {
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      throw new Error(`Product con id ${id} no encontrado`);
    }

    const newState = product.state === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';

    const updatedCount = await Product.update(
      { state: newState },
      { where: { id } }
    );

    if (updatedCount[0] === 0) {
      throw new Error(`No se pudo actualizar el estado del Product con id ${id}`);
    }

    return { id, newState };
  } catch (error) {
    throw new Error(`Error al alternar el estado del Product: ${error.message}`);
  }
};

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

const getProductsWithPricesByZoneAndType = async function (idZone, typePriceId) {
  try {
    const whereClause = { idZone };
    if (typePriceId) {
      whereClause['$ProductPrices.type_price_id$'] = typePriceId;
    }

    const products = await Product.findAll({
      where: whereClause,
      include: [
        {
          model: ProductPrice,
          as: 'ProductPrices',
          attributes: ['id','hour', 'price', 'priceDeadHour', 'type_price_id'],
        },
      ],
      attributes: ['name'],
    });

    return products.map(product => {
      return product.ProductPrices.map(price => ({
        id: price.id,
        name: product.name,
        hour: price.hour,
        price: price.price,
        priceDeadHour: price.priceDeadHour,
        typePrice: price.type_price_id
      }));
    }).flat();
  } catch (error) {
    throw new Error(`Error al obtener los productos y precios por zona y tipo de precio: ${error.message}`);
  }
};

const updateProductPrice = async function (id, body) {
  try {
    const productPrice = await ProductPrice.findByPk(id);

    if (!productPrice) {
      throw new Error(`ProductPrice con id ${id} no encontrado.`);
    }
    console.log(body);
    const updatedProductPrice = await productPrice.update({
      hour: body.hour,
      price: body.price,
      priceDeadHour: body.priceDeadHour,
      idZone: body.idZone,
      type_price_id: body.type_price_id,
    });

    return updatedProductPrice;
  } catch (error) {
    throw new Error(`Error al actualizar el ProductPrice: ${error.message}`);
  }
};

const deleteProductPrice = async function (id) {
  try {
    const deletedCount = await ProductPrice.destroy({ where: { id } });

    if (deletedCount === 0) {
      throw new Error(`ProductPrice con id ${id} no encontrado.`);
    }

    return deletedCount;
  } catch (error) {
    throw new Error(`Error al eliminar el ProductPrice: ${error.message}`);
  }
};

const getProductsDataByTypePrice = async function (idTypePrice, idZone, idCity) {
  try {
    const city = await City.findByPk(idCity, {
      attributes: ['transportPrice'],
      where: { state: 'ACTIVO' },
    });

    if (!city) {
      throw new Error(`City con ID ${idCity} no encontrada.`);
    }

    const transportPrice = city.transportPrice;

    const products = await Product.findAll({
      where: { idZone: idZone, count: { [Op.gt]: 0 }, state: 'ACTIVO' },
      include: [
        {
          model: ProductPrice,
          as: 'ProductPrices',
          where: {
            type_price_id: idTypePrice,
            idZone: idZone,
          },
          attributes: ['hour', 'price', 'priceDeadHour'],
        },
      ],
      attributes: ['id', 'name', 'count'],
    });

    const parseHourToNumber = (hourString) => {
      if (!hourString) return 0;
      let totalHours = 0;
      if (hourString.includes("MEDIA")) {
        totalHours += 0.5;
        hourString = hourString.replace("Y MEDIA", "").trim(); // Elimina "Y MEDIA"
      }
      const hourMatch = hourString.match(/(\d+)/);
      if (hourMatch) {
        totalHours += parseInt(hourMatch[1], 10);
      }
    
      return totalHours;
    };

    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      count: product.count,
      prices: product.ProductPrices.map(price => ({
        hour: price.hour,
        numberHour: parseHourToNumber(price.hour),
        price: price.price,
        priceDeadHour: price.priceDeadHour,
      })),
    }));

    const adds = await Add.findAll({
      where: { idTypePrice: idTypePrice, state: 'ACTIVO' },
      attributes: ['id', 'name', 'price'],
    });

    const formattedAdds = adds.map(add => ({
      id: add.id,
      name: add.name,
      price: add.price,
    }));

    const packs = await Pack.findAll({
      where: { idZone: idZone, state: 'ACTIVO' },
      attributes: ['id', 'name', 'description', 'idProduct'],
      include: [
        {
          model: PricePack,
          as: 'PricePack',
          attributes: ['price', 'priceDeadHour'],
        },
        {
          model: Product,
          as: 'Product',
          attributes: ['name', 'count'],
          where: { count: { [Op.gt]: 0 } },
        },
      ],
    });

    const formattedPacks = packs.map(pack => {
      const priceInfo = pack.PricePack[0] || { price: null, priceDeadHour: null };
      return {
        id: pack.id,
        name: pack.name,
        description: pack.description,
        idProduct: pack.idProduct,
        price: priceInfo.price,
        priceDeadHour: priceInfo.priceDeadHour,
        productName: pack.Product ? pack.Product.name : null,
        productCount: pack.Product ? pack.Product.count : null,
      };
    });

    return {
      transportPrice: transportPrice,
      products: formattedProducts,
      adds: formattedAdds,
      packs: formattedPacks,
    };
  } catch (error) {
    throw new Error(`Error al obtener los datos: ${error.message}`);
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getPriceProducts,
  getProductsWithPricesByZoneAndType,
  updateProductPrice,
  deleteProductPrice,
  getProductsDataByTypePrice
}
