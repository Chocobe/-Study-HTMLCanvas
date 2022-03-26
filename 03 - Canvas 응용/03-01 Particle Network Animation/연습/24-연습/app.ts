import "./app.scss";

import ParticleNetworkCanvas from "./src/ParticleNetworkCanvas";

window.addEventListener("DOMContentLoaded", () => {
  new ParticleNetworkCanvas({
    selector: "#particleNetworkCanvas",
  });
});
