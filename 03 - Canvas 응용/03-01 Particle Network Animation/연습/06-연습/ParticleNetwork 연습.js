class ParticleNetworkOptions {
  /** @type { number } */
  particleAmount;

  /** @type { string } */
  particleColor;

  /** @type { number } */
  defaultRadius;

  /** @type { number } */
  variantRadius;

  /** @type { number } */
  defaultSpeed;

  /** @type { number } */
  variantSpeed;

  /** @type { number } */
  lineRadius;

  /** @type { string } */
  lineColor;

  /**
   * @param {{
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
  constructor({
    particleAmount,
    particleColor,
    defaultRadius,
    variantRadius,
    defaultSpeed,
    variantSpeed,
    lineRadius,
    lineColor,
  } = {}) {
    this.particleAmount = particleAmount ?? 50;
    this.particleColor = particleColor ?? "rgb(255, 255, 255)";
    this.defaultRadius = defaultRadius ?? 5;
    this.variantRadius = variantRadius ?? 5;
    this.defaultSpeed = defaultSpeed ?? 2;
    this.variantSpeed = variantSpeed ?? 2;
    this.lineRadius = lineRadius ?? 200;
    this.lineColor = lineColor ?? "rgb(0, 181, 255)";
  }
}

class Particle {
  /** @type { HTMLCanvasElement } */
  #canvas;

  /** @type { CanvasRenderingContext2D } */
  #ctx;
  
  /** @type { number } */
  #x;

  /** @type { number } */
  #y;

  /** @type { string } */
  #color;

  /** @type { number } */
  #radius;

  /** @type { number } */
  #speed;

  /** @type { number } */
  #directionAngle;

  /** @type {{ x: number, y: number }} */
  #vector;

  /**
   * @param { HTMLCanvasElement } canvas
   * @param { ParticleNetworkOptions } options
   */
  constructor(canvas, options) {
    this.#canvas = canvas;
    this.#ctx = this.#canvas.getContext("2d");

    const { width, height } = this.#canvas;
    const { 
      particleColor,
      defaultRadius, 
      variantRadius,
      defaultSpeed,
      variantSpeed,
    } = options;

    this.#x = width * Math.random();
    this.#y = height * Math.random();
    
    this.#color = particleColor;

    this.#radius = defaultRadius + variantRadius * Math.random();
    this.#speed = defaultSpeed + variantSpeed * Math.random();

    this.#directionAngle = Math.floor(Math.PI * 2 * Math.random());
    this.#vector = {
      x: Math.cos(this.#directionAngle) * this.#speed,
      y: Math.sin(this.#directionAngle) * this.#speed,
    };
  }

  update() {
    this.#x += this.#vector.x;
    this.#y += this.#vector.y;

    this.applyBorder();
  }

  applyBorder() {
    const { width, height } = this.#canvas;

    if (this.#x >= width || this.#x <= 0) this.#vector.x *= -1;

    if (this.#y >= height || this.#y <= 0) this.#vector.y *= -1;
  }
  
  draw() {
    const ctx = this.#ctx;

    ctx.save();
    ctx.fillStyle = this.#color;
    
    ctx.beginPath();
    ctx.arc(this.#x, this.#y, this.#radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  /** @returns { x: number, y: number } */
  getLocation() {
    return { x: this.#x, y: this.#y };
  }
}

class LineHub {
  /** @type { CanvasRenderingContext2D } */
  #ctx;

  /** @type { number } */
  #lineRadius;

  /** @type { Particle[] } */
  #particles;

  /**
   * @type {{
   *  r: string
   *  g: string
   *  b: string
   * }}
   */
  #rgb;

  /**
   * @param { CanvasRenderingContext2D } ctx
   * @param { ParticleNetworkOptions } options 
   * @param { particle[] } particles 
   */
  constructor(ctx, options, particles) {
    this.#ctx = ctx;
    this.#lineRadius = options.lineRadius;
    
    const [r, g, b] = options.lineColor.match(/\d+/g);
    this.#rgb = { r, g, b };

    this.#particles = particles;
  }

  draw() {
    this.#particles.forEach(sour => this.linkToOthers(sour));
  }

  /** @param { Particle } sour */
  linkToOthers(sour) {
    this.#particles.forEach(dest => this.linkToDest(sour, dest));
  }

  /**
   * @param { Particle } sour 
   * @param { Particle } dest 
   */
  linkToDest(sour, dest) {
    const distance = this.calcDistance(sour, dest);
    const opacity = 1 - distance / this.#lineRadius;

    if (opacity > 0) {
      const ctx = this.#ctx;
      const { r, g, b } = this.#rgb;
      const { x: x1, y: y1 } = sour.getLocation();
      const { x: x2, y: y2 } = dest.getLocation();

      ctx.save();
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
    }
  }

  /**
   * @param { Particle } sour 
   * @param { Particle } dest 
   * @returns { number }
   */
  calcDistance(sour, dest) {
    const { x: x1, y: y1 } = sour.getLocation();
    const { x: x2, y: y2 } = dest.getLocation();

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}

class ParticleNetworkCanvas {
  /** @type { HTMLCanvasElement } */
  #canvas;

  /** @type { CanvasRenderingContext2D } */
  #ctx;

  /** @type { ParticleNetworkOptions } */
  #options;

  /** @type { Particle[] } */
  #particles;

  /** @type { LineHub } */
  #lineHub;

  /** @type { number } */
  #frameId;

  /** @param { string } selector */
  constructor(selector) {
    this.initCanvas(selector);
    this.initCanvasSize();

    this.initOptions();
    this.initParticles();
    this.initLineHub();

    this.startAnimation();
  }

  /** @param { string } selector */
  initCanvas(selector) {
    this.#canvas = document.querySelector(selector);

    if (!this.#canvas) throw new Error("잘못된 선택자 입니다.");

    this.#ctx = this.#canvas.getContext("2d");
  }

  initCanvasSize() {
    this.#canvas.width = window.innerWidth;
    this.#canvas.height = window.innerHeight;
  }

  initOptions() {
    this.#options = new ParticleNetworkOptions();
  }

  initParticles() {
    this.#particles = Array.from(
      { length: this.#options.particleAmount },
      () => new Particle(this.#canvas, this.#options)
    );
  }

  initLineHub() {
    this.#lineHub = new LineHub(this.#ctx, this.#options, this.#particles);
  }

  startAnimation() {
    this.loopFrame();
  }

  loopFrame() {
    const { width, height } = this.#canvas;

    this.#ctx.clearRect(0, 0, width, height);

    this.drawScene();

    this.#frameId = requestAnimationFrame(() => this.loopFrame());
  }

  drawScene() {
    this.drawParticles();
    this.drawLineHub();
  }

  drawParticles() {
    this.#particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
  }

  drawLineHub() {
    this.#lineHub.draw();
  }
}

window.addEventListener(
  "DOMContentLoaded",
  () => new ParticleNetworkCanvas("#particleNetworkCanvas")
);