export default {
  name: "ListadoView",
  props: {
    lista: Array,
    editando: [Number, null],
    copia: Object,
  },
  emits: ["editar", "guardarEdicion", "cancelarEdicion", "eliminar"],
  methods: {
    onGuardar(index) {
      console.log("Hijo: guardarEdicion emitido", index);
      this.$emit("guardarEdicion", index);
    },
    onCancelar(index) {
      console.log("Hijo: cancelarEdicion emitido", index);
      this.$emit("cancelarEdicion", index);
    },
  },
  template: "#listado-template"
};
