require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);
// includes both username and pwd in the url

const main = async () => {
  try {
    console.log("connection established");
    await sequelize.authenticate();
    const notes = await sequelize.query("SELECT * FROM notes", {
      type: QueryTypes.SELECT,
    });
    console.log(`~~~~~~~`);
    console.log(notes);
    console.log(`~~~~~~~`);
    sequelize.close();
  } catch (e) {
    console.error(`Unable to connect: ${e}`);
  }
};

main();
