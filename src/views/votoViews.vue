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

    <h1 class="w-full mb-4 text-3xl font-extrabold text-center text-gray-900 md:text-5xl lg:text-6xl animate__animated animate__fadeInLeft">
      <span class="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-red-500 animate__animated animate__fadeInLeft">Vota por tu candidato</span> Preferido
    </h1>
    
    <router-link to="/"> <button class="w-full px-4 py-2 mb-2 text-sm font-bold text-center text-white rounded-lg shadow-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80">volver</button></router-link>
   

    <!-- Selección de tipo de elección con botones estilo select -->
    <div class="mt-4 text-center">
  <label for="tipoEleccion" class="text-lg font-semibold">Selecciona el tipo de elección:</label>
  <select 
    id="tipoEleccion" 
    v-model="tipoEleccionSeleccionada" 
    @change="filterByElectionType(tipoEleccionSeleccionada)" 
    class="px-4 py-2 mt-2 text-lg font-semibold border rounded-lg"
  >
    <option value="" disabled selected hidden>¿Qué tipo de elección te interesa?...</option> 
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
          <div class="flex flex-col items-start mb-4">
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900">{{ item.Nombre }} {{ item['Primer  Apellido'] }} {{ item['Segundo  Apellido'] }}</h5>
            <p class="font-bold text-red-500">{{ item['Tipo  Eleccion'] }}</p>
          </div>
          <div class="flex items-center justify-between">
            <button 
              @click="votar(item)" 
              class="w-full font-bold text-white bg-gradient-to-r from-red-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 rounded-lg text-sm px-19 py-2.5 text-center me-2 mb-2"
            >
              Votar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mensaje cuando no hay datos -->
    <div v-else>
      <p class="font-bold text-center text-gray-500">No hay datos que coincidan con el filtro.</p>
    </div>
  </div>

  <div v-if="filteredData.length > 0">
  <BarChart />
</div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { firestore } from '../firebase'; 
import { doc, setDoc, increment } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'; 
import BarChart from '../components/BarChart.vue'

// Definir variables reactivas
const data = ref([]);
const filteredData = ref([]);
const tipoEleccionSeleccionada = ref('');

// Cargar datos al montar el componente
onMounted(async () => {
  try {
    const response = await fetch('/elecciones.json');
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }
    data.value = await response.json();
    filteredData.value = data.value; 
  } catch (error) {
    console.error(error);
    alert('Hubo un problema al cargar los datos de elecciones. Intenta de nuevo más tarde.');
  }
});

// Filtrar por tipo de elección
function filterByElectionType() {
  const type = tipoEleccionSeleccionada.value;
  filteredData.value = type ? data.value.filter(item => item['Tipo  Eleccion'] === type) : data.value;
}

// Función para votar
const votar = async (candidato) => {
  try {
    const candidatoId = uuidv4(); 
    const candidatoRef = doc(firestore, 'candidatos', candidatoId); 

    // Guardar el candidato en Firestore
    await setDoc(candidatoRef, {
      id: candidatoId, // Guardar el ID
      Nombre: candidato.Nombre,
      PrimerApellido: candidato['Primer  Apellido'],
      SegundoApellido: candidato['Segundo  Apellido'],
      TipoEleccion: candidato['Tipo  Eleccion'],
      NVoto: 1 
    });

    alert(`Gracias por votar por ${candidato.Nombre} ${candidato['Primer Apellido']}`);
  } catch (error) {
    console.error('Error al guardar el voto:', error);
    alert('Hubo un problema al guardar tu voto. Intenta de nuevo más tarde.');
  }
};
</script>

<style>

</style>
