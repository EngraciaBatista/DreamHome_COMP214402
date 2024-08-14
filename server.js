// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');

// Initialize Oracle client, provide path to your Oracle client libraries
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

    await connection.execute(
      `BEGIN
         staff_hire_sp(:staffNo, :fName, :lName, :position, :sex, TO_DATE(:dob, 'YYYY-MM-DD'), :salary, :branchNo, :telephone, :mobile, :email);
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

// Endpoint to update a staff member
app.post('/update-staff', async (req, res) => {
  const { staffNo, fName, lName, position, sex, dob, salary, branchNo, telephone, mobile, email } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `BEGIN
         staff_update_sp(:staffNo, :fName, :lName, :position, :sex, TO_DATE(:dob, 'YYYY-MM-DD'), :salary, :branchNo, :telephone, :mobile, :email);
       END;`,
      { staffNo, fName, lName, position, sex, dob, salary, branchNo, telephone, mobile, email },
      { autoCommit: true }
    );

    res.status(200).json({ message: 'Staff updated successfully' });
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

// Endpoint to get branch address by branch number
app.post('/get-branch-address', async (req, res) => {
  const { branchNo } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT address FROM dh_branch WHERE branchNo = :branchNo`,
      { branchNo }
    );

    if (result.rows.length > 0) {
      res.status(200).json({ address: result.rows[0][0] });
    } else {
      res.status(404).json({ message: 'Branch not found' });
    }
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

// Endpoint to hire a client
app.post('/register-client', async (req, res) => {
  const { clientNo, fName, lName, telNo, street, city, email, prefType, maxRent } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `BEGIN
         CLIENT_REGISTRATION_SP(:clientNo, :fName, :lName, :telNo, :street, :city, :email, :prefType, :maxRent);
       END;`,
      { clientNo, fName, lName, telNo, street, city, email, prefType, maxRent },
      { autoCommit: true }
    );

    res.status(200).json({ message: 'Client registered successfully' });
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

// Endpoint to update a client
app.post('/update-client', async (req, res) => {
  const { clientNo, fName, lName, dob, sex, telephone, mobile, email } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `BEGIN
         client_update_sp(:clientNo, :fName, :lName, TO_DATE(:dob, 'YYYY-MM-DD'), :sex, :telephone, :mobile, :email);
       END;`,
      { clientNo, fName, lName, dob, sex, telephone, mobile, email },
      { autoCommit: true }
    );

    res.status(200).json({ message: 'Client updated successfully' });
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

// Endpoint to get staff details for a specific staff member (used in update form)
app.get('/get-staff-details', async (req, res) => {
  const { staffNo } = req.query;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT fName, lName, email, telephone, salary FROM dh_staff WHERE staffNo = :staffNo`,
      { staffNo }
    );

    if (result.rows.length > 0) {
      const staff = result.rows.map(row => ({
        fName: row[0],
        lName: row[1],
        email: row[2],
        telephone: row[3],
        salary: row[4]
      }));
      res.status(200).json({ data: staff });
    } else {
      res.status(404).json({ message: 'Staff not found' });
    }
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

// Endpoint to get client details for a specific client (used in update form)
app.get('/get-client-details', async (req, res) => {
  const { clientNo } = req.query;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT fName, lName, email, telephone FROM dh_client WHERE clientNo = :clientNo`,
      { clientNo }
    );

    if (result.rows.length > 0) {
      const client = result.rows.map(row => ({
        fName: row[0],
        lName: row[1],
        email: row[2],
        telephone: row[3]
      }));
      res.status(200).json({ data: client });
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
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

/*
Instructions:

1. Ensure you have an Oracle client installed on your machine.
2. Set up your `.env` file in the root of your project with the following details:
   - DB_USER=your_username
   - DB_PASSWORD=your_password
   - DB_CONNECT_STRING=your_connect_string
   - ORACLE_CLIENT_LIB_DIR=path_to_your_oracle_client_libraries
3. Install the necessary npm packages by running:
   - npm install dotenv express body-parser oracledb
4. Start the server using:
   - node server.js
5. Access the application at `http://localhost:5001`.
*/

// Notes:
//make sure you are in the same directory as the server.js file.
//To stop the server, press Ctrl + C on the terminal. The server will stop running and the port will be released.
//Add your usename, password, and connect string to the .env file. in the format bellow
//Make sure you have the Oracle Instant Client installed on your machine. You can download it from the Oracle website.
//To test the connection, open your browser and navigate to http://localhost:5001/. It will load the index.html file from the public folder.
//To hire a staff, fill the form and click the "Hire Staff" button.
//to inspect the request and response, open the browser console (right click - inspect - Network tab)
//if you ran into an error, it will be displayed in the console.
//click on the error to see more details.


/*
Instructions:

How to create an env file to secure your secret information:

To create a .env file and add your environment variables, follow these steps:

Create the .env File: In the root directory of your project (where your server.js file is located), create a new file named .env.

Add Environment Variables: Open the .env file and add your environment variables in the following format:

Replace your_username, your_password, and 199.212.26.208:1521/SQLD with your actual database credentials and connection string.

Save the .env File: Save the file after adding the environment variables.

Using the .env File in Your Code
Ensure you have the dotenv package installed to load the environment variables from the .env file:

npm install dotenv

_________________________

Installing the necessary packages for this project:

Ensure Node.js and npm are Installed: Make sure you have Node.js and npm installed on your machine. You can check by running:

node -v
npm -v

If they are not installed, you can download and install them from nodejs.org.

Navigate to Your Project Directory: Open a terminal and navigate to the root directory of your project where the package.json file is located.

Install the Packages: Run the following command to install all the packages listed in your package.json file:

npm install

npm install dotenv express body-parser oracledb

*/
