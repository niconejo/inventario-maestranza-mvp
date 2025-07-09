import api from './api';

// Ejecutar el ensamblaje del kit
export const ensamblarComponente = async (componenteId, cantidad) => {
  const response = await api.post('/ensamblaje', { componenteId, cantidad });
  return response.data;
};
