const path = require("path");

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname,"src","database", "foodExplorer.db")
    },
    useNullAsDefault: true,
    charset: 'utf8',
    migrations: {
      directory: path.resolve(__dirname, "src", "database","knex","migrations")
    }
  }
};
