const mysql = require("mysql");


const myconnections = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    db_port: process.env.DB_PORT,
  });
  
  myconnections.connect((err) => {
    if (!err) {
      console.log(`😋connected successfully`);
    } else {
      console.log(err);
    }
  });

  module.exports = myconnections;