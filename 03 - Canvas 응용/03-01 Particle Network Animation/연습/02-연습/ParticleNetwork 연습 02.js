class ParticleNetworkCanvas {
  /** @type { number } */
  canvasWidth;

  /** @type { number } */
  canvasHeight;

  /** @type { number } */
  loopId;

  /** @type { number } */
  frameId;

  /** @type { HTMLCanvasElement } */
  canvas;

  /** @type { CanvasRenderingContext2D } */
  ctx;

  /** @type { Particle[] } */
  particles;

  /** 
   * @type {{
   *  particleAmount: number
   *  particleColor: string
   *  defaultRadius: number
   *  variantRadius: number
   *  defaultSpeed: number
   *  variantSpeed: number
   *  lineColor: string
   *  lineRadius: number
   * }} 
   */
  options;

  constructor() {
    this.options = {
      particleAmount: 30,
      particleColor: "rgb(255, 255, 255)",

      defaultRadius: 3,
      variantRadius: 3,

      defaultSpeed: 1,
      variantSpeed: 1,

      lineColor: "rgb(0, 181, 255)",
      lineRadius: 175,
    };

    this.init();
  }

  init() {
    this.canvas = document.querySelector("#particleNetworkCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.resizeReset();
    this.initializeElements();

    this.startAnimation();
  }

  resizeReset() {
    this.canvasWidth = this.canvas.width = window.innerWidth;
    this.canvasHeight = this.canvas.height = window.innerHeight;
  }

  initializeElements() {
    const { particleAmount } = this.options;

    this.particles = Array.from(
      { length: particleAmount }, 
      () => new Particle(this.options, this.canvasWidth, this.canvasHeight, this.ctx)
    );
  }

  startAnimation() {
    this.loopId = requestAnimationFrame(() => this.animationLoop());
  }

  animationLoop() {
    const { ctx, canvasWidth, canvasHeight } = this;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    this.drawScene();

    this.frameId = requestAnimationFrame(() => this.animationLoop());
  }

  drawScene() {
    this.drawParticles();
    this.drawLines();
  }

  drawParticles() {
    this.particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
  }

  drawLines() {
    const { particles } = this;

    particles.forEach(particle => this.linkPoints(particle, particles));
  }

  /**
   * @param { Particle } point 
   * @param { Particle[] } hubs 
   */
  linkPoints(point, hubs) {
    hubs.forEach(destPoint => {
      const distance = this.calcDistance(point, destPoint);
      const opacity = 1 - distance / this.options.lineRadius;

      if (opacity > 0) {
        const { x: x1, y: y1 } = point;
        const { x: x2, y: y2 } = destPoint;

        const [r, g, b] = this.options.lineColor.match(/\d+/g);
        
        this.ctx.save();

        this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        this.ctx.lineWidth = 0.5;

        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.closePath();
        this.ctx.stroke();
        
        this.ctx.restore();
      }
    })
  }

  calcDistance(point, destPoint) {
    const { x: x1, y: y1 } = point;
    const { x: x2, y: y2 } = destPoint
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
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

  /** 
   * @type {{
   *  x: number
   *  y: number
   * }}
   */
  vector;

  /** @type { number } */
  canvasWidth;

  /** @type { number } */
  canvasHeight;
  
  /** @type { CanvasRenderingContext2D } */
  ctx;
  
  /**
   * @param {{
   *  canvasWidth: number
   *  canvasHeight: number
   *  defaultRadius: number
   *  variantRadius: number
   *  defaultSpeed: number
   *  variantSpeed: number
   *  particleColor: string
   * }}
   * @param { number } canvasWidth
   * @param { number } canvasHeight
   * @param { CanvasRenderingContext2D } ctx
   */
  constructor({
    defaultRadius,
    variantRadius,
    defaultSpeed,
    variantSpeed,
    particleColor,
  }, canvasWidth, canvasHeight, ctx) {
    this.x = canvasWidth * Math.random();
    this.y = canvasHeight * Math.random();
    this.radius = defaultRadius + variantRadius * Math.random();
    this.speed = defaultSpeed + variantSpeed * Math.random();
    this.directionAngle = Math.floor(Math.random() * Math.PI * 2);
    this.vector = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed,
    };
    this.color = particleColor;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.ctx = ctx;
  }

  draw() {
    const { x, y, radius, color, ctx } = this;

    ctx.save();
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  update() {
    this.border();

    const { vector } = this;
    this.x += vector.x;
    this.y += vector.y;
  }

  border() {
    const { canvasWidth, canvasHeight } = this;

    if (this.x >= canvasWidth || this.x <= 0) {
      this.vector.x *= -1;
    }

    if (this.y >= canvasHeight || this.y <= 0) {
      this.vector.y *= -1;
    }

    if (this.x > canvasWidth) {
      this.x = canvasWidth;
    }

    if (this.x < 0) {
      this.x = 0;
    }

    if (this.y > canvasHeight) {
      this.y = canvasHeight;
    }

    if (this.y < 0) {
      this.y = 0;
    }
  }
}

window.addEventListener("DOMContentLoaded", new ParticleNetworkCanvas());