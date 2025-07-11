<template>
  <div v-if="visible" class="alert" :class="'alert-' + tipo" role="alert">
    {{ mensaje }}
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  mensaje: String,
  tipo: {
    type: String,
    default: 'success'
  },
  mostrar: {
    type: Boolean,
    default: false
  }
});

const visible = ref(props.mostrar);

watch(() => props.mostrar, (nuevo) => {
  visible.value = nuevo;
});
</script>
