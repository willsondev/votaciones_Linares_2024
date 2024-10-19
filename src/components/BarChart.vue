<template>
  <div>
    <!-- Selector para elegir el tipo de elección -->
    <select v-model="tipoEleccion" @change="filtrarCandidatos">
      <option value="todos">Todos</option>
      <option value="GOBERNADOR REGIONAL">GOBERNADOR REGIONAL</option>
      <option value="ALCALDE">ALCALDE</option>
      <option value="CONCEJAL">CONCEJAL</option>
      <option value="CONSEJERO REGIONAL">CONSEJERO REGIONAL</option>
      
    </select>

    <canvas ref="barChartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import { firestore } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

// Registrar los componentes de Chart.js
Chart.register(...registerables);

const barChartCanvas = ref(null);
let barChart = null;
const candidatos = ref([]); 
const tipoEleccion = ref('todos'); 

// Definir un conjunto de colores
const coloresDisponibles = [
  'rgba(255, 99, 132, 0.6)', 
  'rgba(54, 162, 235, 0.6)', 
  'rgba(255, 206, 86, 0.6)', 
  'rgba(75, 192, 192, 0.6)', 
  'rgba(153, 102, 255, 0.6)', 
  'rgba(255, 159, 64, 0.6)', 
  'rgba(200, 200, 200, 0.6)', 

];

// Función para renderizar el gráfico
const renderChart = (chartData) => {
  if (!barChartCanvas.value) {
    console.error("El canvas no está disponible");
    return;
  }

  if (barChart) {
    barChart.destroy();
  }

  barChart = new Chart(barChartCanvas.value, {
    type: 'bar',
    data: chartData,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

// Función para escuchar cambios en Firestore
const escucharCambiosEnCandidatos = () => {
  const candidatosRef = collection(firestore, 'candidatos');
  onSnapshot(candidatosRef, (snapshot) => {
    const nuevosCandidatos = [];
    snapshot.forEach((doc) => {
      nuevosCandidatos.push(doc.data());
    });

    candidatos.value = nuevosCandidatos; 
    filtrarCandidatos();
  });
};

// Función para filtrar candidatos según el tipo de elección
const filtrarCandidatos = () => {
  let candidatosFiltrados;

  if (tipoEleccion.value === 'todos') {
    candidatosFiltrados = candidatos.value; 
  } else {
    candidatosFiltrados = candidatos.value.filter(candidato => candidato.TipoEleccion === tipoEleccion.value);
  }

  // Acumular votos por candidato
  const votosAcumulados = {};
  candidatosFiltrados.forEach(candidato => {
    const nombreCompleto = `${candidato.Nombre} ${candidato.PrimerApellido}`;
    if (votosAcumulados[nombreCompleto]) {
      votosAcumulados[nombreCompleto] += candidato.NVoto; 
    } else {
      votosAcumulados[nombreCompleto] = candidato.NVoto; 
    }
  });

 
  const nombres = Object.keys(votosAcumulados);
  const votos = Object.values(votosAcumulados);

  
  const colores = nombres.map((_, index) => coloresDisponibles[index % coloresDisponibles.length]);

  // Asegurarse de que el objeto chartData esté correctamente estructurado
  const chartData = {
    labels: nombres,
    datasets: [
      {
        label: 'Número de Votos',
        data: votos,
        backgroundColor: colores, 
        borderColor: colores.map(color => color.replace(/0\.6\)$/, '1')), 
        borderWidth: 1, 
      } 
    ] 
  };

  renderChart(chartData); 
};

onMounted(() => {
  escucharCambiosEnCandidatos();
});
</script>
