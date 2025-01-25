'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insérer les données correctement
    await queryInterface.bulkInsert('days_of_weeks', [
      {
        day: 'Lundi',
        closed: false,
      },
      {
        day: 'Mardi',
        closed: false,
      },
      {
        day: 'Mercredi',
        closed: false,
      },
      {
        day: 'Jeudi',
        closed: false,
      },
      {
        day: 'Vendredi',
        closed: false,
      },
      {
        day: 'Samedi',
        closed: true,
      },
      {
        day: 'Dimanche',
        closed: true,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Supprimer les données insérées
    await queryInterface.bulkDelete('days_of_weeks', null, {});
  },
};
