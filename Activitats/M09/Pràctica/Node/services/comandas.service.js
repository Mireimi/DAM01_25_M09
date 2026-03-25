import { comandas, id } from '../data/comandas.data.js';

const comandasGuardadas = [];

export function crearYProcesar(comandaCliente) {

    const numeroAleatorio = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const idGenerado = `ORD-${numeroAleatorio}`;
    let totalPedido = 0;
    const itemsProcesados = [];

    for (const item of comandaCliente.items) {
        const camisetaInfo = camisetas.find(c => c.id === item.camisetaId);
        const precioUnitario = camisetaInfo ? camisetaInfo.precio : 0;
        const subtotal = precioUnitario * item.cantidad;
        totalPedido += subtotal;
        itemsProcesados.push({
            camisetaId: item.camisetaId,
            nombre: camisetaInfo ? camisetaInfo.nombre : "Nombre no encontrado",
            talla: item.talla,
            color: item.color,
            cantidad: item.cantidad,
            precioUnitario: precioUnitario,
            subtotal: Number(subtotal.toFixed(2)) 
        });
    }

    const ticketFinal = {
        id: idGenerado,
        fecha: new Date().toISOString(),
        estado: "recibida",
        items: itemsProcesados,
        total: Number(totalPedido.toFixed(2))
    };
    comandasGuardadas.push(ticketFinal);
    return ticketFinal;
}

export function getAllComandas() {
    return comandasGuardadas;
}

export function getByIdComandas(idBuscado) {
    return comandasGuardadas.find(comanda => comanda.id === idBuscado);
}
