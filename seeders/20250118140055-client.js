'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
    // await queryInterface.bulkInsert('clients', [{
    //   id: 1,
    //   firstname: 'anthony',
    //   lastname: "cory",
    //   email: "test@test.fr",
    //   phone: "0606060606",
    //   createdAt: new Date(),
    //     updatedAt: new Date()
    // }], {});

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
