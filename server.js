const express = require('express');
const app = express();

// Use the PORT provided by Heroku
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, Heroku!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
