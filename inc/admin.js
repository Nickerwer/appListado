export default {
  props: ["nuevo"],
  emits: ["agregar", "exportar", "importar"],
  template: `
    <div>
      <div class="card">
        <h2>Agregar producto</h2>
        <input v-model="nuevo.producto" placeholder="Producto" class="input-full">
        <div class="row">
          <input v-model.number="nuevo.precio" type="number" step="0.01" placeholder="Precio (€)" class="input-half">
          <input v-model="nuevo.fecha" type="date" class="input-half">
        </div>
        <input v-model="nuevo.tienda" placeholder="Tienda" class="input-full">
        <textarea v-model="nuevo.observacion" rows="2" placeholder="Observaciones" class="input-full"></textarea>
        <button class="primary" @click="$emit('agregar')">➕ Agregar</button>
      </div>

      <div class="card">
        <h2>Exportar / Importar JSON</h2>
        <button class="primary" @click="$emit('exportar')">💾 Exportar JSON</button>
        <input type="file" @change="$emit('importar', $event)">
      </div>
    </div>
  `
};
