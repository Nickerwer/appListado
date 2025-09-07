export default {
  props: ["lista", "editando"],
  emits: ["editar", "guardarEdicion", "cancelarEdicion", "eliminar"],
  template: `
    <div>
      <div v-if="lista.length === 0" class="card">
        <p>No hay productos aún. Agrega algunos en la sección de administración.</p>
      </div>

      <div v-for="(item, index) in lista" :key="index" class="card">
        <!-- Modo edición -->
        <div v-if="editando === index">
          <input v-model="item.producto" placeholder="Producto" class="input-full">
          <div class="row">
            <input v-model.number="item.precio" type="number" step="0.01" placeholder="Precio (€)" class="input-half">
            <input v-model="item.fecha" type="date" class="input-half">
          </div>
          <input v-model="item.tienda" placeholder="Tienda" class="input-full">
          <textarea v-model="item.observacion" rows="2" placeholder="Observaciones" class="input-full"></textarea>

          <div class="actions bottom">
            <button class="success" @click="$emit('guardarEdicion')" title="Guardar">✅</button>
            <button class="secondary" @click="$emit('cancelarEdicion')" title="Cancelar">❌</button>
          </div>
        </div>

        <!-- Modo lectura -->
        <div v-else>
          <div class="actions top-right">
            <button class="primary" @click="$emit('editar', index)" title="Editar">✏️</button>
            <button class="danger" @click="$emit('eliminar', index)" title="Borrar">🗑️</button>
          </div>
          <div class="item-header">{{ item.producto }}</div>
          <div class="chips">
            <span class="chip">💶 {{ item.precio.toFixed(2) }} €</span>
            <span class="chip">📅 {{ item.fecha || "Sin fecha" }}</span>
            <span class="chip">🏬 {{ item.tienda || "N/A" }}</span>
          </div>
          <p v-if="item.observacion">{{ item.observacion }}</p>
        </div>
      </div>
    </div>
  `
};
