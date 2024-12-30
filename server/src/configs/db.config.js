const db_information = {
  port: process.env.DB_PORT,
  connection_type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

const { port, connection_type, host, database, username, password } =
  db_information;
export { port, connection_type, host, database, username, password };
