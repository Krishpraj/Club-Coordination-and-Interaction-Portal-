const express = require('express');
const fs = require('fs');
const path = require('path'); // Import the path module
const app = express();
const port = 3000; // Port number for the server to listen on

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route handler - Redirect to login.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/partners', (req, res) => {
    fs.readFile('partners.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading partners.json:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to handle POST requests to add a new partner
app.post('/add-partner', (req, res) => {
    const newPartner = req.body; // Assuming the request body contains the new partner data
    
    // Read the existing partners data from the JSON file
    // Read the existing partners data from the JSON file
    fs.readFile('partners.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading partners.json:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Parse the JSON data
        const jsonData = JSON.parse(data);
        const partners = jsonData.partners; // Access the partners array

        // Add the new partner to the partners array
        partners.push(newPartner);

        // Write the updated partners data back to the JSON file
        fs.writeFile('partners.json', JSON.stringify(jsonData, null, 2), err => {
            if (err) {
                console.error('Error writing partners.json:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            // Send a success response
            res.status(200).send('New partner added successfully');
        });
    });

});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
