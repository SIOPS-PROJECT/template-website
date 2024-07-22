const path = require('node:path');
const api_db = require('./scripts/database.js');
const express = require('express');
const server = express();
const converterArray = api_db.converterArray;
const router = new express.Router();
const cors = require('cors');
const compression = require('compression');
const {engine} = require('express-handlebars');

server.engine('.html', engine({
  extname: ".html"
}));
server.set('view engine', 'express-handlebars');
server.set('views', './views');

server.use(cors({
  origin: 'http://localhost:9000',  // Reemplaza con el origen desde donde se hacen las peticiones
  methods: ['GET', 'POST'],  // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type'],
}));
server.use(compression());


process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Aquí podrías manejar el error globalmente, registrar un error, etc.
});

const database = new api_db({
  user: "acape",
  password: "admin"
})

function openCashDrawer() {
  return printer.print(path.join(__dirname, configs.pdf_route), { printer: configs.printer ? configs.printer : undefined });
}

server.use('/scripts', express.static('./scripts'))
server.use('/styles', express.static('./styles'));
server.use('/img', express.static('./img'))

router.get('/', (req, res) => {
  res.render('index.html')
})


server.use(express.json())
server.use(router);

server.set('port', 80);

const service = server.listen(server.get('port'), () => {
  console.log('Servidor Abierto')
});
// database configuration

database.start();

module.exports = { service, database, server, openCashDrawer }