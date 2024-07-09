// server.js
const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Oracle DB connection configuration
const dbConfig = {
  user: 'yourUsername',
  password: 'yourPassword',
  connectString: 'yourConnectString'
};

// Endpoint to hire a staff
app.post('/hire-staff', async (req, res) => {
  const { staffNo, firstName, lastName, position, branchNo, dob, salary, telephone, mobile, email } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `BEGIN
         staff_hire_sp(:staffNo, :firstName, :lastName, :position, :branchNo, :dob, :salary, :telephone, :mobile, :email);
       END;`,
      { staffNo, firstName, lastName, position, branchNo, dob, salary, telephone, mobile, email },
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
