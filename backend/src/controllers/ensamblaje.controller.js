const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ensamblarComponente = async (req, res) => {
  const { componenteId, cantidad } = req.body;

  if (cantidad <= 0) {
    return res.status(400).json({ message: 'La cantidad a ensamblar debe ser mayor a 0' });
  }

  try {
    // 1. Obtener piezas del kit
    const piezasRequeridas = await prisma.piezaComponente.findMany({
      where: { componenteId },
      include: { pieza: true }
    });

    if (piezasRequeridas.length === 0) {
      return res.status(400).json({ message: 'Este componente no tiene piezas asignadas' });
    }

    // 2. Verificar stock
    const faltantes = piezasRequeridas.filter(relacion => {
      const totalNecesario = relacion.cantidad * cantidad;
      return relacion.pieza.cantidad < totalNecesario;
    });

    if (faltantes.length > 0) {
      const detalleFaltantes = faltantes.map(relacion => ({
        pieza: relacion.pieza.nombre,
        stockActual: relacion.pieza.cantidad,
        requerido: relacion.cantidad * cantidad
      }));

      return res.status(400).json({
        message: 'Stock insuficiente en algunas piezas',
        detalleFaltantes
      });
    }

    // 3. Descontar piezas (ensamblaje)
    for (const relacion of piezasRequeridas) {
      const totalDescontar = relacion.cantidad * cantidad;
      await prisma.pieza.update({
        where: { id: relacion.piezaId },
        data: {
          cantidad: { decrement: totalDescontar }
        }
      });
    }
    // Sumar la cantidad ensamblada al stock del kit
    await prisma.componente.update({
      where: { id: componenteId },
      data: {
      cantidad: { increment: cantidad }
      }
    });
    res.json({ message: `Ensamblaje exitoso de ${cantidad} unidad(es) del componente.` });

  } catch (err) {
    res.status(500).json({ message: 'Error en el proceso de ensamblaje', error: err.message });
  }
};

module.exports = { ensamblarComponente };