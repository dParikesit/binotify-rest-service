'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
        'users',
        [
          {
            email: 'iniadmin@gmail.com',
            password: 'iniadmin',
            username: "iniadmin",
            name: "iniadmin",
            isAdmin: true,
            createdAt: new Date(0).toISOString(),
            updatedAt: new Date(0).toISOString(),
          },
          {
            email: 'iniuser@gmail.com',
            password: 'iniuser',
            username: "iniuser",
            name: "iniuser",
            isAdmin: false,
            createdAt: new Date(0).toISOString(),
            updatedAt: new Date(0).toISOString(),
          },
        ],
        {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('users', null, {}),
};
