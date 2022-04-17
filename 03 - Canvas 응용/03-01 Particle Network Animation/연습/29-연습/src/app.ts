import ParticleNetwork from "@/ParticleNetwork/ParticleNetwork";

import "./app.scss";

window.addEventListener(
  "DOMContentLoaded",
  () => {
    new ParticleNetwork(".particleNetwork-canvasWrapper");
  }
);