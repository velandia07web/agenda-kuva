const { matchedData } = require('express-validator')
const productService = require('../services/productService')
const jwt = require('jsonwebtoken');
const path = require('path');

const getAllProducts = async function (req, res) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ status: 401, message: 'Token de autenticación no proporcionado.' });
    }

    const allProducts = await productService.getAllProducts()

    return res.status(200).json({ status: 200, message: 'Products:', data: allProducts })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener los products.', error: error.message })
  }
}

const getOneProducts = async function (req, res) {
  try {
    const product = await productService.getOneProduct(req.params.id)
    if (product) {
      return res.status(200).json({ status: 200, message: 'Product por ID:', data: product })
    } else {
      return res.status(404).json({ status: 404, message: 'Product no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener el product por ID.', error: error.message })
  }
}

const createProducts = async function (req, res) {
  try {
    const productData = {
      ...req.body,
      imagen: req.file ? `/CabinaImagenes/${req.file.filename}` : null
    };

    if (typeof productData.prices === 'string') {
      try {
        productData.prices = JSON.parse(productData.prices);
      } catch (e) {
        console.error('Error parsing prices:', e);
        productData.prices = [];
      }
    }

    const createProduct = await productService.createProduct(productData);
    return res.status(201).json({ 
      status: 201, 
      message: 'Product creado satisfactoriamente', 
      data: createProduct 
    });
  } catch (error) {
    if (req.file) {
      const fs = require('fs').promises;
      const filePath = path.join('utils/CabinaImagenes', req.file.filename);
      try {
        await fs.unlink(filePath);
      } catch (deleteError) {
        console.error('Error eliminando archivo:', deleteError);
      }
    }

    return res.status(500).json({ 
      status: 500, 
      message: 'Error al crear el product.', 
      error: error.message 
    });
  }
}

const updateProduct = async function (req, res) {
  try {
    const idProduct = req.params.id

    if (!idProduct) {
      return res.status(404).json({ status: 404, message: 'Product no encontrado.' })
    }

    const validData = matchedData(req)

    const updatedProduct = await productService.updateProduct(idProduct, validData)
    return res.status(200).json({ status: 200, message: 'Product actualizado satisfactoriamente', data: updatedProduct })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al actualizar el product.', error: error.message })
  }
}

const deleteProduct = async function (req, res) {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id)
    if (deletedProduct) {
      return res.status(200).json({ status: 200, message: 'Product eliminado satisfactoriamente', data: deletedProduct })
    } else {
      return res.status(404).json({ status: 404, message: 'Product no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al eliminar el product.', error: error.message })
  }
}

const getPriceProducts = async function (req, res) {
  try {

    const productPrices = await productService.getPriceProducts();

    return res.status(200).json({ status: 200, message: 'Precios de productos:', data: productPrices });
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener los precios de productos.', error: error.message });
  }
};

const getPriceProductsByZone = async function (req, res) {
  try {
    const { idZone, typePriceId } = req.query;

    if (!idZone) {
      return res.status(400).json({ status: 400, message: 'El parámetro idZone es obligatorio.' });
    }

    const productPrices = await productService.getProductsWithPricesByZoneAndType(idZone, typePriceId);

    return res.status(200).json({
      status: 200,
      message: 'Precios de productos por zona:',
      data: productPrices,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Error al obtener los precios de productos por zona.',
      error: error.message,
    });
  }
};

const updateProductPrice = async function (req, res) {
  try {
    const id = req.params.id;
    const validData = {
      hour: req.body.hour,
      price: req.body.price,
      priceDeadHour: req.body.priceDeadHour,
      idZone: req.body.idZone,
      type_price_id: req.body.type_price_id,
    };
    const updatedProductPrice = await productService.updateProductPrice(id, validData);
    return res.status(200).json({ status: 200, message: 'ProductPrice actualizado satisfactoriamente.', data: updatedProductPrice });
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al actualizar el ProductPrice.', error: error.message });
  }
};

const deleteProductPrice = async function (req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ status: 400, message: 'ID de ProductPrice es obligatorio.' });
    }

    const deletedCount = await productService.deleteProductPrice(id);

    if (deletedCount === 0) {
      return res.status(404).json({ status: 404, message: 'ProductPrice no encontrado.' });
    }

    return res.status(200).json({ status: 200, message: 'ProductPrice activado/desactivado satisfactoriamente.' });
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al activar/desactivar el ProductPrice.', error: error.message });
  }
};

const getProductsDataByTypePrice = async function (req, res) {
  try {
    const { idTypePrice, idZone, idCity } = req.query;

    if (!idTypePrice) {
      return res.status(400).json({
        status: 400,
        message: 'El parámetro idTypePrice es obligatorio.',
      });
    }

    const data = await productService.getProductsDataByTypePrice(idTypePrice, idZone, idCity);

    return res.status(200).json({
      status: 200,
      message: 'Datos obtenidos correctamente.',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Error al obtener los datos.',
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getOneProducts,
  createProducts,
  updateProduct,
  deleteProduct,
  getPriceProducts,
  getPriceProductsByZone,
  updateProductPrice,
  deleteProductPrice,
  getProductsDataByTypePrice
}
