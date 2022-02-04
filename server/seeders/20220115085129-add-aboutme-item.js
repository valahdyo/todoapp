"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) =>
    await queryInterface.bulkInsert(
      "items",
      [
        {
          value: "Hello World !",
          idList: 1,
          done: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          value: "I'm Valahdyo",
          idList: 1,
          done: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          value: "Thank you for downloading this app 😊 !",
          idList: 1,
          done: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          value: "Have Fun",
          idList: 1,
          done: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("items", null, {})
  },
}
