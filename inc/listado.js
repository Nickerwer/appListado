// listado.js
export default {
  name: "ListadoView",
  props: {
    lista: { type: Array, required: true },
    editando: { type: [Number, null], default: null },
    copia: { type: Object, default: null },
  },
  emits: ["editar", "guardarEdicion", "cancelarEdicion", "eliminar"],
  methods: {       
    onGuardar(index) {
      console.log("Hijo: guardarEdicion emitido", index);
      this.$emit("guardarEdicion", index);
    },
    //onGuardar(index) { this.$emit("guardarEdicion", index); },
    onCancelar(index) { this.$emit("cancelarEdicion", index); },
  },
  template: `
    <div>
      <div v-if="lista.length === 0" class="card">
        <p>No hay productos aún. Agrega algunos en la sección de administración.</p>
      </div>

      <div v-for="(item, index) in lista" :key="index" class="card">
        <!-- Modo edición -->
        <div v-if="editando === index">
          <input v-model.trim="copia.producto" placeholder="Producto" class="input-full">
          <div class="row">
            <input v-model.number="copia.precio" type="number" step="0.01" min="0" placeholder="Precio (€)" class="input-half">
            <input v-model="copia.fecha" type="date" class="input-half">
          </div>
          <input v-model.trim="copia.tienda" placeholder="Tienda" class="input-full">
          <textarea v-model.trim="copia.observacion" rows="2" placeholder="Observaciones" class="input-full"></textarea>

          <div class="actions bottom">
            <div v-if="editando === index && copia">
              <button class="success" @click="onGuardar(index)" title="Guardar">✅</button>
            </div>
            <button class="secondary" @click="onCancelar(index)" title="Cancelar">❌</button>
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
            <span class="chip">💶 {{ Number(item.precio ?? 0).toFixed(2) }} €</span>
            <span class="chip">📅 {{ item.fecha || "Sin fecha" }}</span>
            <span class="chip">🏬 {{ item.tienda || "N/A" }}</span>
          </div>
          <p v-if="item.observacion">{{ item.observacion }}</p>
        </div>
      </div>
    </div>
  `
};
