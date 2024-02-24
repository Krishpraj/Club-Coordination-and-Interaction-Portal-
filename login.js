async function attemptLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Fetch data from usernames.json
    const response = await fetch('usernames.json');
    const data = await response.json();

    // Check if entered credentials are valid
    const isValid = data.users.some(user => user.username === username && user.password === password);

    if (isValid) {
        // Store the username in localStorage
        localStorage.setItem('username', username);
        // Redirect to index.html on successful login
        window.location.href = 'index.html';
    } else {
        document.getElementById('login-error').textContent = 'Invalid username or password';
    }
}

