<template>
  <div>
    <nav class="w-full">
      <div class="flex items-center justify-between md:flex-row">
        <div class="w-full md:w-1/2">
          <router-link to="/">
            <img src="../../public/img/banderacihile.jpg" class="w-full h-24" alt="Bandera de Chile">
          </router-link>
        </div>
        <div class="w-full md:w-1/2">
          <router-link to="/">
            <img src="../../public/img/servel.jpg" class="w-full h-24" alt="Servel">
          </router-link>
        </div>
      </div>
    </nav>

    <h1 class="mb-4 text-3xl font-extrabold text-center text-gray-900 md:text-5xl lg:text-6xl animate__animated animate__fadeInLeft">
      <span class="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-red-500 animate__animated animate__fadeInLeft">Elecciones Regionales</span> y Municipales 2024 Linares
    </h1>

    <!-- Selección de tipo de elección -->
    <div class="mt-4 text-center">
      <label for="tipoEleccion" class="text-lg font-semibold">Selecciona el tipo de elección:</label>
      <select 
        id="tipoEleccion" 
        v-model="tipoEleccionSeleccionada" 
        @change="filterByElectionType(tipoEleccionSeleccionada)" 
        class="px-4 py-2 mt-2 text-lg font-semibold border rounded-lg"
      >
        <option value="" disabled selected>¿Qué tipo de elección te interesa?...</option>
        <option value="GOBERNADOR REGIONAL">Candidaturas a Gobernador</option>
        <option value="ALCALDE">Candidaturas a Alcalde</option>
        <option value="CONCEJAL">Candidaturas a Concejal</option>
        <option value="CONSEJERO REGIONAL">Candidaturas a Consejero Regional</option>
      </select>
    </div>

    <!-- Sección de candidatos -->
    <div v-if="filteredData.length > 0">
      <div class="grid grid-cols-2 gap-6 mt-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div class="w-full p-4 bg-white border rounded-lg shadow-md" v-for="(item, index) in filteredData" :key="index">
          <div v-if="item.img" class="mb-4">
            <img :src="item.img" alt="Imagen del candidato" class="object-cover w-full h-48 rounded-lg candidate-image" />
          </div>
          <div class="flex flex-col items-start mb-4">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ item.Nombre }} {{ item['Primer  Apellido'] }} {{ item['Segundo  Apellido'] }}</h5>
            <p class="font-bold text-red-500">{{ item['Tipo  Eleccion'] }}</p>
          </div>
          <div class="flex items-center justify-between">
            <img :src="item.partido" alt="indep" class="object-cover w-10 h-10 rounded-full" />
            <button @click="showModal(item)" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Conocer
            </button>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <Modal v-if="showModalFlag" :item="selectedItem" :isOpen="showModalFlag" @close="closeModal"></Modal>
    </div>

    <!-- Mensaje cuando no hay datos -->
    <div v-else>
      <p class="font-bold text-center text-gray-500">No hay datos que coincidan con el filtro.</p>
    </div>

   <div class="flex w-full gap-2 mt-5 text-center">
  
  <router-link to="/voto" class="w-full">
    <button type="button" class="w-full px-6 py-3 mb-2 text-sm font-bold text-center text-white rounded-lg shadow-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80">
      Votar
    </button>
  </router-link>

  <button 
    type="button" 
    class="w-full px-6 py-3 mb-2 text-sm font-bold text-center text-white rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80"
    @click="mostrarComentarios = !mostrarComentarios"
  >
    Apoyo
  </button>
</div>


    <!-- Mostrar componente de comentarios si se selecciona "Apoyo" -->
    <comentarios v-if="mostrarComentarios" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Modal from '../components/modal.vue';
import comentarios from '../components/comentarios.vue'; 
import 'animate.css';

// Definir variables reactivas
const data = ref(null);
const filteredData = ref([]);
const selectedItem = ref(null);
const showModalFlag = ref(false);
const tipoEleccionSeleccionada = ref(""); 
const mostrarComentarios = ref(false); 

// Cargar datos al montar el componente
onMounted(async () => {
  try {
    const response = await fetch('/elecciones.json');
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }
    data.value = await response.json();
  } catch (error) {
    console.error(error);
    alert('Hubo un problema al cargar los datos de elecciones. Intenta de nuevo más tarde.');
  }
});

// Filtrar por tipo de elección
function filterByElectionType(type) {
  filteredData.value = data.value.filter(item => item['Tipo  Eleccion'] === type);
}

// Mostrar modal
function showModal(item) {
  selectedItem.value = item;
  showModalFlag.value = true;
}

// Cerrar modal
function closeModal() {
  showModalFlag.value = false;
}
</script>

<style>

</style>
