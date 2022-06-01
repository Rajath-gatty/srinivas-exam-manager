const express = require('express');
const cors = require('cors');
const app = express();

const publicRoutes = require('./Router/registrationRoutes');

app.use(express.json());
app.use(cors());

app.use(publicRoutes);
app.listen(8080);