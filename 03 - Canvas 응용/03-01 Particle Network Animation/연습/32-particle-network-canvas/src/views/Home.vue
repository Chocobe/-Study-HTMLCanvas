<template>
  <div class="home">
    <h1 class="home-title">
      {{ title }}
    </h1>
  </div>
</template>

<script lang="ts">
import { 
  defineComponent,
  ref,
} from "vue";

export default defineComponent({
  setup() {
    const title = ref("Home");

    return {
      title,
    };
  }
})
</script>

<style scoped lang="scss">
.home {
  //

  &-title {
    @apply font-black text-center;
    @apply text-zinc-500;

    font-size: 30px;
  }
}
</style>