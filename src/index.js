const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./middlewares');

const app = express();
app.use(morgan('combined'));
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world!',
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`🚀🚀 Listening on port: ${PORT}`);
});
