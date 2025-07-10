"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('students', 'email');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('students', 'email', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
