'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("members", [
      {
        name: `Pandhu`, gender: `Male`,
        contact: `087858496019`, address:`Tokyo Japan`,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: `Arya`, gender: `Male`,
        contact: `087858496013`, address:`Hiroshima Japan`,
        createdAt: new Date(), updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('members', null, {});
  }
};
