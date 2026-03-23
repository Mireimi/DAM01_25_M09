import { camisetas } from '../data/camisetas.data.js';

export function getAll() {
    return camisetas;
}

export function filterTalla(req, camisetas) {
    if (req.query.talla) {
        return camisetas.filter(c => c.tallas.includes(req.query.talla))
    } else {
        return camisetas;
    }
}

export function filterColor(req, camisetas) {
    if (req.query.color) {
        return camisetas.filter(c => c.colores.includes(req.query.color))
    } else {
        return camisetas;
    }
}

export function filterTag(req, camisetas) {
    if (req.query.tag) {
        return camisetas.filter(c => c.tags.includes(req.query.tag))
    } else {
        return camisetas;
    }
}

export function filterQ(req, camisetas) {
    if (req.query.q) {
        return camisetas.filter(c => c.nombre.includes(req.query.q) || c.descripcion.includes(req.query.q))
    } else {
        return camisetas;
    }
}

export function filterSort(req, camisetas) {
    if (req.query.sort) {
        if (req.query.sort == "precio_asc") return camisetas.sort((a, b) => a.precioBase - b.precioBase);
        else if (req.query.sort == "precio_desc") return camisetas.sort((a, b) => b.precioBase - a.precioBase);
        else if (req.query.sort == "nombre_asc") return camisetas.sort((a, b) => a.nombre.localeCompare(b.nombre));
        else if (req.query.sort == "nombre_desc") return camisetas.sort((a, b) => b.nombre.localeCompare(a.nombre));
        else return res.status(400).json({ error: "Sort no reconocido" });
    } else {
        return camisetas;
    }
}

export function getById(id) {
    return camisetas.find(camiseta => camiseta.id === id);
}
