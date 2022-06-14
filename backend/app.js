const express = require('express');
const cors = require('cors');
const app = express();

const registrationRoutes = require('./Router/registrationRoutes');
const adminRoutes = require('./Router/adminRoutes');
const staffRoutes = require('./Router/staffRoutes');
const routes = require('./Router/routes');

app.use(express.json());
app.use(cors());

app.use('/admin',adminRoutes);
app.use('/staff',staffRoutes);
app.use(routes);
app.use(registrationRoutes);

app.listen(8080);