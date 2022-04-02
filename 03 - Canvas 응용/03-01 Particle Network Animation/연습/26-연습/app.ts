import ParticleNetworkCanvas from "@/ParticleNetworkCanvas";

import "./app.scss";

class App {
  particleNetworkCanvas!: ParticleNetworkCanvas;

  constructor(selector: string) {
    this.particleNetworkCanvas = new ParticleNetworkCanvas(selector);
  }
}

window.addEventListener(
  "DOMContentLoaded",
  () => new App("#particleNetworkCanvas"),
);
