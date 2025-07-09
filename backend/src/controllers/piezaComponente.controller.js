const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Asignar pieza a un componente (crear relación)
const addPiezaToComponente = async (req, res) => {
  const { piezaId, componenteId, cantidad } = req.body;

  if (cantidad <= 0) {
    return res.status(400).json({ message: 'La cantidad debe ser mayor a 0' });
  }

  try {
    const relacion = await prisma.piezaComponente.create({
      data: { piezaId, componenteId, cantidad }
    });
    res.status(201).json(relacion);
  } catch (err) {
    res.status(500).json({ message: 'Error al asignar pieza al componente', error: err.message });
  }
};

// Obtener las piezas de un componente
const getPiezasByComponente = async (req, res) => {
  const { componenteId } = req.params;

  try {
    const piezas = await prisma.piezaComponente.findMany({
      where: { componenteId: Number(componenteId) },
      include: { pieza: true }
    });
    res.json(piezas);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener piezas del componente', error: err.message });
  }
};

// Actualizar la cantidad de una pieza en un componente
const updatePiezaComponente = async (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;

  if (cantidad <= 0) {
    return res.status(400).json({ message: 'La cantidad debe ser mayor a 0' });
  }

  try {
    const relacion = await prisma.piezaComponente.update({
      where: { id: Number(id) },
      data: { cantidad }
    });
    res.json(relacion);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar cantidad', error: err.message });
  }
};

// Eliminar una pieza de un componente
const deletePiezaComponente = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.piezaComponente.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Relación eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar relación', error: err.message });
  }
};

module.exports = {
  addPiezaToComponente,
  getPiezasByComponente,
  updatePiezaComponente,
  deletePiezaComponente
};