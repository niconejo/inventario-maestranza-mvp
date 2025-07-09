import api from './api';

// Obtener piezas de un componente
export const getPiezasDeComponente = async (componenteId) => {
  const response = await api.get(`/piezas-componentes/${componenteId}`);
  return response.data;
};

// Agregar pieza al componente
export const agregarPiezaAComponente = async (relacion) => {
  const response = await api.post('/piezas-componentes', relacion);
  return response.data;
};

// Actualizar cantidad de una pieza en el componente
export const actualizarCantidadPieza = async (id, cantidad) => {
  const response = await api.put(`/piezas-componentes/${id}`, { cantidad });
  return response.data;
};

// Eliminar relación pieza-componente
export const eliminarRelacionPieza = async (id) => {
  const response = await api.delete(`/piezas-componentes/${id}`);
  return response.data;
};
