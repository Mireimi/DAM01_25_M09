import * as camisetasService from '../services/camisetas.services.js';

export function getAll(req, res) {
    let camisetas = camisetasService.getAll();

    camisetas = camisetasService.filterTalla(req, camisetas)

    camisetas = camisetasService.filterColor(req, camisetas)

    camisetas = camisetasService.filterTag(req, camisetas)

    camisetas = camisetasService.filterQ(req, camisetas)

    if(req.query.sort){
        if(req.query.sort == "precio_asc") camisetas.sort((a, b) => a.precioBase - b.precioBase);
        else if(req.query.sort == "precio_desc") camisetas.sort((a, b) => b.precioBase - a.precioBase);
        else if (req.query.sort == "nombre_asc") camisetas.sort((a, b) => a.nombre.localeCompare(b.nombre));
        else if (req.query.sort == "nombre_desc") camisetas.sort((a, b) => b.nombre.localeCompare(a.nombre));
        else return res.status(400).json({error: "Sort no reconocido"}) 
    }

    res.json(camisetas);
}

export function getById(req, res) {
    const id = req.params.id;
    let camiseta = camisetasService.getById(id)

    if (!camiseta) return res.status(404).json({ error: "Camiseta no encontrada" });

    res.status(200).json(camiseta);
}

