const express = require('express')
const cors = require('cors');
const app = express();

// settings 
app.set('port', process.env.PORT || 4000); // env. variable de entorno en caso de exportar la app en servidores como AWS sino 4000

//midlewares
app.use(cors());
app.use(express.json());

// routes

app.use('/api/users', require('./routes/users'))
app.use('/api/notes', require('./routes/notes'))
app.use('/api/', require('./routes/auth'))







//

module.exports = app;