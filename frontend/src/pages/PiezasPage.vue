<template>
  <Navbar />
  <h1>Gestión de Piezas</h1>

  <!-- Formulario (Crear/Editar) -->
  <form @submit.prevent="guardarPieza">
    <div>
      <label>Nombre:</label>
      <input v-model="nuevaPieza.nombre" placeholder="Nombre" required />
    </div>
    <div>
      <label>Descripción:</label>
      <input v-model="nuevaPieza.descripcion" placeholder="Descripción" required />
    </div>
    <div>
      <label>Número de Serie:</label>
      <input v-model="nuevaPieza.numeroSerie" placeholder="Número de Serie" required />
    </div>
    <div>
      <label>Ubicación:</label>
      <input v-model="nuevaPieza.ubicacion" placeholder="Ubicación" required />
    </div>
    <div>
      <label>Cantidad:</label>
      <input v-model.number="nuevaPieza.cantidad" type="number" min="0" required />
    </div>
    <div>
      <label>Stock Mínimo:</label>
      <input v-model.number="nuevaPieza.stockMinimo" type="number" min="0" required />
    </div>
    <button type="submit">
      {{ modoEdicion ? 'Actualizar Pieza' : 'Agregar Pieza' }}
    </button>
    <button v-if="modoEdicion" type="button" @click="cancelarEdicion">Cancelar Edición</button>
  </form>

  <hr />

  <!-- Listado de piezas -->
  <h2>Listado de Piezas</h2>
  <ul>
    <li v-for="pieza in piezas" :key="pieza.id">
      {{ pieza.nombre }} — Cantidad: {{ pieza.cantidad }}
      <button @click="editarPieza(pieza)">Editar</button>
      <button @click="eliminarPieza(pieza.id)">Eliminar</button>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '../components/Navbar.vue';
import { getPiezas, createPieza, updatePieza, deletePieza } from '../api/piezas';

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

const cargarPiezas = async () => {
  piezas.value = await getPiezas();
};

const guardarPieza = async () => {
  if (modoEdicion.value) {
    await updatePieza(piezaEditandoId.value, nuevaPieza.value);
  } else {
    await createPieza(nuevaPieza.value);
  }
  limpiarFormulario();
  await cargarPiezas();
};

const editarPieza = (pieza) => {
  modoEdicion.value = true;
  piezaEditandoId.value = pieza.id;
  nuevaPieza.value = { ...pieza }; // Clonamos para editar
};

const cancelarEdicion = () => {
  limpiarFormulario();
};

const eliminarPieza = async (id) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta pieza?')) {
    await deletePieza(id);
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

// Cargar al iniciar
onMounted(() => {
  cargarPiezas();
});
</script>
