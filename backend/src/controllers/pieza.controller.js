const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todas las piezas
const getAllPiezas = async (req, res) => {
  try {
    const piezas = await prisma.pieza.findMany();
    res.json(piezas);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener piezas', error: err.message });
  }
};

// Crear pieza con validaciones
const createPieza = async (req, res) => {
  const { nombre, descripcion, numeroSerie, ubicacion, cantidad, stockMinimo } = req.body;

  if (!nombre || nombre.length < 3 || nombre.length > 100) {
    return res.status(400).json({ message: 'El nombre debe tener entre 3 y 100 caracteres' });
  }

  if (!descripcion || descripcion.length > 255) {
    return res.status(400).json({ message: 'La descripción es obligatoria y debe tener máximo 255 caracteres' });
  }

  if (!numeroSerie) {
    return res.status(400).json({ message: 'El número de serie es obligatorio' });
  }

  if (!ubicacion || ubicacion.length < 2 || ubicacion.length > 100) {
    return res.status(400).json({ message: 'La ubicación debe tener entre 2 y 100 caracteres' });
  }

  if (cantidad < 0 || stockMinimo < 0) {
    return res.status(400).json({ message: 'Cantidad y stock mínimo no pueden ser negativos' });
  }

  try {
    const pieza = await prisma.pieza.create({
      data: { nombre, descripcion, numeroSerie, ubicacion, cantidad, stockMinimo }
    });
    res.status(201).json(pieza);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear pieza', error: err.message });
  }
};

// Actualizar pieza
const updatePieza = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, numeroSerie, ubicacion, cantidad, stockMinimo } = req.body;

  try {
    const pieza = await prisma.pieza.update({
      where: { id: Number(id) },
      data: { nombre, descripcion, numeroSerie, ubicacion, cantidad, stockMinimo }
    });

    let alerta = null;
    if (pieza.cantidad < pieza.stockMinimo) {
      alerta = `¡Alerta! La pieza "${pieza.nombre}" está por debajo del stock mínimo.`;
    }

    res.json({ pieza, alerta });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar pieza', error: err.message });
  }
};

// Eliminar pieza
const deletePieza = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.pieza.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Pieza eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar pieza', error: err.message });
  }
};

// Obtener piezas con stock bajo
const getLowStockPiezas = async (req, res) => {
  try {
    const piezas = await prisma.pieza.findMany({
      where: {
        cantidad: { lt: prisma.pieza.fields.stockMinimo }
      }
    });
    res.json(piezas);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener piezas con stock bajo', error: err.message });
  }
};

module.exports = {
  getAllPiezas,
  createPieza,
  updatePieza,
  deletePieza,
  getLowStockPiezas
};
