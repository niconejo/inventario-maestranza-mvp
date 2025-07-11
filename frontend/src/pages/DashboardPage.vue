<template>
  <Navbar />
  <div class="container mt-4">
    <div class="card shadow p-4">
      <h1 class="mb-4 text-center">Bienvenido al Sistema de Inventario</h1>
      <p class="lead text-center">
        Aquí podrás gestionar todas las piezas, componentes (kits) y realizar ensamblajes de forma rápida y segura.
      </p>

      <!-- Accesos Rápidos -->
      <div class="row mt-4">
        <div class="col-md-4 mb-3" v-for="(acceso, index) in accesos" :key="index">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <h5 class="card-title">{{ acceso.titulo }}</h5>
              <p class="card-text">{{ acceso.descripcion }}</p>
              <router-link :to="acceso.ruta" class="btn btn-outline-primary">Ir a {{ acceso.nombre }}</router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Alerta de Stock Bajo -->
      <Alerta :mensaje="alertaMensaje" :tipo="alertaTipo" :mostrar="alertaVisible" />

      <!-- Lista de Piezas en Stock Bajo -->
      <div v-if="piezasBajoStock.length > 0" class="mt-3">
        <h5>Piezas en Stock Bajo:</h5>
        <ul>
          <li v-for="pieza in piezasBajoStock" :key="pieza.id">
            {{ pieza.nombre }} — Stock actual: {{ pieza.cantidad }} / Mínimo: {{ pieza.stockMinimo }}
          </li>
        </ul>
      </div>

      <!-- Resumen Total -->
      <div class="row mt-5 mb-5">
        <div class="col-md-6 text-center">
          <h4>Total de Piezas</h4>
          <p class="fs-3 fw-bold">{{ totalPiezas }}</p>
        </div>
        <div class="col-md-6 text-center">
          <h4>Total de Componentes</h4>
          <p class="fs-3 fw-bold">{{ totalComponentes }}</p>
        </div>
      </div>

      <!-- Carrusel de Piezas -->
      <h5 class="mb-3">Piezas Registradas</h5>
      <div class="d-flex overflow-auto gap-3 mb-5 pb-2">
        <div v-for="pieza in piezas" :key="pieza.id" class="card shadow-sm text-center p-3" style="min-width: 200px;">
          <div class="mb-2">
            <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto" style="width: 50px; height: 50px;">
              🛠️
            </div>
          </div>
          <h6 class="mb-1">{{ pieza.nombre }}</h6>
          <p class="mb-0">Cantidad: {{ pieza.cantidad }}</p>
        </div>
      </div>

      <!-- Carrusel de Componentes -->
      <h5 class="mb-3">Componentes Registrados</h5>
      <div class="d-flex overflow-auto gap-3 pb-2">
        <div v-for="componente in componentes" :key="componente.id" class="card shadow-sm text-center p-3" style="min-width: 200px;">
          <div class="mb-2">
            <div class="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center mx-auto" style="width: 50px; height: 50px;">
              📦
            </div>
          </div>
          <h6 class="mb-1">{{ componente.nombre }}</h6>
          <p class="mb-0">Cantidad: {{ componente.cantidad }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import Alerta from '../components/Alerta.vue';
import { ref, onMounted } from 'vue';
import { getPiezas } from '../api/piezas';
import { getComponentes } from '../api/componentes';

const piezas = ref([]);
const componentes = ref([]);
const totalPiezas = ref(0);
const totalComponentes = ref(0);
const piezasBajoStock = ref([]);
const margenSeguridad = 2;
const alertaMensaje = ref('');
const alertaTipo = ref('warning');
const alertaVisible = ref(false);

const accesos = [
  { titulo: 'Gestión de Piezas', descripcion: 'Crea, edita y controla el stock de piezas individuales.', ruta: '/piezas', nombre: 'Piezas' },
  { titulo: 'Gestión de Componentes', descripcion: 'Administra kits y asigna piezas a cada uno de ellos.', ruta: '/componentes', nombre: 'Componentes' },
  { titulo: 'Ensamblaje', descripcion: 'Ensamble kits y controle la disponibilidad del inventario.', ruta: '/ensamblaje', nombre: 'Ensamblaje' }
];

const cargarResumen = async () => {
  piezas.value = await getPiezas();
  componentes.value = await getComponentes();
  totalPiezas.value = piezas.value.length;
  totalComponentes.value = componentes.value.length;

  // Detectar piezas en stock bajo o cercanas al mínimo
  piezasBajoStock.value = piezas.value.filter(
    p => p.cantidad <= p.stockMinimo + margenSeguridad
  );

  if (piezasBajoStock.value.length > 0) {
    alertaMensaje.value = `⚠️ ${piezasBajoStock.value.length} pieza(s) en stock bajo o cerca del mínimo`;
    alertaVisible.value = true;
  } else {
    alertaVisible.value = false;
  }
};

onMounted(cargarResumen);
</script>
