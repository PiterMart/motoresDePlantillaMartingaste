
const path = require('path');
const { engine } = require('express-handlebars')
const express = require('express');


const app = express();
const PORT = process.env.PORT || 5050;
const products = [];

// Middlewares
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Template engines
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'index.hbs',
  layoutsDir: path.resolve(__dirname, './views'),
  partialsDir: path.resolve(__dirname, './views/partials'),
}));

app.set('views', './views');
app.set('view engine', 'hbs');

// Ruta

app.get('/', (req,res) => {
  res.render('layouts/main', {  products , form: true })
});

app.get('/products', (req,res) => {
  res.render('layouts/main', { products , history: true, pLength: products.length>0 })
});

app.post('/products', (req, res) => {
  products.push(req.body);
  res.redirect('/');
});

const connectedServer = app.listen(PORT, () => {
  console.log(`Servidor activo y escuchando en el puerto ${PORT}`);
});

connectedServer.on('error', (error) => {
  console.log(error.message);
});