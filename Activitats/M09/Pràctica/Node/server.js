import express from 'express';
import camisetasRouter from './routes/camisetas.routes.js';
import comandasRouter from './routes/comandas.routes.js';

const app = express();
const PORT = 4000;

// Middlewares globales
app.use(express.json());

// Log mínimo
app.use((req, res, next) => {
 console.log(req.method, req.url);
 next();
});

// Rutas
app.use('/api/camisetas', camisetasRouter);
app.use('/api/comandas', comandasRouter);

// Middleware de errores
app.use((err, req, res, next) => {
 console.error(err.message);
 res.status(500).json({ message: "Error interno" });
});

app.listen(PORT, () => {
 console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
