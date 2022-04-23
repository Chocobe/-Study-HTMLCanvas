<template>
  <div class="app">
    <h3 class="app-title">
      Particle Network Canvas Practice 31
    </h3>

    <figure class="app-particleNetwork">
      <ParticleNetwork class="app-particleNetwork-canvas" />
    </figure>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ParticleNetwork from "@/components/ParticleNetworkCanvas/ParticleNetwork.vue";

export default defineComponent({
  components: {
    ParticleNetwork,
  }
})
</script>

<style scoped lang="scss">
.app {
  @apply w-full;
  @apply relative;
  @apply bg-zinc-900;

  height: 100vh;

  &-title {
    @apply font-black;
    @apply absolute;
    @apply text-stone-300;

    left: 50%;
    bottom: 20%;
    transform: translateX(-50%);
    
    font-size: 30px;

    filter: drop-shadow(3px 6px 9px #ff1493);
  }

  &-particleNetwork {
    //

    &-canvas {
      //
    }
  }
}
</style>