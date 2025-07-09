const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los componentes
const getAllComponentes = async (req, res) => {
  try {
    const componentes = await prisma.componente.findMany();
    res.json(componentes);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener componentes', error: err.message });
  }
};

// Crear un componente
const createComponente = async (req, res) => {
  const { nombre, descripcion, ubicacion, cantidad } = req.body;

  if (!nombre || nombre.length < 3 || nombre.length > 100) {
    return res.status(400).json({ message: 'El nombre debe tener entre 3 y 100 caracteres' });
  }

  if (!descripcion || descripcion.length > 255) {
    return res.status(400).json({ message: 'La descripción es obligatoria y debe tener máximo 255 caracteres' });
  }

  if (!ubicacion || ubicacion.length < 2 || ubicacion.length > 100) {
    return res.status(400).json({ message: 'La ubicación debe tener entre 2 y 100 caracteres' });
  }

  if (cantidad == null || cantidad < 0) {
    return res.status(400).json({ message: 'La cantidad debe ser un número mayor o igual a 0' });
  }

  try {
    const componente = await prisma.componente.create({
      data: { nombre, descripcion, ubicacion, cantidad }
    });
    res.status(201).json(componente);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear componente', error: err.message });
  }
};

// Actualizar componente
const updateComponente = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, ubicacion, cantidad } = req.body;

  if (!nombre || nombre.length < 3 || nombre.length > 100) {
    return res.status(400).json({ message: 'El nombre debe tener entre 3 y 100 caracteres' });
  }

  if (!descripcion || descripcion.length > 255) {
    return res.status(400).json({ message: 'La descripción es obligatoria y debe tener máximo 255 caracteres' });
  }

  if (!ubicacion || ubicacion.length < 2 || ubicacion.length > 100) {
    return res.status(400).json({ message: 'La ubicación debe tener entre 2 y 100 caracteres' });
  }

  if (cantidad == null || cantidad < 0) {
    return res.status(400).json({ message: 'La cantidad debe ser un número mayor o igual a 0' });
  }

  try {
    const componente = await prisma.componente.update({
      where: { id: Number(id) },
      data: { nombre, descripcion, ubicacion, cantidad }
    });
    res.json(componente);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar componente', error: err.message });
  }
};

// Eliminar componente
const deleteComponente = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.componente.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Componente eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar componente', error: err.message });
  }
};

module.exports = {
  getAllComponentes,
  createComponente,
  updateComponente,
  deleteComponente
};
