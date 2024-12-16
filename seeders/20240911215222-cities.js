'use strict'
const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const zones = await queryInterface.sequelize.query(
      'SELECT id, name FROM `Zones`;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    const zoneMap = {}
    zones.forEach(zone => {
      if (zone.name === 'BARRANQUILLA') zoneMap.barranquilla = zone.id
      if (zone.name === 'MEDELLIN') zoneMap.medellin = zone.id
      if (zone.name === 'CALI') zoneMap.cali = zone.id
      if (zone.name === 'EJE CAFETERO') zoneMap.eje = zone.id
      if (zone.name === 'BUCARAMANGA') zoneMap.bucaramanga = zone.id
      if (zone.name === 'BOGOTA') zoneMap.bogota = zone.id
    })
    // console.log(zoneMap)

    return await queryInterface.bulkInsert('Cities', [
      {
        id: uuidv4(),
        name: 'CARTAGENA',        state: 'ACTIVO',
        idZone: zoneMap.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'BARRANQUILLA',        state: 'ACTIVO',
        idZone: zoneMap.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MONTERIA',        state: 'ACTIVO',
        idZone: zoneMap.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SANTA MARTA',        state: 'ACTIVO',
        idZone: zoneMap.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SAN ANDRES ISLAS',        state: 'ACTIVO',
        idZone: zoneMap.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SINCELEJO',        state: 'ACTIVO',
        idZone: zoneMap.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SOLEDAD',        state: 'ACTIVO',
        idZone: zoneMap.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PUERTO COLOMBIA',        state: 'ACTIVO',
        idZone: zoneMap.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'VALLEDUPAR',        state: 'ACTIVO',
        idZone: zoneMap.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'BOGOTA',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'TOCANCIPA',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'NEIVA',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SOPO',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'TENJO',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'EL ROSAL',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LA CALERA',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LA VEGA',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SUBACHOQUE',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IBAGUE',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MOSQUERA',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PAIPA',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SACHICA',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'VILLAVICENCIO',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'TABIO',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GUATAVITA',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'VILLA DE LEYVA',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'COTA',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GIRARDOT',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CAJICA',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MADRID',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),        state: 'ACTIVO',
        name: 'DUITAMA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CHIA',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'UBATE',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MELGAR',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'FUSAGASUGA',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GUASCA',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CHIQUINQUIRA',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'FUNZA',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'VILLETA',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'TUNJA',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'RICAURTE',        state: 'ACTIVO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'BUCARAMANGA',        state: 'ACTIVO',
        idZone: zoneMap.bucaramanga,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CUCUTA',        state: 'ACTIVO',
        idZone: zoneMap.bucaramanga,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'FLORIDABLANCA',        state: 'ACTIVO',
        idZone: zoneMap.bucaramanga,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'OCAÑA',        state: 'ACTIVO',
        idZone: zoneMap.bucaramanga,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GIRON',        state: 'ACTIVO',
        idZone: zoneMap.bucaramanga,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CALI',        state: 'ACTIVO',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'YUMBO',        state: 'ACTIVO',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ROZO',        state: 'ACTIVO',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'POPAYAN',
        idZone: zoneMap.cali,        state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ANDALUCIA',        state: 'ACTIVO',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'JAMUNDI',        state: 'ACTIVO',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CANDELARIA',        state: 'ACTIVO',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PALMIRA',        state: 'ACTIVO',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PASTO',        state: 'ACTIVO',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PRADERA',        state: 'ACTIVO',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GUACARI',
        idZone: zoneMap.cali,        state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'BUENAVENTURA',        state: 'ACTIVO',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CALOTO',        state: 'ACTIVO',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PUERTO TEJADA',        state: 'ACTIVO',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'EL CERRITO',        state: 'ACTIVO',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'TULUA',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ARMENIA',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MANIZALES',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PEREIRA',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CARTAGO',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SANTA ROSA DE CABAL',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ALCALA',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PUEBLO TAPAO',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'QUIMBAYA',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CHINCHINA',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'BUGA',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LA UNION',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ZARZAL',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CALARCA',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MONTENEGRO',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DOSQUEBRADAS',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'QUINCHIA',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'QUIBDO',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LA TEBAIDA',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LA VIRGINIA',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'BUGALAGRANDE',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LA PAILA',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ZARAGOZA',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'TORO',
        idZone: zoneMap.eje,        state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PUEBLO TAPADO',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LA VICTORIA',
        idZone: zoneMap.eje,        state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MARSELLA',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SUPIA',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ANSERMA',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SALENTO',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SANTUARIO',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IRRA',
        idZone: zoneMap.eje,        state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CIRCASIA',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ROLDANILLO',        state: 'ACTIVO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MEDELLIN',        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'JERICO',        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GIRARDOTA',        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ENVIGADO',        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'RIONEGRO',        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CALDAS',        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'EL SANTUARIO',        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'COPACABANA',        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ITAGUI',        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DABEIBA',        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SAN JERONIMO',        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SANTAFE DE ANTIOQUIA',        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'BELLO',        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SOPETRAN',        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MARINILLA',        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LLANOGRANDE',        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GUARNE',        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'URRAO',        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MACEO',        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'EL PEÑOL',        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'BARBOSA',
        state: 'ACTIVO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'RETIRO',
        idZone: zoneMap.medellin,
        state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cities', null, {})
  }
}
