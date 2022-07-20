const express = require('express');
// const spdy = require('spdy');
// const fs = require('fs');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const registrationRoutes = require('./Router/registrationRoutes');
const adminRoutes = require('./Router/adminRoutes');
const staffRoutes = require('./Router/staffRoutes');
const examcoordRoutes = require('./Router/examcoordRoutes');
const facultyRoutes = require('./Router/facultyRoutes');
const studentRoutes = require('./Router/studentRoutes');
const routes = require('./Router/routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const imgPath = path.join(__dirname, 'uploads');
app.use(express.static(imgPath));
app.use(express.json());
app.use(cors());

app.use('/admin',adminRoutes);
app.use('/staff',staffRoutes);
app.use('/examcoord',examcoordRoutes);
app.use('/faculty',facultyRoutes);
app.use('/student',studentRoutes);
app.use(routes);
app.use(registrationRoutes);

const PORT = process.env.PORT||8080;
app.listen(PORT);
// spdy
//     .createServer({
//         key: fs.readFileSync('./server.key'),
//         cert: fs.readFileSync('./server.crt')
//     }, app)
//     .listen(PORT, (err) => {
//         if (err) {
//             throw new Error(err);
//         }});