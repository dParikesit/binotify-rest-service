'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    toJSON() {
      // hide protected fields
      const attributes = { ...this.get() };
      return attributes;
    }
  }
  Song.init({
    song_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    judul:  {
      type: DataTypes.STRING,
      allowNull: false,
    },
    penyanyi_id: DataTypes.INTEGER,
    audio_path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Song',
  });
  Song.associate = function(models) {
    // associations can be defined here
    Song.belongsTo(models.User, {
      foreignKey: 'penyanyi_id',
      as: 'user',
    });
  };
  return Song;
};