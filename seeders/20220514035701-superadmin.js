'use strict';
const bycrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Users', [{
        name: "superadmin",
        email:"superadmin@gmail.com" ,
        password: bycrypt.hashSync("superadmin", 10),
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date()
      }], 
    {});

  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
