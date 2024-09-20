'use strict'
const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const packs = await queryInterface.sequelize.query(
      `SELECT pa.id, pa.name AS pack, pr.name AS product, z.name AS zone
       FROM Packs pa
       INNER JOIN Products pr ON pa.idProduct = pr.id
       INNER JOIN Zones z ON pa.idZone = z.id
       ORDER BY zone;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    const packMap = {}
    packs.forEach(p => {
      const key = `${p.pack}_${p.product}_${p.zone}`.replace(/\s+/g, '_').toUpperCase()
      packMap[key] = p.id
    })

    const pricePacksData = []

    pricePacksData.push(
      {
        id: uuidv4(),
        price: 1150000,
        idPack: packMap.GOLD_KUVA_RING_O_SOFT_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1760000,
        idPack: packMap.DIAMANTE_EXTREME_O_KUVA_GO_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1440000,
        idPack: packMap.IDEAL_EXTREME_O_KUVA_GO_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1203000,
        idPack: packMap.PLUS_MIRROR_BLACK_O_HASHTAG_PRINTING_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1355000,
        idPack: packMap.IDEAL_KUVA_RING_O_SOFT_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1763000,
        idPack: packMap.IDEAL_MIRROR_BLACK_O_HASHTAG_PRINTING_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2125500,
        idPack: packMap.DIAMANTE_MIRROR_BLACK_O_HASHTAG_PRINTING_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1303000,
        idPack: packMap.SILVER_MIRROR_BLACK_O_HASHTAG_PRINTING_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 895000,
        idPack: packMap.SILVER_KUVA_RING_O_SOFT_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 980000,
        idPack: packMap.SILVER_EXTREME_O_KUVA_GO_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1185000,
        idPack: packMap.LIGHT_KUVA_RING_O_SOFT_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1270000,
        idPack: packMap.LIGHT_EXTREME_O_KUVA_GO_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1240000,
        idPack: packMap.GOLD_EXTREME_O_KUVA_GO_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1240000,
        idPack: packMap.GOLD_EXTREME_O_KUVA_GO_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2180000,
        idPack: packMap.ESTELAR_EXTREME_O_KUVA_GO_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1675000,
        idPack: packMap.DIAMANTE_KUVA_RING_O_SOFT_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2095000,
        idPack: packMap.ESTELAR_KUVA_RING_O_SOFT_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 880000,
        idPack: packMap.PLUS_EXTREME_O_KUVA_GO_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1609000,
        idPack: packMap.GOLD_MIRROR_BLACK_O_HASHTAG_PRINTING_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2503000,
        idPack: packMap.ESTELAR_MIRROR_BLACK_O_HASHTAG_PRINTING_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 795000,
        idPack: packMap.PLUS_KUVA_RING_O_SOFT_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1550000,
        idPack: packMap.LIGHT_MIRROR_BLACK_O_HASHTAG_PRINTING_BARRANQUILLA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1628000,
        idPack: packMap.PLUS_MIRROR_LUX_O_VOGUE_BOOTH_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1763000,
        idPack: packMap.IDEAL_MIRROR_BLACK_O_HASHTAG_PRINTING_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1492000,
        idPack: packMap.GOLD_EXTREME_O_KUVA_GO_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1609000,
        idPack: packMap.GOLD_MIRROR_BLACK_O_HASHTAG_PRINTING_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1312000,
        idPack: packMap.GOLD_WALLY_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1593000,
        idPack: packMap.IDEAL_KUVA_RING_O_SOFT_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 948000,
        idPack: packMap.PLUS_WALLY_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1728000,
        idPack: packMap.SILVER_MIRROR_LUX_O_VOGUE_BOOTH_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1423000,
        idPack: packMap.LIGHT_KUVA_RING_O_SOFT_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1402000,
        idPack: packMap.GOLD_KUVA_RING_O_SOFT_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1913000,
        idPack: packMap.DIAMANTE_KUVA_RING_O_SOFT_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2059000,
        idPack: packMap.GOLD_MIRROR_LUX_O_VOGUE_BOOTH_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1975000,
        idPack: packMap.LIGHT_MIRROR_LUX_O_VOGUE_BOOTH_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1998000,
        idPack: packMap.DIAMANTE_EXTREME_O_KUVA_GO_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2928000,
        idPack: packMap.ESTELAR_MIRROR_LUX_O_VOGUE_BOOTH_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1118000,
        idPack: packMap.PLUS_EXTREME_O_KUVA_GO_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1828000,
        idPack: packMap.DIAMANTE_WALLY_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1048000,
        idPack: packMap.SILVER_WALLY_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2418000,
        idPack: packMap.ESTELAR_EXTREME_O_KUVA_GO_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2333000,
        idPack: packMap.ESTELAR_KUVA_RING_O_SOFT_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2503000,
        idPack: packMap.ESTELAR_MIRROR_BLACK_O_HASHTAG_PRINTING_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1133000,
        idPack: packMap.SILVER_KUVA_RING_O_SOFT_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1033000,
        idPack: packMap.PLUS_KUVA_RING_O_SOFT_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1033000,
        idPack: packMap.DIAMANTE_MIRROR_BLACK_O_HASHTAG_PRINTING_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1508000,
        idPack: packMap.LIGHT_EXTREME_O_KUVA_GO_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2188000,
        idPack: packMap.IDEAL_MIRROR_LUX_O_VOGUE_BOOTH_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1338000,
        idPack: packMap.LIGHT_WALLY_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1508000,
        idPack: packMap.IDEAL_WALLY_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2928000,
        idPack: packMap.ESTELAR_MIRROR_LUX_O_VOGUE_BOOTH_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1338000,
        idPack: packMap.LIGHT_WALLY_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1402000,
        idPack: packMap.GOLD_KUVA_RING_O_SOFT_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1118000,
        idPack: packMap.PLUS_EXTREME_O_KUVA_GO_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1508000,
        idPack: packMap.IDEAL_WALLY_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2503000,
        idPack: packMap.ESTELAR_MIRROR_BLACK_O_HASHTAG_PRINTING_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1593000,
        idPack: packMap.IDEAL_KUVA_RING_O_SOFT_BOGOTA,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1508000,
        idPack: packMap.IDEAL_KUVA_RING_O_SOFT_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2295000,
        idPack: packMap.DIAMANTE_MIRROR_BLACK_O_HASHTAG_PRINTING_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1720000,
        idPack: packMap.LIGHT_MIRROR_BLACK_O_HASHTAG_PRINTING_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 300001,
        idPack: packMap.SILVER_MIRROR_LUX_O_VOGUE_BOOTH_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2440000,
        idPack: packMap.DIAMANTE_MIRROR_LUX_O_VOGUE_BOOTH_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1303000,
        idPack: packMap.SILVER_EXTREME_O_KUVA_GO_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1582000,
        idPack: packMap.GOLD_WALLY_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1828000,
        idPack: packMap.DIAMANTE_KUVA_RING_O_SOFT_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1593000,
        idPack: packMap.LIGHT_WALLY_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1338000,
        idPack: packMap.LIGHT_KUVA_RING_O_SOFT_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2503000,
        idPack: packMap.ESTELAR_WALLY_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1303000,
        idPack: packMap.SILVER_WALLY_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1373000,
        idPack: packMap.PLUS_MIRROR_BLACK_O_HASHTAG_PRINTING_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1933000,
        idPack: packMap.IDEAL_MIRROR_BLACK_O_HASHTAG_PRINTING_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1848000,
        idPack: packMap.LIGHT_MIRROR_LUX_O_VOGUE_BOOTH_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1048000,
        idPack: packMap.SILVER_KUVA_RING_O_SOFT_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2083000,
        idPack: packMap.DIAMANTE_WALLY_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 200001,
        idPack: packMap.PLUS_MIRROR_LUX_O_VOGUE_BOOTH_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 200001,
        idPack: packMap.LIGHT_EXTREME_O_KUVA_GO_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2673000,
        idPack: packMap.ESTELAR_MIRROR_BLACK_O_HASHTAG_PRINTING_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1763000,
        idPack: packMap.IDEAL_EXTREME_O_KUVA_GO_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2503000,
        idPack: packMap.ESTELAR_EXTREME_O_KUVA_GO_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2083000,
        idPack: packMap.DIAMANTE_EXTREME_O_KUVA_GO_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 948000,
        idPack: packMap.PLUS_KUVA_RING_O_SOFT_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1582000,
        idPack: packMap.GOLD_EXTREME_O_KUVA_GO_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1763000,
        idPack: packMap.IDEAL_WALLY_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1508000,
        idPack: packMap.IDEAL_KUVA_RING_O_SOFT_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1473000,
        idPack: packMap.SILVER_MIRROR_BLACK_O_HASHTAG_PRINTING_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1942000,
        idPack: packMap.GOLD_MIRROR_LUX_O_VOGUE_BOOTH_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1203000,
        idPack: packMap.PLUS_WALLY_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2248000,
        idPack: packMap.ESTELAR_KUVA_RING_O_SOFT_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 760000,
        idPack: packMap.IDEAL_MIRROR_LUX_O_VOGUE_BOOTH_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1312000,
        idPack: packMap.GOLD_KUVA_RING_O_SOFT_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1789000,
        idPack: packMap.GOLD_MIRROR_BLACK_O_HASHTAG_PRINTING_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 2817500,
        idPack: packMap.ESTELAR_MIRROR_LUX_O_VOGUE_BOOTH_CALI,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1118000,
        idPack: packMap.PLUS_EXTREME_O_KUVA_GO_EJE_CAFETERO,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1118000,
        idPack: packMap.ESTELAR_MIRROR_LUX_O_VOGUE_BOOTH_EJE_CAFETERO,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1913000,
        idPack: packMap.DIAMANTE_KUVA_RING_O_SOFT_EJE_CAFETERO,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        price: 1338000,
        idPack: packMap.LIGHT_WALLY_CAFETERO,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    )

    // Insertar los datos en la tabla PricePacks
    return queryInterface.bulkInsert('PricePacks', pricePacksData)
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('PricePacks', null, {})
  }
}
