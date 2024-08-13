// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');

oracledb.initOracleClient({ libDir: process.env.ORACLE_CLIENT_LIB_DIR });

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(express.static('public'));

// Oracle DB connection configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING

};

// Endpoint to hire a staff
app.post('/hire-staff', async (req, res) => {
  const { staffNo, fName, lName, position, sex, dob, salary, branchNo, telephone, mobile, email } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `BEGIN
         staff_hire_sp(:staffNo, :fName, :lName, :position, :sex, :dob, :salary, :branchNo, :telephone, :mobile, :email);
       END;`,
      { staffNo, fName, lName, position, sex, dob, salary, branchNo, telephone, mobile, email },
      { autoCommit: true }
    );

    res.status(200).json({ message: 'Staff hired successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//To run the server, execute the following command on the terminal:
// node server.js
//make sure you are in the same directory as the server.js file.
//then open the browser and navigate to http://localhost:5001
//The server will be running and waiting for requests.
//To stop the server, press Ctrl + C on the terminal.
//The server will stop running and the port will be released.
//Add your usename, password, and connect string to the .env file. in the format bellow
//DB_USER=your_username
//DB_PASSWORD=your_password
//DB_CONNECT_STRING=199.212.26.208:1521/SQLD
//also, make sure you have the Oracle Instant Client installed on your machine.
//You can download it from the Oracle website.

