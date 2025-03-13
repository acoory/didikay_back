'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
     await queryInterface.bulkInsert('prestations', [
         { id: 1, name: 'Départ de locks' },
         { id: 2, name: 'Locks' },
         { id: 3, name: 'Formule cheveux court' },
         { id: 4, name: 'Formule cheveux mi-long' },
         { id: 5, name: 'Formule cheveux long' }
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
