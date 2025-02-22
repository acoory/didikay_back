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
          name: 'Coiffure',
          prestation_id: 1,
        }], {});

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
