<script lang="tsx">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";

import ParticleNetworkCanvas from "@/components/ParticleNetworkCanvas";

export default defineComponent({
  setup() {
    const renderTitle = () => (
      <h1 class="app-title">
        Particle Network Canvas 연습 33
      </h1>
    );

    const renderCanvasWrapper = () => (
      <div class="app-canvasWrapper" ref={$canvasWrapper}>
        Canvas Wrapper
      </div>
    );

    const $canvasWrapper = ref();
    const particleNetworkCanvas = ref<ParticleNetworkCanvas>();

    const initParticleNetworkCanvas = () => {
      particleNetworkCanvas.value = new ParticleNetworkCanvas($canvasWrapper.value);
    };

    const handleResize = () => particleNetworkCanvas.value?.resizeCanvas();

    const initResizeListener = () => {
      window.addEventListener("resize", handleResize);
    };

    const destroyResizeListener = () => {
      window.removeEventListener("resize", handleResize);
    };

    onMounted(() => {
      initParticleNetworkCanvas();
      initResizeListener();
    });

    onUnmounted(() => {
      destroyResizeListener();
    });

    return {
      renderTitle,
      renderCanvasWrapper,

      $canvasWrapper,
      initParticleNetworkCanvas,
    };
  },

  render() {
    const {
      renderTitle,
      renderCanvasWrapper,
    } = this;

    return (
      <div class="app">
        {renderTitle()}
        {renderCanvasWrapper()}
      </div>
    );
  },
});
</script>

<style scoped lang="scss">
.app {
  @apply w-full;
  @apply flex justify-center flex-col;
  @apply bg-zinc-900;

  height: 100vh;

  &-title {
    @apply my-5 mx-10;
    @apply text-slate-600;
    @apply text-center;
    @apply font-black;

    font-size: 30px;

    filter: drop-shadow(1px 3px 6px #ff1493);
  }

  &-canvasWrapper {
    @apply w-full h-full;
  }
}
</style>