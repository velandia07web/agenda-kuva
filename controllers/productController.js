const { matchedData } = require('express-validator')
const productService = require('../services/productService')
const jwt = require('jsonwebtoken');

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
    const validData = matchedData(req)
    const createProduct = await productService.createProduct(validData)
    return res.status(201).json({ status: 201, message: 'Product creado satisfactoriamente', data: createProduct })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al crear el product.', error: error.message })
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


module.exports = {
  getAllProducts,
  getOneProducts,
  createProducts,
  updateProduct,
  deleteProduct,
  getPriceProducts,
  getPriceProductsByZone,
}
