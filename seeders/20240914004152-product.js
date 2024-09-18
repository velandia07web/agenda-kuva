'use strict'
const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const zones = await queryInterface.sequelize.query(
      'SELECT id, name FROM `Zones`;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    const zone = {}
    zones.forEach(z => {
      if (z.name === 'BOGOTA') zone.bogota = z.id
      if (z.name === 'MEDELLIN') zone.medellin = z.id
      if (z.name === 'CALI') zone.cali = z.id
      if (z.name === 'BARRANQUILLA') zone.barranquilla = z.id
    })

    const url = process.env.DEV_URL

    return queryInterface.bulkInsert('Products', [
      {
        id: uuidv4(),
        name: 'MIRROR BLACK O HASHTAG PRINTING',
        imagen: `${url}email/img/mirrorBlack.png`,
        description: 'MIRROR BLACK O HASHTAG PRINTING',
        count: 1,
        idZone: zone.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MIRROR LUX  O VOGUE BOOTH',
        imagen: `${url}email/img/mirrorLux.png`,
        description: 'MIRROR LUX  O VOGUE BOOTH',
        count: 1,
        idZone: zone.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLATAFORMA 360',
        imagen: `${url}email/img/360.png`,
        description: 'PLATAFORMA 360',
        count: 2,
        idZone: zone.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GLAMBOT O VIDEO CAPSULA',
        imagen: `${url}email/img/glambot.png`,
        description: 'GLAMBOT O VIDEO CAPSULA',
        count: 1,
        idZone: zone.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'KUVA RING O SOFT',
        imagen: `${url}email/img/kuva.png`,
        description: 'KUVA RING O SOFT',
        count: 3,
        idZone: zone.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'WALLY',
        imagen: `${url}email/img/wally.png`,
        description: 'WALLY',
        count: 2,
        idZone: zone.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'EXTREME O KUVA GO',
        imagen: `${url}email/img/extreme.png`,
        description: 'EXTREME O KUVA GO',
        count: 1,
        idZone: zone.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MIRROR BLACK O HASHTAG PRINTING',
        imagen: `${url}email/img/mirrorBlack.png`,
        description: 'MIRROR BLACK O HASHTAG PRINTING',
        count: 1,
        idZone: zone.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLATAFORMA 360',
        imagen: `${url}email/img/360.png`,
        description: 'PLATAFORMA 360',
        count: 2,
        idZone: zone.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'KUVA RING O SOFT',
        imagen: `${url}email/img/kuva.png`,
        description: 'KUVA RING O SOFT',
        count: 1,
        idZone: zone.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'WALLY',
        imagen: `${url}email/img/wally.png`,
        description: 'WALLY',
        count: 1,
        idZone: zone.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'EXTREME O KUVA GO',
        imagen: `${url}email/img/extreme.png`,
        description: 'EXTREME O KUVA GO',
        count: 1,
        idZone: zone.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MIRROR BLACK O HASHTAG PRINTING',
        imagen: `${url}email/img/mirrorBlack.png`,
        description: 'MIRROR BLACK O HASHTAG PRINTING',
        count: 1,
        idZone: zone.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLATAFORMA 360',
        imagen: `${url}email/img/mirrorLux.png`,
        description: 'PLATAFORMA 360',
        count: 2,
        idZone: zone.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GLAMBOT O VIDEO CAPSULA',
        imagen: `${url}email/img/glambot.png`,
        description: 'GLAMBOT O VIDEO CAPSULA',
        count: 1,
        idZone: zone.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'KUVA RING O SOFT',
        imagen: `${url}email/img/glambot.png`,
        description: 'KUVA RING O SOFT',
        count: 2,
        idZone: zone.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'EXTREME O KUVA GO',
        imagen: `${url}email/img/extreme.png`,
        description: 'EXTREME O KUVA GO',
        count: 1,
        idZone: zone.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MIRROR BLACK O HASHTAG PRINTING',
        imagen: `${url}email/img/mirrorBlack.png`,
        description: 'MIRROR BLACK O HASHTAG PRINTING',
        count: 1,
        idZone: zone.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLATAFORMA 360',
        imagen: `${url}email/img/360.png`,
        description: 'PLATAFORMA 360',
        count: 2,
        idZone: zone.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'KUVA RING O SOFT',
        imagen: `${url}email/img/kuva.png`,
        description: 'KUVA RING O SOFT',
        count: 2,
        idZone: zone.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'EXTREME O KUVA GO',
        imagen: `${url}email/img/extreme.png`,
        description: 'EXTREME O KUVA GO',
        count: 1,
        idZone: zone.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {})
  }
}
