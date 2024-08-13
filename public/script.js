// public/script.js
document.getElementById('hireForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  // Rename the keys to match the database column names
  data.fname = data.firstName;
  data.lname = data.lastName;
  delete data.firstName;
  delete data.lastName;

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

// Add event listener for the "Clear Form" button
document.getElementById('clearFormButton').addEventListener('click', function() {
  document.getElementById('hireForm').reset();
  document.getElementById('message').textContent = ''; // Clear the message as well
});