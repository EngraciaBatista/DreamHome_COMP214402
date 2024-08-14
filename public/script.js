
// Function to handle staff hiring form submission
document.getElementById('hireForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  // Format DOB to 'YYYY-MM-DD'
  if (data.dob) {
      const dob = new Date(data.dob);
      const formattedDob = dob.toISOString().split('T')[0];
      data.dob = formattedDob;
  }

  try {
      const response = await fetch('/hire-staff', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      const result = await response.json();
      document.getElementById('message').textContent = result.message;
  } catch (error) {
      document.getElementById('message').textContent = 'Error hiring staff';
      console.error('Error:', error);
  }
});

// Function to handle staff update form submission
document.getElementById('updateForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  // Format DOB to 'YYYY-MM-DD'
  if (data.dob) {
      const dob = new Date(data.dob);
      const formattedDob = dob.toISOString().split('T')[0];
      data.dob = formattedDob;
  }

  try {
      const response = await fetch('/update-staff', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      const result = await response.json();
      document.getElementById('message').textContent = result.message;
  } catch (error) {
      document.getElementById('message').textContent = 'Error updating staff';
      console.error('Error:', error);
  }
});

// Function to fetch branch address
document.getElementById('branchForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
      const response = await fetch('/get-branch-address', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      const result = await response.json();
      document.getElementById('branchAddress').textContent = result.address || 'Branch not found';
  } catch (error) {
      document.getElementById('branchAddress').textContent = 'Error fetching branch address';
      console.error('Error:', error);
  }
});

// Function to handle new client registration form submission
document.getElementById('clientForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  // Format DOB to 'YYYY-MM-DD'
  if (data.dob) {
      const dob = new Date(data.dob);
      const formattedDob = dob.toISOString().split('T')[0];
      data.dob = formattedDob;
  }

  try {
      const response = await fetch('/register-client', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      const result = await response.json();
      document.getElementById('message').textContent = result.message;
  } catch (error) {
      document.getElementById('message').textContent = 'Error hiring client';
      console.error('Error:', error);
  }
});

// Function to handle client update form submission
document.getElementById('updateClientForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  // Format DOB to 'YYYY-MM-DD'
  if (data.dob) {
      const dob = new Date(data.dob);
      const formattedDob = dob.toISOString().split('T')[0];
      data.dob = formattedDob;
  }

  try {
      const response = await fetch('/update-client', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      const result = await response.json();
      document.getElementById('message').textContent = result.message;
  } catch (error) {
      document.getElementById('message').textContent = 'Error updating client';
      console.error('Error:', error);
  }
});

// Function to clear form
document.getElementById('clearFormButton')?.addEventListener('click', function () {
  document.querySelector('form').reset();
  document.getElementById('message').textContent = ''; // Clear the message as well
});

// Function to populate staff or client details on selection (for update forms)
async function populateTable(staffNo) {
  try {
      const response = await fetch(`/get-staff-details?staffNo=${staffNo}`);
      const result = await response.json();

      if (result.error) {
          document.getElementById('message').textContent = 'Error fetching details';
          return;
      }

      const tableBody = document.querySelector('#staffTable tbody');
      tableBody.innerHTML = ''; // Clear any existing rows

      // Populate table with the result data
      result.data.forEach(staff => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${staff.fName}</td>
              <td>${staff.lName}</td>
              <td>${staff.email}</td>
              <td>${staff.telephone}</td>
              <td>${staff.salary}</td>
              <td><button onclick="editStaff(${staff.staffNo})">Edit</button></td>
          `;
          tableBody.appendChild(row);
      });
  } catch (error) {
      document.getElementById('message').textContent = 'Error fetching details';
      console.error('Error:', error);
  }
}

// Function to handle the editing of staff or client details (for update forms)
function editStaff(staffNo) {
  // Here, you would fill the form with the selected staff details for editing
  console.log('Edit staff:', staffNo);
}
