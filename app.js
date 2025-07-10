const express = require('express');
const app = express();
const PORT = 3000;

const mailSend = require('./controllers/mailSend');

app.get('/', (req, res) => {
  res.send('For sending mail, go to /sendmail');
});

app.get('/sendmail',mailSend);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})