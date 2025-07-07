const express = require('express');
const app = express();
const PORT = 3000;

// Serve static files (e.g., index.html) from the "public" folder
app.use(express.static('public'));

app.get('/home', (req, res) => {
  res.redirect('/');
});

app.get('/example', (req, res) => {
  res.redirect('/example.html');
});

// Catch-all 404 route
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
