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
        name: 'CARTAGENA',
        idZone: zoneMap.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'BARRANQUILLA',
        idZone: zoneMap.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MONTERIA',
        idZone: zoneMap.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SANTA MARTA',
        idZone: zoneMap.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SAN ANDRES ISLAS',
        idZone: zoneMap.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SINCELEJO',
        idZone: zoneMap.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SOLEDAD',
        idZone: zoneMap.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PUERTO COLOMBIA',
        idZone: zoneMap.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'VALLEDUPAR',
        idZone: zoneMap.barranquilla,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'BOGOTA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'TOCANCIPA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'NEIVA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SOPO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'TENJO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'EL ROSAL',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LA CALERA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LA VEGA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SUBACHOQUE',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IBAGUE',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MOSQUERA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PAIPA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SACHICA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'VILLAVICENCIO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'TABIO',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GUATAVITA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'VILLA DE LEYVA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'COTA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GIRARDOT',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CAJICA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MADRID',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DUITAMA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CHIA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'UBATE',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MELGAR',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'FUSAGASUGA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GUASCA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CHIQUINQUIRA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'FUNZA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'VILLETA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'TUNJA',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'RICAURTE',
        idZone: zoneMap.bogota,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'BUCARAMANGA',
        idZone: zoneMap.bucaramanga,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CUCUTA',
        idZone: zoneMap.bucaramanga,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'FLORIDABLANCA',
        idZone: zoneMap.bucaramanga,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'OCAÑA',
        idZone: zoneMap.bucaramanga,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GIRON',
        idZone: zoneMap.bucaramanga,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CALI',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'YUMBO',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ROZO',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'POPAYAN',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ANDALUCIA',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'JAMUNDI',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CANDELARIA',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PALMIRA',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PASTO',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PRADERA',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GUACARI',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'BUENAVENTURA',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CALOTO',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PUERTO TEJADA',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'EL CERRITO',
        idZone: zoneMap.cali,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'TULUA',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ARMENIA',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MANIZALES',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PEREIRA',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CARTAGO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SANTA ROSA DE CABAL',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ALCALA',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PUEBLO TAPAO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'QUIMBAYA',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CHINCHINA',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'BUGA',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LA UNION',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ZARZAL',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CALARCA',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MONTENEGRO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DOSQUEBRADAS',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'QUINCHIA',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'QUIBDO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LA TEBAIDA',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LA VIRGINIA',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'BUGALAGRANDE',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LA PAILA',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ZARAGOZA',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'TORO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'PUEBLO TAPADO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LA VICTORIA',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MARSELLA',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SUPIA',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ANSERMA',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SALENTO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SANTUARIO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'IRRA',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CIRCASIA',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ROLDANILLO',
        idZone: zoneMap.eje,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MEDELLIN',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'JERICO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GIRARDOTA',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ENVIGADO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'RIONEGRO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'CALDAS',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'EL SANTUARIO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'COPACABANA',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'ITAGUI',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'DABEIBA',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SAN JERONIMO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SANTAFE DE ANTIOQUIA',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'BELLO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'SOPETRAN',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MARINILLA',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'LLANOGRANDE',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'GUARNE',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'URRAO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'MACEO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'EL PEÑOL',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'BARBOSA',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'RETIRO',
        idZone: zoneMap.medellin,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cities', null, {})
  }
}
