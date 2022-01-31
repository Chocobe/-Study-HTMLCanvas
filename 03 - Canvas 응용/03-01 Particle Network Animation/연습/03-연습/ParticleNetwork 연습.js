class ParticleNetwork {
  /** @type { HTMLCanvasElement } */
  canvas;

  /** @type { CanvasRenderingContext2D } */
  ctx;

  /** @type { number } */
  frameId;

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
   *  lineRadius: number
   *  lineColor: string
   * }}
   */
  options;

  /** @param { string } selector */
  constructor(selector) {
    this.initCanvas(selector);
    this.initOptions();
    this.initParticles();

    this.startAnimation();
  }

  /** @type { string } selector */
  initCanvas(selector) {
    this.canvas = document.querySelector(selector);

    if (!this.canvas) throw new Error("존재하지 않는 selector 입니다.");
    
    this.ctx = this.canvas.getContext("2d");
    this.resizeCanvasSize();
  }

  resizeCanvasSize() {
    const { canvas } = this;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  initOptions() {
    this.options = {
      particleAmount: 30,
      particleColor: "rgb(255, 255, 255)",

      defaultRadius: 3,
      variantRadius: 3,

      defaultSpeed: 1,
      variantSpeed: 5,

      lineRadius: 150,
      lineColor: "rgb(0, 181, 255)",
    };
  }

  initParticles() {
    const { options, canvas } = this;

    this.particles = Array.from(
      { length: options.particleAmount },
      () => new Particle(options, canvas)
    );
  }

  startAnimation() {
    this.loopFrame();
  }

  endAnimation() {
    cancelAnimationFrame(this.frameId);
  }

  loopFrame() {
    const { canvas, ctx } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    this.drawScene();
    
    this.frameId = requestAnimationFrame(() => this.loopFrame());
  }

  drawScene() {
    this.drawParticles();
    this.drawLines();
  }

  drawParticles() {
    this.particles.forEach(particle => {
      particle.update();
      particle.draw();
    })
  }

  drawLines() {
    const { particles } = this;

    particles.forEach(sourParticle => {
      this.linkTo(sourParticle, particles);
    });
  }

  /**
   * @param { Particle } sourParticle
   * @param { Particle[] } particleHub
   */
  linkTo(sourParticle, particleHub) {
    const { ctx, options } = this;
    
    particleHub.forEach(destParticle => {
      const distance = this.calcDistance(sourParticle, destParticle);
      const opacity = 1 - distance / this.options.lineRadius;

      if (opacity > 0) {
        const [r, g, b] = options.lineColor.match(/\d+/g);
        const { x: x1, y: y1 } = sourParticle;
        const { x: x2, y: y2 } = destParticle;

        ctx.save();

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
      }
    })
  }

  /**
   * @param { Particle } sourParticle 
   * @param { Particle } destParticle 
   * @returns { number }
   */
  calcDistance(sourParticle, destParticle) {
    const { x: x1, y: y1 } = sourParticle;
    const { x: x2, y: y2 } = destParticle;

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
  particleColor;

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

  /** @type { HTMLCanvasElement } */
  canvas;

  /** @type { CanvasRenderingContext2D } */
  ctx;

  /** @type { string } */
  lineColor;

  /** @type { number } */
  lineRadius;
  
  /**
   * @param {{
   *  particleColor: string
   *  defaultRadius: number
   *  variantRadius: number
   *  defaultSpeed: number
   *  variantSpeed: number
   *  lineColor: string
   *  lineRadius: number
   * }} param0
   * @param { HTMLCanvasElement } canvas
   */
  constructor({
    particleColor,
    defaultRadius,
    variantRadius,
    defaultSpeed,
    variantSpeed,
    lineColor,
    lineRadius,
  }, canvas) {
    const { width, height } = canvas;

    this.x = width * Math.random();
    this.y = height * Math.random();
    this.particleColor = particleColor;
    this.radius = defaultRadius + variantRadius * Math.random();
    this.speed = defaultSpeed + variantSpeed * Math.random();
    this.directionAngle = Math.floor(Math.PI * 2 * Math.random());
    this.vector = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed,
    };
    
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.lineColor = lineColor;
    this.lineRadius = lineRadius;
  }

  update() {
    this.applyBorder();

    this.x += this.vector.x;
    this.y += this.vector.y;
  }

  applyBorder() {
    const { x, y, vector, canvas: { width, height } } = this;

    if (x >= width || x <= 0) vector.x *= -1;

    if (y >= height || y <= 0) vector.y *= -1;

    if (x > width) this.x = width;

    if (x < 0) this.x = 0;

    if (y > height) this.y = height;

    if (y < 0) this.y = 0;
  }
  
  draw() {
    const { ctx, particleColor, x, y, radius } = this;

    ctx.save();

    ctx.fillStyle = particleColor;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}

window.addEventListener("DOMContentLoaded", new ParticleNetwork("#particleNetworkCanvas"));