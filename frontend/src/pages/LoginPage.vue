<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow" style="min-width: 350px;">
      <h2 class="mb-4 text-center">Iniciar Sesión</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label">Usuario:</label>
          <input v-model="username" type="text" class="form-control" placeholder="Usuario" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Contraseña:</label>
          <input v-model="password" type="password" class="form-control" placeholder="Contraseña" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Ingresar</button>
      </form>
      <p v-if="error" class="text-danger mt-3 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../api/auth';

const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const { token } = await login(username.value, password.value);
    localStorage.setItem('token', token);
    router.push('/dashboard');
  } catch (err) {
    error.value = 'Credenciales incorrectas o error en el servidor.';
  }
};
</script>
