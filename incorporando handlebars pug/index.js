
const path = require('path');
const { engine } = require('express-handlebars')
const express = require('express');


const app = express();
const PORT = process.env.PORT || 4000;
const products = [];

// Middlewares
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Template engines


app.set('views', './views');
app.set('view engine', 'pug');

// Ruta

app.get('/', (req,res) => {
  res.render('index', {  products , form: true })
});

app.get('/products', (req,res) => {
  res.render('index', { products , history: true, pLength: products.length>0 })
});

app.post('/products', (req, res) => {
  products.push(req.body);
  res.redirect('/');
})

const connectedServer = app.listen(PORT, () => {
  console.log(`Servidor activo y escuchando en el puerto ${PORT}`);
});

connectedServer.on('error', (error) => {
  console.log(error.message);
});