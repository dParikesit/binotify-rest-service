'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toJSON() {
      // hide protected fields
      const attributes = { ...this.get() };
      return attributes;
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Song, {
      foreignKey: 'id',
      as: 'songs',
    });
  };
  return User;
};