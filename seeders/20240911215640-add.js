'use strict'
const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const typePrices = await queryInterface.sequelize.query(
      'SELECT id, name FROM `TypePrices`;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const typePrice = {}
    typePrices.forEach(price => {
      if (price.name === 'Precio Publico') typePrice.publico = price.id
      if (price.name === 'Precio con Descuento') typePrice.descuento = price.id
    })
    console.log(typePrices)

    return queryInterface.bulkInsert('Adds', [
      {
        id: uuidv4(),
        name: 'ALBUM VINILO',
        price: 250000,
        idTypePrice: typePrice.publico,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ALBUM MADERA',
        price: 250000,
        idTypePrice: typePrice.publico,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: '1ERA HOJA IMPRESA ALBUM',
        price: 20000,
        idTypePrice: typePrice.publico,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ALBUM PREMIUM (TODAS LAS HOJAS IMPRESAS)',
        price: 330000,
        idTypePrice: typePrice.publico,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PORTAFOTOS TIRA ($/und) min 50 und',
        price: 2500,
        idTypePrice: typePrice.publico,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PORTAFOTOS POSTAL ($/und) min 50 und',
        price: 2700,
        idTypePrice: typePrice.publico,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PAQUETE DE 10 PROPS',
        price: 300000,
        idTypePrice: typePrice.publico,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CHROMA KEY',
        price: 100000,
        idTypePrice: typePrice.publico,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'COPIAS ILIMITADAS (VR X HR)',
        price: 50000,
        idTypePrice: typePrice.publico,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CAMBIO A POSTAL X 1 (INC X HR)',
        price: 60000,
        idTypePrice: typePrice.publico,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ALBUM VINILO',
        price: 200000,
        idTypePrice: typePrice.descuento,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ALBUM MADERA',
        price: 200000,
        idTypePrice: typePrice.descuento,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: '1ERA HOJA IMPRESA',
        price: 16000,
        idTypePrice: typePrice.descuento,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ALBUM PREMIUM (TODAS LAS HOJAS IMPRESAS)',
        price: 264000,
        idTypePrice: typePrice.descuento,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PORTAFOTOS TIRA',
        price: 2250,
        idTypePrice: typePrice.descuento,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PORTAFOTOS POSTAL',
        price: 2430,
        idTypePrice: typePrice.descuento,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PAQUETE DE 10 PROPS',
        price: 270000,
        idTypePrice: typePrice.descuento,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'COPIAS ILIMITADAS (1 A 4 Horas)',
        price: 45000,
        idTypePrice: typePrice.descuento,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CAMBIO A POSTAL X 1 (INC X HR)',
        price: 54000,
        idTypePrice: typePrice.descuento,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Adds', null, {})
  }
}
