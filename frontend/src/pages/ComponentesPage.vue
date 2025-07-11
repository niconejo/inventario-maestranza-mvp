<template>
  <Navbar />
  <div class="container mt-4">
    <h1 class="mb-4">Gestión de Componentes (Kits)</h1>
    <Alerta :mensaje="alertaMensaje" :tipo="alertaTipo" :mostrar="alertaVisible" />

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
        <div class="btn-group gap-2">
          <button @click="editarComponente(componente)" class="btn btn-sm btn-outline-primary">Editar</button>
          <button @click="eliminarComponente(componente.id)" class="btn btn-sm btn-outline-danger">Eliminar</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import Alerta from '../components/Alerta.vue';
import { ref, onMounted } from 'vue';
import Navbar from '../components/Navbar.vue';
import { getComponentes, createComponente, updateComponente, deleteComponente } from '../api/componentes';
const alertaMensaje = ref('');
const alertaTipo = ref('success');
const alertaVisible = ref(false);

const mostrarAlerta = (mensaje, tipo = 'success') => {
  alertaMensaje.value = mensaje;
  alertaTipo.value = tipo;
  alertaVisible.value = true;
  setTimeout(() => {
    alertaVisible.value = false;
  }, 3000);
};

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
    mostrarAlerta('Componente actualizado exitosamente');
  } else {
    await createComponente(nuevoComponente.value);
    mostrarAlerta('Componente agregado exitosamente');
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
  if (confirm('¿Estás seguro de eliminar este componente?')) {
    await deleteComponente(id);
    mostrarAlerta('Componente eliminado exitosamente', 'danger');
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
