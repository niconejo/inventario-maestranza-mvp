<template>
  <Navbar />
  <div class="container mt-4">
    <h1 class="mb-4">Gestión de Piezas</h1>
    <!-- ✅ Alerta -->
    <Alerta :mensaje="alertaMensaje" :tipo="alertaTipo" :mostrar="alertaVisible" />
    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">{{ modoEdicion ? 'Editar Pieza' : 'Agregar Nueva Pieza' }}</h5>
        <form @submit.prevent="guardarPieza">
          <div class="mb-3">
            <label class="form-label">Nombre:</label>
            <input v-model="nuevaPieza.nombre" class="form-control" placeholder="Nombre" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Descripción:</label>
            <input v-model="nuevaPieza.descripcion" class="form-control" placeholder="Descripción" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Número de Serie:</label>
            <input v-model="nuevaPieza.numeroSerie" class="form-control" placeholder="Número de Serie" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Ubicación:</label>
            <input v-model="nuevaPieza.ubicacion" class="form-control" placeholder="Ubicación" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Cantidad:</label>
            <input v-model.number="nuevaPieza.cantidad" type="number" min="0" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Stock Mínimo:</label>
            <input v-model.number="nuevaPieza.stockMinimo" type="number" min="0" class="form-control" required />
          </div>
          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-success">
              {{ modoEdicion ? 'Actualizar Pieza' : 'Agregar Pieza' }}
            </button>
            <button v-if="modoEdicion" type="button" @click="cancelarEdicion" class="btn btn-secondary">
              Cancelar Edición
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Listado de piezas -->
    <h2>Listado de Piezas</h2>
    <ul class="list-group">
      <li v-for="pieza in piezas" :key="pieza.id" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>{{ pieza.nombre }}</strong> — Cantidad: {{ pieza.cantidad }}
        </div>
        <div class="btn-group gap-2">
          <button @click="editarPieza(pieza)" class="btn btn-sm btn-outline-primary">Editar</button>
          <button @click="eliminarPieza(pieza.id)" class="btn btn-sm btn-outline-danger">Eliminar</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '../components/Navbar.vue';
import { getPiezas, createPieza, updatePieza, deletePieza } from '../api/piezas';
import Alerta from '../components/Alerta.vue';
const piezas = ref([]);
const nuevaPieza = ref({
  nombre: '',
  descripcion: '',
  numeroSerie: '',
  ubicacion: '',
  cantidad: null,
  stockMinimo: null
});
const modoEdicion = ref(false);
const piezaEditandoId = ref(null);

// ✅ Nuevo estado para alertas
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

const cargarPiezas = async () => {
  piezas.value = await getPiezas();
};

const guardarPieza = async () => {
  if (modoEdicion.value) {
    await updatePieza(piezaEditandoId.value, nuevaPieza.value);
    mostrarAlerta('Pieza actualizada exitosamente');
  } else {
    await createPieza(nuevaPieza.value);
    mostrarAlerta('Pieza agregada exitosamente');
  }
  limpiarFormulario();
  await cargarPiezas();
};

const editarPieza = (pieza) => {
  modoEdicion.value = true;
  piezaEditandoId.value = pieza.id;
  nuevaPieza.value = { ...pieza };
};

const cancelarEdicion = () => {
  limpiarFormulario();
};

const eliminarPieza = async (id) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta pieza?')) {
    await deletePieza(id);
    mostrarAlerta('Pieza eliminada exitosamente', 'danger');
    await cargarPiezas();
  }
};

const limpiarFormulario = () => {
  modoEdicion.value = false;
  piezaEditandoId.value = null;
  nuevaPieza.value = {
    nombre: '',
    descripcion: '',
    numeroSerie: '',
    ubicacion: '',
    cantidad: null,
    stockMinimo: null
  };
};

onMounted(() => {
  cargarPiezas();
});
</script>