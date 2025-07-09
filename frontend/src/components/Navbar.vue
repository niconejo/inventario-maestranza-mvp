<template>
  <nav>
    <ul>
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li><router-link to="/piezas">Piezas</router-link></li>
      <li><router-link to="/componentes">Componentes</router-link></li>
      <li><router-link to="/asignar-piezas">Asignar piezas(Kits)</router-link></li>
      <li><router-link to="/ensamblaje">Ensamblaje</router-link></li>
      <li><button @click="logout">Cerrar Sesión</button></li>
    </ul>
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

<style scoped>
nav {
  background-color: #333;
  padding: 1rem;
}
ul {
  display: flex;
  list-style: none;
  gap: 1rem;
}
a {
  color: white;
  text-decoration: none;
}
button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
