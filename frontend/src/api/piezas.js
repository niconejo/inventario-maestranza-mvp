import api from './api';

// Obtener todas las piezas
export const getPiezas = async () => {
  const response = await api.get('/piezas');
  return response.data;
};

// Crear una nueva pieza
export const createPieza = async (piezaData) => {
  const response = await api.post('/piezas', piezaData);
  return response.data;
};

// Actualizar pieza existente
export const updatePieza = async (id, piezaData) => {
  const response = await api.put(`/piezas/${id}`, piezaData);
  return response.data;
};

// Eliminar pieza
export const deletePieza = async (id) => {
  const response = await api.delete(`/piezas/${id}`);
  return response.data;
};