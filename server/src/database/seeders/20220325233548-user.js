'use strict';
var crypto = require('crypto');

module.exports = {
  async up (queryInterface, Sequelize) {
    let passwordMd5 = crypto.createHash('md5').update('12345').digest("hex");

    await queryInterface.bulkInsert('users', [{
      name: 'Globo',
      email: 'teste@teste.com.br',
      password: passwordMd5,
      createdAt: new Date(),
      updatedAt: new Date(),
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
