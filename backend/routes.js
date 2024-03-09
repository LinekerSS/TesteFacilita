import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import googleMaps from '@google/maps';
import pkg from 'pg';
const { Pool } = pkg;
dotenv.config();
const routes = express.Router();
routes.use(bodyParser.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

const googleMapsClient = googleMaps.createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
  Promise: Promise
});

routes.get('/', async(req, res) => {
    res.send('Servidor de teste rodando!')
})


routes.get('/clientes', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM clientes');
      res.json(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  });


routes.post('/clientes', async (req, res) => {
    const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;
    try {
      const { rows } = await pool.query('INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5) RETURNING *', [nome, email, telefone, coordenada_x, coordenada_y]);
      res.status(201).json(rows[0]);
    } catch (err) {
      res.status(500).send(err);
    }
  });  
  
routes.get('/rotas-otimizadas', async(req, res) => {
  try {

    const { rows: clientes } = await pool.query('SELECT * FROM clientes');

    const rotaOtimizada = await calcularRotaTSP(clientes);

    res.json(rotaOtimizada);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao calcular a rota otimizada');
  }
})



async function calcularRotaTSP(clientes) {
  const originAndDestination = '0,0';

  const waypoints = clientes
    .map(cliente => `${cliente.coordenada_x},${cliente.coordenada_y}`)
    .join('|');
    console.log(waypoints)

  try {
    const response = await googleMapsClient.directions({
      origin: originAndDestination,
      destination: originAndDestination,
      waypoints: `optimize:true|${waypoints}`,
      mode: 'driving'
    }).asPromise();

    if (response.json.status !== 'OK') {
      throw new Error(`Google Maps API Error: ${response.json.status}`);
    }

    const waypointOrder = response.json.routes[0].waypoint_order;
    const rotaOtimizada = waypointOrder.map(index => clientes[index]);

    rotaOtimizada.unshift({ nome: 'Empresa', coordenada_x: '0', coordenada_y: '0' });
    rotaOtimizada.push({ nome: 'Empresa', coordenada_x: '0', coordenada_y: '0' });

    return rotaOtimizada;
  } catch (error) {
    console.error('Erro ao calcular rota otimizada: ', error);
    throw error;
  }
}


export default routes;