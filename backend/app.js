const express = require('express');
const cors = require('cors');
const app = express();

const publicRoutes = require('./Router/registrationRoutes');
const adminRoutes = require('./Router/adminRoutes');

app.use(express.json());
app.use(cors());

app.use('/admin',adminRoutes);

app.use(publicRoutes);

app.listen(8080);