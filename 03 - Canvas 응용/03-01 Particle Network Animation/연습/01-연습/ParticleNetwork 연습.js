/** @type { number } */
let canvasWidth;

/** @type { number } */
let canvasHeight;

/** @type { number } */
let loopId;

/** @type { number } */
let id;

/** @type { HTMLCanvasElement } */
let canvas;

/** @type { CanvasRenderingContext2D } */
let ctx;

/** @type { Particle[] } */
let particles;

const options = {
  particleAmount: 30,
  particleColor: "rgb(255, 255, 255)",
  
  defaultRadius: 2,
  variantRadius: 2,
  
  defaultSpeed: 1,
  variantSpeed: 1,
  
  lineColor: "rgba(0, 181, 255)",
  lineRadius: 150,
}

const rgb = options.lineColor.match(/\d+/g);

document.addEventListener("DOMContentLoaded", init);

function init() {
  canvas = document.querySelector("#tutorial");
  ctx = canvas.getContext("2d");

  resizeReset();
  initializeElements();

  console.log(particles)

  startAnimation();
}

function resizeReset() {
  canvasWidth = canvas.width = window.innerWidth;
  canvasHeight = canvas.height = window.innerHeight;
}

function initializeElements() {
  particles = [];

  for (let i = 0; i < options.particleAmount; i++) {
    particles.push(new Particle());
  }
}

function startAnimation() {
  loopId = requestAnimationFrame(animationLoop);
}

function animationLoop() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  drawScene();

  id = requestAnimationFrame(animationLoop);
}

function drawScene() {
  drawParticles();
  drawLine();
}

function drawParticles() {
  for (let i = 0; i < options.particleAmount; i++) {
    particles[i].update();
    particles[i].draw();
  }
}

function drawLine() {
  for (let i = 0; i < options.particleAmount; i++) {
    linkPoints(particles[i], particles);
  }
}

/**
 * @param { Particle } point 
 * @param { Particle[] } hubs 
 */
function linkPoints(point, hubs) {
  for (let i = 0; i < hubs.length; i++) {
    const distance = checkDistance(point.x, point.y, hubs[i].x, hubs[i].y);
    const opacity = 1 - distance / options.lineRadius;

    if (opacity > 0) {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(hubs[i].x, hubs[i].y);
      ctx.closePath();
      ctx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`
      ctx.stroke();
    }
  }
}

function checkDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

class Particle {
  /** @type { number } */
  x;

  /** @type { number } */
  y;

  /** @type { number } */
  radius;

  /** @type { string } */
  color;

  /** @type { number } */
  speed;

  /** @type { number } */
  directionAngle;

  /** @type {{ x: number, y: number }} */
  vector;

  constructor() {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.radius = options.defaultRadius
      + options.variantRadius * Math.random();
    this.color = options.particleColor;
    this.speed = options.defaultSpeed
      + options.variantSpeed * Math.random();
    this.directionAngle = Math.floor(Math.PI * 2 * Math.random());
    this.vector = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed,
    };
  }

  update() {
    this.border();

    this.x += this.vector.x;
    this.y += this.vector.y;
  }

  border() {
    const { x, y, vector } = this;

    if (x >= canvasWidth || x <= 0) {
      this.vector.x *= -1;
    }

    if (y >= canvasHeight || y <= 0) {
      vector.y *= -1;
    }

    if (x > canvasWidth) {
      this.x = canvasWidth;
    }

    if (x < 0) {
      this.x = 0;
    }

    if (y > canvasHeight) {
      this.y = canvasHeight;
    }

    if (y < 0) {
      this.y = 0;
    }
  }

  draw() {
    const { x, y, radius, color } = this;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }
}