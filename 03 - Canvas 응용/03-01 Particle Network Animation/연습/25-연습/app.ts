import "./style.scss";
import "./app.scss";

import ParticleNetworkCanvas from "@/ParticleNetworkCanvas";

window.addEventListener(
  "DOMContentLoaded",
  () => new ParticleNetworkCanvas("#particleNetworkCanvas"),
);
