<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-lg mx-auto shadow-lg max-h-[80vh] overflow-y-auto">
      <div class="mb-4">
        <slot name="header">
          <h2 class="text-xl font-bold">{{ fullName }}</h2>
        </slot>
      </div>
      <div class="space-y-4">
        <slot name="body">
          <!-- Imagen del candidato -->
          <div v-if="item.img" class="flex justify-center mb-4">
            <img :src="item.img" alt="Imagen del candidato" class="object-cover h-48 rounded-lg w-44" />
          </div>
          <!-- Tabla de datos -->
          <table class="min-w-full text-left border-collapse">
            <tbody>
              <tr class="border-b">
                <th class="px-4 py-2 font-bold">Región</th>
                <td class="px-4 py-2">{{ item['Región'] }}</td>
              </tr>
              <tr class="border-b">
                <th class="px-4 py-2 font-bold">Tipo de Elección</th>
                <td class="px-4 py-2">{{ item['Tipo  Eleccion'] }}</td>
              </tr>
              <tr class="border-b">
                <th class="px-4 py-2 font-bold">Territorio Electoral</th>
                <td class="px-4 py-2">{{ item['Territorio  Electoral'] }}</td>
              </tr>
              <tr class="border-b">
                <th class="px-4 py-2 font-bold">Letra</th>
                <td class="px-4 py-2">{{ item.Letra }}</td>
              </tr>
              <tr class="border-b">
                <th class="px-4 py-2 font-bold">Número de Voto</th>
                <td class="px-4 py-2">{{ item.NVoto }}</td>
              </tr>
              <tr class="border-b">
                <th class="px-4 py-2 font-bold">Nombre Completo</th>
                <td class="px-4 py-2">{{ fullName }}</td>
              </tr>
              <tr class="border-b">
                <th class="px-4 py-2 font-bold">Pacto o Candidatura</th>
                <td class="px-4 py-2">{{ item['Pacto/Candidatura Independiente'] }}</td>
              </tr>
              <tr v-if="item.Subpacto" class="border-b">
                <th class="px-4 py-2 font-bold">Subpacto</th>
                <td class="px-4 py-2">{{ item.Subpacto }}</td>
              </tr>
              <tr class="border-b">
                <th class="px-4 py-2 font-bold">Sigla del Partido</th>
                <td class="px-4 py-2">{{ item['Sigla  Partido'] }}</td>
              </tr>
              <tr class="border-b">
                <th class="px-4 py-2 font-bold">Nombre del Partido</th>
                <td class="px-4 py-2">{{ item['Nombre  Partido'] }}</td>
              </tr>
              <tr class="border-b">
                <th class="px-4 py-2 font-bold">Sexo</th>
                <td class="px-4 py-2">{{ item.Sexo }}</td>
              </tr>
              <tr v-if="item.programa" class="border-b">
                <th class="px-4 py-2 font-bold">Programa</th>
                <td class="px-4 py-2">
                  <a :href="item.programa" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-700">
                    Ver Programa
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </slot>
      </div>
      <div class="flex justify-end mt-6">
        <button @click="$emit('close')" class="px-4 py-2 text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    fullName() {
      return `${this.item.Nombre} ${this.item['Primer  Apellido']} ${this.item['Segundo  Apellido']}`;
    }
  }
};
</script>

<style scoped>

</style>
