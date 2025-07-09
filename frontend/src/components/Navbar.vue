<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Inventario Maestranza</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/piezas" class="nav-link">Piezas</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/componentes" class="nav-link">Componentes</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/asignar-piezas" class="nav-link">Asignar piezas (Kits)</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/ensamblaje" class="nav-link">Ensamblaje</router-link>
          </li>
        </ul>
        <button class="btn btn-outline-light" @click="logout">Cerrar sesión</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};
</script>
