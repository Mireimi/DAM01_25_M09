import * as comandasService from '../services/comandas.service.js';

export function create(req, res) {
    let comanda = req.body;

    if (!comanda) return res.status(400).json({ error: 'Comanda no proporcionada' });

    if (!comanda.cliente) return res.status(400).json({ error: 'Cliente es obligatorio' });

    if (!comanda.cliente.nombre || comanda.cliente.nombre.length < 2) return res.status(400).json({ error: 'Nombre del cliente es obligatorio y debe tener al menos 2 caracteres' });

    if (!comanda.cliente.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(comanda.cliente.email)) return res.status(400).json({ error: 'Email del cliente es obligatorio y debe ser válido' });

    if (!comanda.items || comanda.items.length === 0) return res.status(400).json({ error: 'La comanda debe contener al menos un item' });

    if (cantidad <= 0) return res.status(400).json({ error: 'La cantidad de cada item debe ser mayor a 0' });

    if (!camisetaId) return res.status(400).json({ error: 'Cada item debe tener un id de camiseta existente' });

    if (!['S', 'M', 'L', 'XL', 'XXL'].includes(talla)) return res.status(400).json({ error: 'Talla debe ser una de las siguientes: S, M, L, XL, XXL' });

    if(!['blanco','negro','gris','azul'].includes(color)) return res.status(400).json({ error: 'Color debe ser uno de los siguientes: blanco, negro, azul o gris'});
    
    comandasService.create(comanda);

    res.status(200).json(comanda);
}