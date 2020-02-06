const EVENT_SHOW = "show";
const EVENT_HIDE = "hide";
export default {
  data() {
    return {
      visiblet: false
    }
  },
  methods: {
    hide() {
        this.visiblet = false;
        this.$emit(EVENT_HIDE)
      },
      show() {
        this.visiblet = true;
        this.$emit(EVENT_SHOW)
      }
  }
}
