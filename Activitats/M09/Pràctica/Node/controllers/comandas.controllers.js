import * as comandasService from '../services/comandas.service.js';

export function create(req, res) {
    let comanda = req.body;

    if (!comanda) return res.status(400).json({ error: 'Comanda no proporcionada' });

    if (!comanda.cliente) return res.status(400).json({ error: 'Cliente es obligatorio' });

    if (!comanda.cliente.nombre || comanda.cliente.nombre.length < 2) return res.status(400).json({ error: 'Nombre del cliente es obligatorio y debe tener al menos 2 caracteres' });

    if (!comanda.cliente.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(comanda.cliente.email)) return res.status(400).json({ error: 'Email del cliente es obligatorio y debe ser válido' });

    if (!comanda.items || comanda.items.length === 0) return res.status(400).json({ error: 'La comanda debe contener al menos un item' });

    const tallasValidas = ['S', 'M', 'L', 'XL', 'XXL'];
    const coloresValidos = ['blanco', 'negro', 'gris', 'azul'];

    for (let i = 0; i < comanda.items.length; i++) {
        const item = comanda.items[i];
        
        if (!item.camisetaId) {
            return res.status(400).json({ error: 'El item en la posición ${i} debe tener un id de camiseta' });
        }
        if (item.cantidad === undefined || item.cantidad <= 0) {
            return res.status(400).json({ error: 'La cantidad del item ${item.camisetaId} debe ser mayor a 0' });
        }
        if (!tallasValidas.includes(item.talla)) {
            return res.status(400).json({ error: 'Talla inválida en ${item.camisetaId}. Debe ser: S, M, L, XL, XXL' });
        }
        if (!coloresValidos.includes(item.color)) {
            return res.status(400).json({ error: 'Color inválido en ${item.camisetaId}. Debe ser: blanco, negro, gris o azul' });
        }
    }

    comandasService.create(comanda);

    res.status(200).json(comanda);

    try {

        const nuevaComanda = comandasService.crearYProcesar(comanda);

        return res.status(201).json(nuevaComanda);

    } catch (error) {

        return res.status(500).json({ error: 'Error al procesar la comanda' });
    }
}

export function listarComandas(req, res) {
    try {
        const comandas = comandasService.obtenerTodas();
        return res.status(200).json(comandas);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener las comandas' });
    }
}

export function obtenerDetalle(req, res) {
    try {
        const id = req.params.id;
        const comanda = comandasService.obtenerPorId(id);

        if (!comanda) {
            return res.status(404).json({ error: 'Comanda no encontrada' });
        }

        return res.status(200).json(comanda);
    } catch (error) {
        return res.status(500).json({ error: 'Error al buscar la comanda' });
    }
}