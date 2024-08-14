
// Function to handle staff hiring form submission

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
  
  
  // Function to handle new client registration form submission
  document.getElementById('clientForm')?.addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  
  
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
  
  
  // Function to handle the editing of staff or client details (for update forms)
  function editStaff(staffNo) {
    console.log('Edit staff:', staffNo);
  }