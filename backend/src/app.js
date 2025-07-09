const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const piezaRoutes = require('./routes/pieza.routes');
const usersRoutes = require('./routes/users.routes');
const componenteRoutes = require('./routes/componente.routes');
const piezaComponenteRoutes = require('./routes/piezaComponente.routes');
const ensamblajeRoutes = require('./routes/ensamblaje.routes');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api/auth', authRoutes);
app.use('/api/piezas', piezaRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/componentes', componenteRoutes);
app.use('/api/piezas-componentes', piezaComponenteRoutes);
app.use('/api/ensamblaje', ensamblajeRoutes);
module.exports = app;