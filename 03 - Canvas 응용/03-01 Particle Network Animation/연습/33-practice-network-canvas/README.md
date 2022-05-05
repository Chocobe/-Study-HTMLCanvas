# Vite + Vue3 + TS + JSX

# JSX 를 사용하기 위해 설치할 Lib

# 01. @vitejs/plugin-vue-jsx

```bash
npm i -D @vitejs/plugin-vue-jsx
```

```javascript
// vite.config.js 설정

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({}),
  ],
});
```

<br />

# 02. 사용방법

* ``.vue`` 파일의 ``<script lang="tsx" />`` 를 사용해야 합니다.
* 컴포넌트 정의는 ``defineComponent()`` 를 사용해야 합니다.
* ``defineComponent()`` 컴포넌트는 ``export default`` 를 해주어야 합니다.


```javascript
// render() 에서 TSX 사용

<script lang="tsx">
import { defineComponent } from "vue";

export default defineComponent({
  render() {
    return (
      <div>Hello TSX</div>
    );
  },
});
</script>
```

<br />

```javascript
// setup() 에서 TSX 사용

<script lang="tsx">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return (
      <div>Hello TSX</div>
    );
  },
});
</script>
```