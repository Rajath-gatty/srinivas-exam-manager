const express = require('express');
const app = express();

const publicRoutes = require('./Router/registrationRoutes');

app.use(express.json());

app.use(publicRoutes);

app.listen(8080);