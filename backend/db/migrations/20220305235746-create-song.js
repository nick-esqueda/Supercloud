'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      songURL: {
        allowNull: false,
        type: Sequelize.TEXT,
        unique: true,
      },
      artworkURL: {
        type: Sequelize.TEXT,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      genre: {
        type: Sequelize.STRING(25)
      },
      description: {
        type: Sequelize.STRING(255)
      },
      duration: {
        allowNull: false,
        type: Sequelize.STRING(5)
      },
      plays: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Songs');
  }
};
