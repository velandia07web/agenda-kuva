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

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Usa tu clave secreta definida en las variables de entorno
    } catch (error) {
      return res.status(403).json({ status: 403, message: 'Token no válido.' });
    }

    const idCompany = decoded.idCompany;

    const allProducts = await productService.getAllProducts(idCompany)

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

module.exports = {
  getAllProducts,
  getOneProducts,
  createProducts,
  updateProduct,
  deleteProduct
}
