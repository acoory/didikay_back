'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
      await queryInterface.bulkInsert('subprestations', [{
        id: 1,
       name: 'Racine',
        prestation_id: 1,
     },
          {
              id: 2,
              name: 'Reprise racine',
              prestation_id: 2,
          },
          {
              id: 3,
              name: 'Coiffure',
              prestation_id: 2,
          },
          {
              id: 4,
              name: 'Cheveux Courts',
              prestation_id: 3,
          },
            {
                id: 5,
                name: 'Cheveux Mi-longs',
                prestation_id: 4,
            },
          {
              id: 6,
              name: 'Cheveux Longs',
              prestation_id: 5,
          },
        ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
