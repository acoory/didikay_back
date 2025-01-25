'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
      await queryInterface.bulkInsert('services', [{
        name: 'Twist',
        description: 'Twist',
        price: 40,
        duration_minutes: 30,
        subprestation_id: 1,
      },
        {
            name: 'Crochet piqué',
            description: 'Crochet piqué',
            price: 80,
            duration_minutes: 20,
            subprestation_id: 1,
        },
        {
          name: 'Crochet',
          description: 'Crochet',
          price: 50,
          duration_minutes: 20,
          subprestation_id: 1,
        }, {
              name: 'Barrel',
              description: 'Barrel',
              price: 20,
              duration_minutes: 40,
              subprestation_id: 2,
          },
          {
              name: 'Vanille/Tresse',
              description: 'Vanille ou Tresse',
              price: 35,
              duration_minutes: 40,
              subprestation_id: 2,
          },
          {
              name: 'Knot Bob',
              description: 'Knot Bob',
              price: 60,
              duration_minutes: 40,
              subprestation_id: 2,
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
