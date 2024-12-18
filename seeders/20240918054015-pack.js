'use strict'
const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const products = await queryInterface.sequelize.query(
      'SELECT id, name FROM `Products`;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

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
      if (z.name === 'EJE CAFETERO') zone.ejeCafetero = z.id
    })

    const product = {}
    products.forEach(p => {
      if (p.name === 'WALLY') product.wally = p.id
      if (p.name === 'KUVA RING O SOFT') product.kuvaRing = p.id
      if (p.name === 'EXTREME O KUVA GO') product.extreme = p.id
      if (p.name === 'MIRROR BLACK O HASHTAG PRINTING') product.mirrorBlack = p.id
      if (p.name === 'MIRROR LUX  O VOGUE BOOTH') product.mirrorLinux = p.id
    })

    return queryInterface.bulkInsert('Packs', [
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.wally,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.kuvaRing,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.extreme,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.mirrorBlack,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.mirrorLinux,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.wally,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.kuvaRing,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.extreme,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.mirrorBlack,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.mirrorLinux,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.wally,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.kuvaRing,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.extreme,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.mirrorBlack,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.mirrorLinux,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.wally,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '1 HORA PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.kuvaRing,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '1 HORA PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.extreme,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '1 HORA PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.mirrorBlack,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '1 HORA PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.mirrorLinux,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.wally,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.kuvaRing,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.extreme,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.mirrorBlack,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.mirrorLinux,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.wally,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.kuvaRing,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.extreme,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.mirrorBlack,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.mirrorLinux,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.wally,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.kuvaRing,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.extreme,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.mirrorBlack,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.mirrorLinux,
        idZone: zone.bogota,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.wally,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.kuvaRing,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.extreme,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.mirrorBlack,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.mirrorLinux,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.wally,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.kuvaRing,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.extreme,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.mirrorBlack,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.mirrorLinux,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.wally,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.kuvaRing,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.extreme,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.mirrorBlack,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.mirrorLinux,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.wally,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '1 HORA PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.kuvaRing,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '1 HORA PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.extreme,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '1 HORA PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.mirrorBlack,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '1 HORA PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.mirrorLinux,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.wally,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.kuvaRing,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.extreme,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.mirrorBlack,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.mirrorLinux,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.wally,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.kuvaRing,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.extreme,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.mirrorBlack,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.mirrorLinux,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.wally,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.kuvaRing,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.extreme,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.mirrorBlack,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.mirrorLinux,
        idZone: zone.medellin,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.wally,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.kuvaRing,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.extreme,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.mirrorBlack,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.mirrorLinux,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.wally,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.kuvaRing,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.extreme,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.mirrorBlack,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.mirrorLinux,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.wally,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.kuvaRing,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.extreme,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.mirrorBlack,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.mirrorLinux,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.wally,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '1 HORA PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.kuvaRing,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '1 HORA PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.extreme,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '1 HORA PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.mirrorBlack,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '1 HORA PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.mirrorLinux,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.wally,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.kuvaRing,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.extreme,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.mirrorBlack,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.mirrorLinux,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.wally,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.kuvaRing,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.extreme,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.mirrorBlack,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.mirrorLinux,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.wally,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.kuvaRing,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.extreme,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.mirrorBlack,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.mirrorLinux,
        idZone: zone.cali,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.kuvaRing,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.extreme,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.mirrorBlack,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.kuvaRing,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.extreme,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.mirrorBlack,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.kuvaRing,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.extreme,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.mirrorBlack,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '1 HORA PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.kuvaRing,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '1 HORA PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.extreme,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '1 HORA PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.mirrorBlack,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.kuvaRing,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.extreme,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.mirrorBlack,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.kuvaRing,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.extreme,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.mirrorBlack,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.kuvaRing,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.extreme,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.mirrorBlack,
        idZone: zone.barranquilla,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.wally,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.kuvaRing,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.extreme,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.mirrorBlack,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SILVER',
        description: '2 HORAS + ALBUM MENSAJES+ 50 PORTAFOTOS',
        idProduct: product.mirrorLinux,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.wally,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.kuvaRing,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.extreme,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.mirrorBlack,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GOLD',
        description: '3 HORAS + ALBUM MENSAJES + 70 PORTAFOTOS',
        idProduct: product.mirrorLinux,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.wally,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.kuvaRing,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.extreme,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.mirrorBlack,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DIAMANTE',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.mirrorLinux,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '6 HORAS + ALBUM MENSAJES + 100 PORTAFOTOS + TELEFONO',
        idProduct: product.wally,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '1 HORA PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.kuvaRing,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '1 HORA PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.extreme,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '1 HORA PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.mirrorBlack,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LIGHT',
        description: '1 HORA PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.mirrorLinux,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.wally,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.kuvaRing,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.extreme,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.mirrorBlack,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IDEAL',
        description: '2 HORAS PHOTOBOOTH + 2 HORAS 360',
        idProduct: product.mirrorLinux,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.wally,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.kuvaRing,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.extreme,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.mirrorBlack,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PLUS',
        description: '2 HORAS PHOTOBOOTH/360 + 2 HORAS DE GUEST PHONE (TEL DE MENSAJES)',
        idProduct: product.mirrorLinux,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.wally,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.kuvaRing,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.extreme,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.mirrorBlack,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ESTELAR',
        description: '4 HORAS PHOTOBOOTH + 2 HORAS 360  + ALBUM MENSAJES + 100 PORTAFOTOS',
        idProduct: product.mirrorLinux,
        idZone: zone.ejeCafetero,state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Packs', null, {})
  }
}
