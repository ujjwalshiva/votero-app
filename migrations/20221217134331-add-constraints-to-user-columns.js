"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    queryInterface.changeColumn("Users", "password", {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        async isNotNullString(value) {
          if (await bcrypt.compare("", value)) {
            throw new Error("Password Required");
          }
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.changeColumn("Users", "password", {
      type: Sequelize.STRING,
    });
  },
};
