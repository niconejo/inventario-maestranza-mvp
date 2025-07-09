<template>
  <Navbar />
  <div class="container mt-4">
    <h1 class="mb-4">Ensamblaje de Componentes (Kits)</h1>

    <div class="card mb-4">
      <div class="card-body">
        <form @submit.prevent="ensamblar">
          <div class="mb-3">
            <label class="form-label">Selecciona un Componente:</label>
            <select v-model="componenteSeleccionadoId" class="form-select" required>
              <option disabled value="">-- Selecciona --</option>
              <option v-for="componente in componentes" :key="componente.id" :value="componente.id">
                {{ componente.nombre }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Cantidad a Ensamblar:</label>
            <input v-model.number="cantidadAEnsamblar" type="number" min="1" class="form-control" required />
          </div>

          <button type="submit" class="btn btn-primary w-100">Ensamblar</button>
        </form>
      </div>
    </div>

    <div v-if="mensaje" class="alert alert-info mt-4">
      {{ mensaje }}
    </div>

    <div v-if="errores.length > 0" class="alert alert-danger mt-4">
      <h4 class="alert-heading">Errores de Stock Insuficiente:</h4>
      <ul class="mb-0">
        <li v-for="error in errores" :key="error.pieza">
          {{ error.pieza }}: Stock actual {{ error.stockActual }}, Requerido {{ error.requerido }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '../components/Navbar.vue';
import { getComponentes } from '../api/componentes';
import { ensamblarComponente } from '../api/ensamblaje';

const componentes = ref([]);
const componenteSeleccionadoId = ref('');
const cantidadAEnsamblar = ref(1);
const mensaje = ref('');
const errores = ref([]);

const cargarComponentes = async () => {
  componentes.value = await getComponentes();
};

const ensamblar = async () => {
  mensaje.value = '';
  errores.value = [];

  try {
    const resultado = await ensamblarComponente(componenteSeleccionadoId.value, cantidadAEnsamblar.value);
    mensaje.value = resultado.message;
    cantidadAEnsamblar.value = 1; // Reiniciar cantidad
  } catch (err) {
    if (err.response && err.response.data && err.response.data.detalleFaltantes) {
      errores.value = err.response.data.detalleFaltantes;
    } else {
      mensaje.value = 'Ocurrió un error al ensamblar el kit.';
    }
  }
};

onMounted(() => {
  cargarComponentes();
});
</script>
