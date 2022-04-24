<template>
  <div class="particleNetwork">
    <h1>Particle Network</h1>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
} from "vue";

import ParticleNetworkCanvas, {
  ParticleNetworkCanvasConstructorParams,
} from "@/components/ParticleNetwork/ParticleNetworkCanvas";

export default defineComponent({
  name: "ParticleNetwork",

  setup() {
    const params: ParticleNetworkCanvasConstructorParams = {
      wrapperSelector: ".particleNetwork",
      canvasStyleClass: ".particleNetwork-canvas",
    };

    onMounted(() => {
      new ParticleNetworkCanvas(params);
    });
  },
});
</script>

<style scoped lang="scss">
$host: ".particleNetwork";

#{$host} {
  @apply w-full h-full;

  :deep(#{$host}-canvas) {
    // @apply bg-pink-200;
  }
}
</style>