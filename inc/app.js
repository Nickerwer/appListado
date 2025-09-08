import AdminView from './admin.js';
import ListadoView from './listado.js';

const { createApp } = Vue;

createApp({
  components: { AdminView, ListadoView },
  data() {
    return {
      vista: "listado",
      lista: JSON.parse(localStorage.getItem("listaCompras") || "[]"),
      nuevo: { producto: "", precio: null, fecha: "", tienda: "", observacion: "" },
      editando: null,
      copia: null
    };
  },
  methods: {
    agregar() {
      if (!this.nuevo.producto || !this.nuevo.precio) {
        alert("Producto y precio son obligatorios");
        return;
      }
      this.lista.push({ ...this.nuevo });
      this.guardar();
      this.nuevo = { producto: "", precio: null, fecha: "", tienda: "", observacion: "" };
      this.vista = "listado";
    },
    eliminar(index) {
      this.lista.splice(index, 1);
      this.guardar();
    },
    editar(index) {
      console.log("editar")
      console.log(index)
      this.editando = index;
      this.copia = { ...this.lista[index] };
    },
    guardarEdicion() {
      console.log("guardarEdicion")
      this.guardar();
      this.editando = null;
      this.copia = null;
    },
    cancelarEdicion() {
      console.log("cancelarEdicion")
      console.log(this.copia);
      if (this.copia && this.editando !== null) {
        this.lista[this.editando] = { ...this.copia };
      }
      this.editando = null;
      this.copia = null;
    },
    guardar() {
      console.log("guardar")
      console.log(this.lista);
      localStorage.setItem("listaCompras", JSON.stringify(this.lista));
    },
    exportarJSON() {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.lista, null, 2));
      const dlAnchor = document.createElement("a");
      dlAnchor.setAttribute("href", dataStr);
      dlAnchor.setAttribute("download", "lista_compras.json");
      dlAnchor.click();
    },
    importarJSON(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        try {
          this.lista = JSON.parse(e.target.result);
          this.guardar();
        } catch (err) {
          alert("Error al importar JSON");
        }
      };
      reader.readAsText(file);
    }
  }
}).mount("#app");
