<script setup lang="ts">
import ParticleNetworkCanvas from "@/components/ParticleNetworkCanvas";
import { onMounted } from "vue";

withDefaults(defineProps<{
  title?: string;
}>(), {
  title: "연습 30",
});

onMounted(() => {
  new ParticleNetworkCanvas(".particleNetwork-canvasWrapper");
});
</script>

<template>
  <div class="particleNetwork">
    <h1 class="particleNetwork-title">
      {{ title }}
    </h1>

    <div class="particleNetwork-canvasWrapper"></div>
  </div>
</template>

<style scoped lang="scss">
.particleNetwork {
  @apply relative;
  @apply w-full h-full;

  @apply flex;

  &-title {
    @apply text-white;
    @apply mx-auto;
    @apply font-black;

    @apply absolute;
    @apply top-20;

    left: 50%;
    transform: translateX(-50%);
    
    filter: drop-shadow(3px 6px 9px #ff1493);
  }

  &-canvasWrapper {
    $canvasWrapper: &;

    :deep(#{$canvasWrapper}-canvas) {
      @apply w-full h-full;

      background-color: #121212;
    }
  }
}
</style>