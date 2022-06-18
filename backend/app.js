const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const registrationRoutes = require('./Router/registrationRoutes');
const adminRoutes = require('./Router/adminRoutes');
const staffRoutes = require('./Router/staffRoutes');
const examcoordRoutes = require('./Router/examcoordRoutes');
const routes = require('./Router/routes');

app.use(express.json());
app.use(cors());

app.use('/admin',adminRoutes);
app.use('/staff',staffRoutes);
app.use('/examcoord',examcoordRoutes);
app.use(routes);
app.use(registrationRoutes);

const PORT = process.env.PORT||8080;
app.listen(PORT);