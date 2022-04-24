<template>
  <router-view />
  <!-- <div class="app">
    <ul class="app-menu">
      <li class="app-menu-item">
        <router-link :to="{ name: 'Home' }">Home</router-link>
      </li>

      <li class="app-menu-item">
        <router-link :to="{ name: 'ParticleNetwork' }">
          ParticleNetwork
        </router-link>
      </li>
    </ul>

    <main class="app-main">
      <router-view></router-view>
    </main>
  </div> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  //
});
</script>

<style scoped lang="scss">
// .app {
//   @apply w-full;
//   @apply bg-zinc-900;
//   @apply flex flex-col;

//   height: 100vh;

//   &-menu {
//     @apply py-5 px-10;
//     @apply flex justify-center gap-5;

//     &-item {
//       @apply flex items-center;
//       @apply font-black;
//       @apply text-zinc-200;
      
//       list-style-type: none;

//       &::before {
//         @apply mr-2;
//         @apply bg-pink-300;
        
//         content: "";

//         width: 8px;
//         height: 8px;
//         border-radius: 50%;
//       }
//     }
//   }

//   &-main {
//     @apply h-full;
//   }
// }
</style>