<template>
  <Navbar />
  <div class="container mt-4">
    <h1 class="mb-4">Gestión de Componentes (Kits)</h1>

    <!-- Formulario de Crear/Editar -->
    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">{{ modoEdicion ? 'Editar Componente' : 'Agregar Nuevo Componente' }}</h5>
        <form @submit.prevent="guardarComponente">
          <div class="mb-3">
            <label class="form-label">Nombre:</label>
            <input v-model="nuevoComponente.nombre" class="form-control" placeholder="Nombre" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Descripción:</label>
            <input v-model="nuevoComponente.descripcion" class="form-control" placeholder="Descripción" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Ubicación:</label>
            <input v-model="nuevoComponente.ubicacion" class="form-control" placeholder="Ubicación" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Cantidad (stock actual del kit):</label>
            <input v-model.number="nuevoComponente.cantidad" type="number" min="0" class="form-control" required />
          </div>
          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-success">
              {{ modoEdicion ? 'Actualizar Componente' : 'Agregar Componente' }}
            </button>
            <button v-if="modoEdicion" type="button" @click="cancelarEdicion" class="btn btn-secondary">
              Cancelar Edición
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Listado de Componentes -->
    <h2 class="mb-3">Listado de Componentes</h2>
    <ul class="list-group">
      <li v-for="componente in componentes" :key="componente.id" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>{{ componente.nombre }}</strong> — Cantidad: {{ componente.cantidad }}
        </div>
        <div class="btn-group">
          <button @click="editarComponente(componente)" class="btn btn-sm btn-primary">Editar</button>
          <button @click="eliminarComponente(componente.id)" class="btn btn-sm btn-danger">Eliminar</button>
        </div>
      </li>
    </ul>
  </div>
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
