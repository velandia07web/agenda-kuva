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

    const products = [
      {
        id: uuidv4(),
        name: 'MIRROR BLACK O HASHTAG PRINTING',
        imagen: `${url}email/img/mirrorBlack.png`,
        description: 'MIRROR BLACK O HASHTAG PRINTING',
        idZone: zone.bogota,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      },
      {
        id: uuidv4(),
        name: 'MIRROR LUX  O VOGUE BOOTH',
        imagen: `${url}email/img/mirrorLux.png`,
        description: 'MIRROR LUX  O VOGUE BOOTH',
        idZone: zone.bogota,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      },
      {
        id: uuidv4(),
        name: 'PLATAFORMA 360',
        imagen: `${url}email/img/360.png`,
        description: 'PLATAFORMA 360',
        idZone: zone.bogota,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      },
      {
        id: uuidv4(),
        name: 'GLAMBOT O VIDEO CAPSULA',
        imagen: `${url}email/img/glambot.png`,
        description: 'GLAMBOT O VIDEO CAPSULA',
        idZone: zone.bogota,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      },
      {
        id: uuidv4(),
        name: 'KUVA RING O SOFT',
        imagen: `${url}email/img/kuva.png`,
        description: 'KUVA RING O SOFT',
        idZone: zone.bogota,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      },
      {
        id: uuidv4(),
        name: 'WALLY',
        imagen: `${url}email/img/wally.png`,
        description: 'WALLY',
        idZone: zone.bogota,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      },
      {
        id: uuidv4(),
        name: 'EXTREME O KUVA GO',
        imagen: `${url}email/img/extreme.png`,
        description: 'EXTREME O KUVA GO',
        idZone: zone.bogota,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      },
      {
        id: uuidv4(),
        name: 'MIRROR BLACK O HASHTAG PRINTING',
        imagen: `${url}email/img/mirrorBlack.png`,
        description: 'MIRROR BLACK O HASHTAG PRINTING',
        idZone: zone.medellin,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      },
      {
        id: uuidv4(),
        name: 'PLATAFORMA 360',
        imagen: `${url}email/img/360.png`,
        description: 'PLATAFORMA 360',
        idZone: zone.medellin,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      },
      {
        id: uuidv4(),
        name: 'KUVA RING O SOFT',
        imagen: `${url}email/img/kuva.png`,
        description: 'KUVA RING O SOFT',
        idZone: zone.medellin,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      },
      {
        id: uuidv4(),
        name: 'WALLY',
        imagen: `${url}email/img/wally.png`,
        description: 'WALLY',
        idZone: zone.medellin,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      },
      {
        id: uuidv4(),
        name: 'EXTREME O KUVA GO',
        imagen: `${url}email/img/extreme.png`,
        description: 'EXTREME O KUVA GO',
        idZone: zone.medellin,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      },
      {
        id: uuidv4(),
        name: 'MIRROR BLACK O HASHTAG PRINTING',
        imagen: `${url}email/img/mirrorBlack.png`,
        description: 'MIRROR BLACK O HASHTAG PRINTING',
        idZone: zone.cali,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      },
      {
        id: uuidv4(),
        name: 'PLATAFORMA 360',
        imagen: `${url}email/img/mirrorLux.png`,
        description: 'PLATAFORMA 360',
        idZone: zone.cali,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      },
      {
        id: uuidv4(),
        name: 'GLAMBOT O VIDEO CAPSULA',
        imagen: `${url}email/img/glambot.png`,
        description: 'GLAMBOT O VIDEO CAPSULA',
        idZone: zone.cali,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      },
      {
        id: uuidv4(),
        name: 'KUVA RING O SOFT',
        imagen: `${url}email/img/glambot.png`,
        description: 'KUVA RING O SOFT',
        idZone: zone.cali,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      },
      {
        id: uuidv4(),
        name: 'EXTREME O KUVA GO',
        imagen: `${url}email/img/extreme.png`,
        description: 'EXTREME O KUVA GO',
        idZone: zone.cali,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      },
      {
        id: uuidv4(),
        name: 'MIRROR BLACK O HASHTAG PRINTING',
        imagen: `${url}email/img/mirrorBlack.png`,
        description: 'MIRROR BLACK O HASHTAG PRINTING',
        idZone: zone.barranquilla,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      },
      {
        id: uuidv4(),
        name: 'PLATAFORMA 360',
        imagen: `${url}email/img/360.png`,
        description: 'PLATAFORMA 360',
        idZone: zone.barranquilla,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      },
      {
        id: uuidv4(),
        name: 'KUVA RING O SOFT',
        imagen: `${url}email/img/kuva.png`,
        description: 'KUVA RING O SOFT',
        idZone: zone.barranquilla,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      },
      {
        id: uuidv4(),
        name: 'EXTREME O KUVA GO',
        imagen: `${url}email/img/extreme.png`,
        description: 'EXTREME O KUVA GO',
        idZone: zone.barranquilla,
        idCompany:1,
        createdAt: new Date(),
        updatedAt: new Date(),
        prices: [
          { hour: '1 HORA', price: 100, priceDeadHour: 80, idZone: zone.bogota },
          { hour: '1 HORA Y MEDIA', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '2 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '3 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '4 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '5 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '6 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '7 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota },
          { hour: '8 HORAS', price: 80, priceDeadHour: 60, idZone: zone.bogota }
        ]
      }
    ]
    await queryInterface.bulkInsert('Products', products.map(product => ({
      id: product.id,
      name: product.name,
      imagen: product.imagen,
      description: product.description,
      count: product.count,
      idZone: product.idZone,
      idCompany: product.idCompany,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    })))

    const productPrices = []
    products.forEach(product => {
      product.prices.forEach(price => {
        productPrices.push({
          id: uuidv4(),
          product_id: product.id,
          hour: price.hour,
          price: price.price,
          priceDeadHour: price.priceDeadHour,
          idZone: price.idZone,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      })
    })

    await queryInterface.bulkInsert('ProductPrices', productPrices)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductPrices', null, {})
    await queryInterface.bulkDelete('Products', null, {})
  }
}
