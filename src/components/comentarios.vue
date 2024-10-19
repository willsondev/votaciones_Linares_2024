<template>
  <div class="mt-4">
    <h2 class="text-lg font-semibold">Deja tu comentario:</h2>
    <textarea
      v-model="nuevoComentario"
      placeholder="Escribe un comentario..."
      class="w-full p-2 border rounded-lg"
      rows="4"
    ></textarea>
    <button
      @click="agregarComentario"
      class="px-4 py-2 mt-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
    >
      Comentar
    </button>

    <!-- Selector de Emojis -->
    <div class="mt-2">
      <span
        v-for="emoji in emojis"
        :key="emoji"
        @click="agregarEmoji(emoji)"
        class="text-xl cursor-pointer"
      >
        {{ emoji }}
      </span>
    </div>

    <div class="mt-4 bg-white rounded-lg shadow-md">
      <h3 class="text-lg font-semibold text-center">Comentarios:</h3>
      <div 
        v-if="comentarios.length === 0" 
        class="p-4 text-center text-gray-500"
      >
        No hay comentarios aún.
      </div>
      <ul class="overflow-y-auto border-t max-h-60">
        <li 
          v-for="(comentario, index) in comentarios" 
          :key="index" 
          class="p-2 border-b"
        >
          <div>
            <strong>{{ comentario.texto }}</strong>
          </div>
          <div class="text-sm text-gray-500">
            {{ comentario.fechaHora }} <!-- Mostrar fecha y hora -->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { firestore } from '../firebase'; // Cambiado a 'firestore'
import { collection, addDoc, getDocs } from 'firebase/firestore'; // Importa funciones de Firestore

// Definir variables reactivas
const nuevoComentario = ref('');
const comentarios = ref([]);

// Conjunto de emojis
const emojis = ['😀', '😂', '😍', '😢', '😡', '👍', '🎉', '🌟','❤️','😎','🤗','😭','🤫','🤡','😮'];

// Referencia a la colección de comentarios en Firestore
const comentariosCollection = collection(firestore, 'comentarios'); // Cambiado a 'firestore'

// Función para cargar los comentarios desde Firestore
async function cargarComentarios() {
  const snapshot = await getDocs(comentariosCollection);
  comentarios.value = snapshot.docs.map(doc => ({
    texto: doc.data().texto,
    fechaHora: doc.data().fechaHora // Agregar la fecha y hora
  }));
  comentarios.value.sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora)); // Ordenar por fecha y hora, mostrando los más recientes primero
}

// Función para agregar un nuevo comentario
async function agregarComentario() {
  if (nuevoComentario.value.trim() !== '') {
    const fechaHora = new Date().toLocaleString(); // Obtener la fecha y hora actual
    // Agregar comentario a Firestore con la fecha y hora
    await addDoc(comentariosCollection, {
      texto: nuevoComentario.value.trim(),
      fechaHora: fechaHora // Agregar fecha y hora
    });
    nuevoComentario.value = ''; // Limpiar el campo después de agregar
    await cargarComentarios(); // Recargar comentarios
  }
}

// Agregar evento de carga al montar el componente
onMounted(() => {
  cargarComentarios();
});

// Función para agregar emoji al comentario
function agregarEmoji(emoji) {
  nuevoComentario.value += emoji; // Agregar el emoji al comentario
}
</script>

<style scoped>
/* Si es necesario agregar estilos adicionales, hazlo aquí */
</style>
