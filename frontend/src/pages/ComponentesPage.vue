<template>
  <Navbar />
  <h1>Gestión de Componentes (Kits)</h1>

  <!-- Formulario de Crear/Editar -->
  <form @submit.prevent="guardarComponente">
    <div>
      <label>Nombre:</label>
      <input v-model="nuevoComponente.nombre" placeholder="Nombre" required />
    </div>
    <div>
      <label>Descripción:</label>
      <input v-model="nuevoComponente.descripcion" placeholder="Descripción" required />
    </div>
    <div>
      <label>Ubicación:</label>
      <input v-model="nuevoComponente.ubicacion" placeholder="Ubicación" required />
    </div>
    <div>
      <label>Cantidad (stock actual del kit):</label>
      <input v-model.number="nuevoComponente.cantidad" type="number" min="0" required />
    </div>
    <button type="submit">
      {{ modoEdicion ? 'Actualizar Componente' : 'Agregar Componente' }}
    </button>
    <button v-if="modoEdicion" type="button" @click="cancelarEdicion">Cancelar Edición</button>
  </form>

  <hr />

  <!-- Listado de Componentes -->
  <h2>Listado de Componentes</h2>
  <ul>
    <li v-for="componente in componentes" :key="componente.id">
      {{ componente.nombre }} — Cantidad: {{ componente.cantidad }}
      <button @click="editarComponente(componente)">Editar</button>
      <button @click="eliminarComponente(componente.id)">Eliminar</button>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '../components/Navbar.vue';
import { getComponentes, createComponente, updateComponente, deleteComponente } from '../api/componentes';

const componentes = ref([]);
const nuevoComponente = ref({
  nombre: '',
  descripcion: '',
  ubicacion: '',
  cantidad: null
});
const modoEdicion = ref(false);
const componenteEditandoId = ref(null);

const cargarComponentes = async () => {
  componentes.value = await getComponentes();
};

const guardarComponente = async () => {
  if (modoEdicion.value) {
    await updateComponente(componenteEditandoId.value, nuevoComponente.value);
  } else {
    await createComponente(nuevoComponente.value);
  }
  limpiarFormulario();
  await cargarComponentes();
};

const editarComponente = (componente) => {
  modoEdicion.value = true;
  componenteEditandoId.value = componente.id;
  nuevoComponente.value = { ...componente };
};

const cancelarEdicion = () => {
  limpiarFormulario();
};

const eliminarComponente = async (id) => {
  if (confirm('¿Estás seguro de que quieres eliminar este componente?')) {
    await deleteComponente(id);
    await cargarComponentes();
  }
};

const limpiarFormulario = () => {
  modoEdicion.value = false;
  componenteEditandoId.value = null;
  nuevoComponente.value = {
    nombre: '',
    descripcion: '',
    ubicacion: '',
    cantidad: null
  };
};

onMounted(() => {
  cargarComponentes();
});
</script>
