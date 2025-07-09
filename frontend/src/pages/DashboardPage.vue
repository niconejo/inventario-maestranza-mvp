<template>
  <Navbar />
  <div class="container mt-4">
    <div class="card shadow p-4">
      <h1 class="mb-4 text-center">Bienvenido al Sistema de Inventario</h1>
      <p class="lead text-center">
        Aquí podrás gestionar todas las piezas, componentes (kits) y realizar ensamblajes de forma rápida y segura.
      </p>

      <div class="row mt-4">
        <div class="col-md-4 mb-3">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <h5 class="card-title">Gestión de Piezas</h5>
              <p class="card-text">Crea, edita y controla el stock de piezas individuales.</p>
              <router-link to="/piezas" class="btn btn-outline-primary">Ir a Piezas</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <h5 class="card-title">Gestión de Componentes</h5>
              <p class="card-text">Administra kits y asigna piezas a cada uno de ellos.</p>
              <router-link to="/componentes" class="btn btn-outline-primary">Ir a Componentes</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <h5 class="card-title">Ensamblaje</h5>
              <p class="card-text">Ensamble kits y controle la disponibilidad del inventario.</p>
              <router-link to="/ensamblaje" class="btn btn-outline-primary">Ir a Ensamblaje</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import Navbar from '../components/Navbar.vue';
</script>