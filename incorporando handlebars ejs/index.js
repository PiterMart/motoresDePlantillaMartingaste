
const path = require('path');
const rutasApi = require('./routers/index');
const express = require('express');


const app = express();
const PORT = process.env.PORT || 8080;
const productos = [];

// Middlewares
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Template engines
app.set('views', './views');
app.set('view engine', 'ejs');

// Rutas

app.use('/api', rutasApi);

app.get('/', (req,res) => {
  res.render('index', { productos })
});

app.get('/productos', (req,res) => {
  res.render('productos', { productos })
});

app.post('/productos', (req, res) => {
  productos.push(req.body);
  res.redirect('/');
})

const connectedServer = app.listen(PORT, () => {
  console.log(`Servidor activo y escuchando en el puerto ${PORT}`);
});

connectedServer.on('error', (error) => {
  console.log(error.message);
});