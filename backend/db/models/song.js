'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    songURL: {
      allowNull: false,
      type: DataTypes.TEXT,
      unique: true,
      validate: {
        notEmpty: true,
      }
    },
    artworkURL: {
      type: DataTypes.TEXT,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING(255),
      validate: {
        max: 255,
        notEmpty: true,
      }
    },
    genre: {
      type: DataTypes.STRING(25),
      validate: {
        max: 25
      }
    },
    description: {
      type: DataTypes.STRING(500),
      validate: {
        max: 255
      },
    },
    duration: {
      allowNull: false,
      type: DataTypes.STRING(5),
      validate: {
        max: 5,
        notEmpty: true,
      }
    },
    plays: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Song;
};
