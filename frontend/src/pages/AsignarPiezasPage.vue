<template>
  <Navbar />
  <h1>Asignar Piezas a Componentes (Kits)</h1>

  <!-- Seleccionar componente -->
  <div>
    <label>Selecciona un Componente:</label>
    <select v-model="componenteSeleccionadoId" @change="cargarPiezasAsignadas">
      <option disabled value="">-- Selecciona --</option>
      <option v-for="componente in componentes" :key="componente.id" :value="componente.id">
        {{ componente.nombre }}
      </option>
    </select>
  </div>

  <!-- Asignar nueva pieza al componente -->
  <div v-if="componenteSeleccionadoId">
    <h2>Agregar Pieza al Componente</h2>
    <form @submit.prevent="agregarPieza">
      <select v-model="nuevaRelacion.piezaId" required>
        <option disabled value="">-- Selecciona una pieza --</option>
        <option v-for="pieza in piezas" :key="pieza.id" :value="pieza.id">
          {{ pieza.nombre }}
        </option>
      </select>
      <input v-model.number="nuevaRelacion.cantidad" type="number" min="1" placeholder="Cantidad" required />
      <button type="submit">Agregar</button>
    </form>

    <!-- Piezas asignadas al componente -->
    <h2>Piezas Asignadas</h2>
    <ul>
      <li v-for="relacion in piezasAsignadas" :key="relacion.id">
        {{ relacion.pieza.nombre }} — Cantidad: {{ relacion.cantidad }}
        <button @click="editarCantidad(relacion)">Editar Cantidad</button>
        <button @click="eliminarRelacion(relacion.id)">Eliminar</button>
      </li>
    </ul>
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
