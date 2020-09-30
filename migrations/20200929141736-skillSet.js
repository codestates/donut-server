"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn("Activities", "skillSet", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Activities", "skillSet");
  },
};
