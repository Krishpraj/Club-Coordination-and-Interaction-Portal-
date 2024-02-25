async function attemptLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Fetch data from usernames.json
    const response = await fetch('usernames.json');
    const data = await response.json();

    // Check if entered credentials are valid
    const user = data.users.find(user => user.username === username && user.password === password);

    if (user) {
        // Store username and status in localStorage
        localStorage.setItem('username', user.username);
        localStorage.setItem('status', user.is_admin ? 'Admin' : 'Student');

        // Redirect to index.html on successful login
        window.location.href = 'index.html';
    } else {
        document.getElementById('login-error').textContent = 'Invalid username or password';
    }
}
