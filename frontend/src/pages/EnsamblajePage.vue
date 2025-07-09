<template>
  <Navbar />
  <h1>Ensamblaje de Componentes (Kits)</h1>

  <form @submit.prevent="ensamblar">
    <div>
      <label>Selecciona un Componente:</label>
      <select v-model="componenteSeleccionadoId" required>
        <option disabled value="">-- Selecciona --</option>
        <option v-for="componente in componentes" :key="componente.id" :value="componente.id">
          {{ componente.nombre }}
        </option>
      </select>
    </div>

    <div>
      <label>Cantidad a Ensamblar:</label>
      <input v-model.number="cantidadAEnsamblar" type="number" min="1" required />
    </div>

    <button type="submit">Ensamblar</button>
  </form>

  <div v-if="mensaje" style="margin-top: 1rem;">
    <p>{{ mensaje }}</p>
  </div>

  <div v-if="errores.length > 0" style="margin-top: 1rem;">
    <h3>Errores de Stock Insuficiente:</h3>
    <ul>
      <li v-for="error in errores" :key="error.pieza">
        {{ error.pieza }}: Stock actual {{ error.stockActual }}, Requerido {{ error.requerido }}
      </li>
    </ul>
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
