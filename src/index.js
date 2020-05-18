const express = require('express');

const app = express();

const PORT = process.env.PORT || 1337;

app.listen(PORT, (req, res) => {
  console.log(`🚀🚀 Listening on port: ${PORT}`);
})