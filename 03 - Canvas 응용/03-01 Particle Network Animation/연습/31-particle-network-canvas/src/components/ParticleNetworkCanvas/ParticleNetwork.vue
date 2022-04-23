<template>
  <canvas ref="$canvas" class="particleNetworkCanvas"></canvas>
</template>

<script lang="ts">
import { 
  defineComponent, 
  ref,
  onMounted,
} from "vue";

import ParticleNetworkCanvas, {
  ParticleNetworkCanvasConstructor,
} from "@/components/ParticleNetworkCanvas/particleNetworkCanvas";

export default defineComponent({
  name: "ParticleNetworkCanvas",

  setup() {
    const $canvas = ref();
    const particleNetworkCanvas = ref();

    onMounted(() => {
      const params: ParticleNetworkCanvasConstructor = {
        $canvas: $canvas.value,
        width: window.innerWidth,
        height: window.innerHeight,
      };

      particleNetworkCanvas.value = new ParticleNetworkCanvas(params);
    });

    return {
      $canvas,
    };
  },
})
</script>

<style scoped lang="scss">
.particleNetworkCanvas {
  //
}
</style>