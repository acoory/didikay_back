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
        duration: 120,
        status: 'active',
        subprestationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
            name: 'Crochet piqué',
            description: 'Crochet piqué',
            price: 80,
            duration: 120,
            status: 'active',
            subprestationId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
          name: 'Crochet',
          description: 'Crochet',
          price: 50,
          duration: 120,
          status: 'active',
          subprestationId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
              name: 'Barrel',
              description: 'Barrel',
              price: 20,
              duration: 70,
              status: 'active',
              subprestationId: 2,
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'Vanille/Tresse',
              description: 'Vanille ou Tresse',
              price: 35,
              duration: 40,
              status: 'active',
              subprestationId: 2,
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'Knot Bob',
              description: 'Knot Bob',
              price: 60,
              duration: 40,
              status: 'active',
              subprestationId: 2,
              createdAt: new Date(),
              updatedAt: new Date()
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
