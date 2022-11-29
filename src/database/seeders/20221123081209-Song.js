'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
        'Songs',
        [
          {
            song_id: "e1f3f5cc-b1b4-4cd1-b33c-3fe4a7217bbf",
            judul: 'Hypeboy',
            penyanyi_id: 2,
            audio_path: "",
            createdAt: new Date(0).toISOString(),
            updatedAt: new Date(0).toISOString(),
          },
          {
            song_id: "0930a156-5859-4ef2-8e8f-1b70f2d259e3",
            judul: 'Attention',
            penyanyi_id: 2,
            audio_path: "",
            createdAt: new Date(0).toISOString(),
            updatedAt: new Date(0).toISOString(),
          },
        ],
        {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('songs', null, {}),
};
