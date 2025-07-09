import api from './api';

// Obtener todos los componentes
export const getComponentes = async () => {
  const response = await api.get('/componentes');
  return response.data;
};

// Crear nuevo componente
export const createComponente = async (componenteData) => {
  const response = await api.post('/componentes', componenteData);
  return response.data;
};

// Actualizar componente existente
export const updateComponente = async (id, componenteData) => {
  const response = await api.put(`/componentes/${id}`, componenteData);
  return response.data;
};

// Eliminar componente
export const deleteComponente = async (id) => {
  const response = await api.delete(`/componentes/${id}`);
  return response.data;
};
