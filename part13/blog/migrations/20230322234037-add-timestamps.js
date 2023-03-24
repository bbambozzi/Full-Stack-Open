"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("blogs", "created_at", {
      allowNull: false,
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("blogs", "updated_at", {
      allowNull: false,
      type: Sequelize.DATE,
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("blogs", "created_at");
    await queryInterface.removeColumn("blogs", "updated_at");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
