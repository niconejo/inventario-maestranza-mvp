<template>
  <Navbar />
  <div class="container mt-4">
    <h1 class="mb-4">Asignar Piezas a Componentes (Kits)</h1>

    <!-- Seleccionar componente -->
    <div class="mb-4">
      <label class="form-label">Selecciona un Componente:</label>
      <select v-model="componenteSeleccionadoId" @change="cargarPiezasAsignadas" class="form-select" required>
        <option disabled value="">-- Selecciona --</option>
        <option v-for="componente in componentes" :key="componente.id" :value="componente.id">
          {{ componente.nombre }}
        </option>
      </select>
    </div>

    <!-- Asignar nueva pieza al componente -->
    <div v-if="componenteSeleccionadoId">
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title mb-3">Agregar Pieza al Componente</h5>
          <form @submit.prevent="agregarPieza">
            <div class="mb-3">
              <label class="form-label">Selecciona una Pieza:</label>
              <select v-model="nuevaRelacion.piezaId" class="form-select" required>
                <option disabled value="">-- Selecciona una pieza --</option>
                <option v-for="pieza in piezas" :key="pieza.id" :value="pieza.id">
                  {{ pieza.nombre }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Cantidad:</label>
              <input v-model.number="nuevaRelacion.cantidad" type="number" min="1" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-success w-100">Agregar Pieza</button>
          </form>
        </div>
      </div>

      <!-- Piezas asignadas al componente -->
      <h2 class="mb-3">Piezas Asignadas</h2>
      <ul class="list-group">
        <li v-for="relacion in piezasAsignadas" :key="relacion.id" class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>{{ relacion.pieza.nombre }}</strong> — Cantidad: {{ relacion.cantidad }}
          </div>
          <div class="btn-group">
            <button @click="editarCantidad(relacion)" class="btn btn-sm btn-primary">Editar Cantidad</button>
            <button @click="eliminarRelacion(relacion.id)" class="btn btn-sm btn-danger">Eliminar</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '../components/Navbar.vue';
import { getComponentes } from '../api/componentes';
import { getPiezas } from '../api/piezas';
import {
  getPiezasDeComponente,
  agregarPiezaAComponente,
  actualizarCantidadPieza,
  eliminarRelacionPieza
} from '../api/piezasComponentes';

const componentes = ref([]);
const piezas = ref([]);
const componenteSeleccionadoId = ref('');
const piezasAsignadas = ref([]);
const nuevaRelacion = ref({ piezaId: '', cantidad: 1 });

const cargarComponentesYPiezas = async () => {
  componentes.value = await getComponentes();
  piezas.value = await getPiezas();
};

const cargarPiezasAsignadas = async () => {
  if (componenteSeleccionadoId.value) {
    piezasAsignadas.value = await getPiezasDeComponente(componenteSeleccionadoId.value);
  }
};

const agregarPieza = async () => {
  await agregarPiezaAComponente({
    componenteId: componenteSeleccionadoId.value,
    piezaId: nuevaRelacion.value.piezaId,
    cantidad: nuevaRelacion.value.cantidad
  });
  nuevaRelacion.value = { piezaId: '', cantidad: 1 };
  await cargarPiezasAsignadas();
};

const editarCantidad = async (relacion) => {
  const nuevaCantidad = prompt('Nueva cantidad:', relacion.cantidad);
  if (nuevaCantidad !== null && !isNaN(nuevaCantidad) && Number(nuevaCantidad) > 0) {
    await actualizarCantidadPieza(relacion.id, Number(nuevaCantidad));
    await cargarPiezasAsignadas();
  }
};

const eliminarRelacion = async (id) => {
  if (confirm('¿Estás seguro de eliminar esta relación?')) {
    await eliminarRelacionPieza(id);
    await cargarPiezasAsignadas();
  }
};

onMounted(() => {
  cargarComponentesYPiezas();
});
</script>
