class ParticleOptions {
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

  /**
   * @param {{
   *  particleAmount: number
   *  particleColor: string
   *  defaultRadius: number
   *  variantRadius: number
   *  defaultSpeed: number
   *  variantSpeed: number
   * }} options 
   */
  constructor({
    particleAmount,
    particleColor,
    defaultRadius,
    variantRadius,
    defaultSpeed,
    variantSpeed,
  } = {}) {
    this.particleAmount = particleAmount ?? 50;
    this.particleColor = particleColor ?? "rgb(255, 255, 255)";
    
    this.defaultRadius = defaultRadius ?? 3;
    this.variantRadius = variantRadius ?? 3;

    this.defaultSpeed = defaultSpeed ?? 3;
    this.variantSpeed = variantSpeed ?? 3;
  }
}

class Particle {
  /** @type { HTMLCanvasElement } */
  #canvas;

  /** @type { CanvasRenderingContext2D } */
  #ctx;
  
  /** @type { number } */
  x;

  /** @type { number } */
  y;

  /** @type { string } */
  color;

  /** @type { number } */
  radius;

  /** @type { number } */
  speed;

  /** @type { number } */
  directionAngle;

  /** @type {{ x: number, y: number }} */
  vector;

  /**
   * @param { HTMLCanvasElement } canvas 
   * @param { ParticleOptions } particleOptions 
   */
  constructor(canvas, particleOptions) {
    this.#canvas = canvas;
    this.#ctx = this.#canvas.getContext("2d");

    const { width, height } = this.#canvas;
    const {
      particleColor,
      defaultRadius,
      variantRadius,
      defaultSpeed,
      variantSpeed,
    } = particleOptions;

    this.x = width * Math.random();
    this.y = height * Math.random();

    this.color = particleColor;
    
    this.radius = defaultRadius + variantRadius * Math.random();
    this.speed = defaultSpeed + variantSpeed * Math.random();

    this.directionAngle = Math.PI * 2 * Math.random();

    this.vector = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed,
    };
  }

  draw() {
    const ctx = this.#ctx;
    const { x, y, radius, color } = this;

    ctx.save();
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  update() {
    this.x += this.vector.x;
    this.y += this.vector.y;

    this.applyBorder();
  }

  applyBorder() {
    const { width, height } = this.#canvas;
    const { x, y, vector } = this;

    if (x >= width || x <= 0) vector.x *= -1;

    if (y >= height || y <= 0) vector.y *= -1;
  }
}

class LineHubOptions {
  /** @type { number } */
  lineRadius;

  /** @type { string } */
  color;

  /**
   * @param {{
   *  lineRadius: number
   *  color: string
   * }}
   */
  constructor({ lineRadius, color } = {}) {
    this.lineRadius = lineRadius ?? 200;
    this.color = color ?? `rgb(0, 181, 255)`;
  }
}

class LineHub {
  /** @type { CanvasRenderingContext2D } */
  #ctx;
  
  /** @type { number } */
  #lineRadius;

  /**
   * @type {{
   *  r: string
   *  g: string
   *  b: string
   * }}
   */
  #rgb;
  
  /** @type { Particle[] } */
  #particles;

  /**
   * @param { CanvasRenderingContext2D } ctx 
   * @param { LineHubOptions } lineOptions 
   */
  constructor(ctx, lineOptions, particles) {
    this.#ctx = ctx;

    this.#lineRadius = lineOptions.lineRadius;
    
    const [r, g, b] = lineOptions.color.match(/\d+/g);
    this.#rgb = { r, g, b };

    this.#particles = particles;
  }

  draw() {
    this.lineToOthers();
  }

  lineToOthers() {
    this.#particles.forEach(particle => this.lineToDest(particle));
  }

  /** @param { Particle } sour */
  lineToDest(sour) {
    this.#particles.forEach(dest => {
      const { x: x1, y: y1 } = sour;
      const { x: x2, y: y2 } = dest;
      
      const distance = this.calcDistance({ x1, y1, x2, y2 });
      const opacity = 1 - distance / this.#lineRadius;

      if (opacity > 0) {
        const ctx = this.#ctx;
        const { r, g, b } = this.#rgb;
        
        ctx.save();
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
      }
    });
  }

  calcDistance({ x1, y1, x2, y2 }) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}

class ParticleNetworkCanvas {
  /** @type { HTMLCanvasElement } */
  #canvas;

  /** @type { CanvasRenderingContext2D } */
  #ctx;

  /** @type { ParticleOptions } */
  #particleOptions;

  /** @type { Particle[] } */
  #particles;

  /** @type { LineHubOptions } */
  #lineHubOptions;

  /** @type { LineHub } */
  #lineHub;

  /** @type { number } */
  #frameId;

  /** @param { string } selector */
  constructor(selector) {
    this.initCanvas(selector);
    this.initCanvasSize();

    this.initParticleOptions();
    this.initParticles();

    this.initLineHubOptions();
    this.initLineHub();

    this.startAnimation();
  }

  /** @param { string } selector */
  initCanvas(selector) {
    this.#canvas = document.querySelector(selector);

    if (!this.#canvas) throw new Error("잘못된 selector 입니다.");

    this.#ctx = this.#canvas.getContext("2d");
  }

  initCanvasSize() {
    this.#canvas.width = window.innerWidth;
    this.#canvas.height = window.innerHeight;
  }

  initParticleOptions() {
    this.#particleOptions = new ParticleOptions();
  }

  initParticles() {
    this.#particles = Array.from(
      { length: this.#particleOptions.particleAmount },
      () => new Particle(this.#canvas, this.#particleOptions)
    );
  }

  initLineHubOptions() {
    this.#lineHubOptions = new LineHubOptions();
  }

  initLineHub() {
    this.#lineHub = new LineHub(this.#ctx, this.#lineHubOptions, this.#particles);
  }

  startAnimation() {
    this.loopFrame();
  }

  loopFrame() {
    const { width, height } = this.#canvas;
    const ctx = this.#ctx;

    ctx.clearRect(0, 0, width, height);

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