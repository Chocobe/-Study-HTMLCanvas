export default class ParticleOptions {
  readonly color!: string;
  readonly amount!: number;
  readonly defaultRadius!: number;
  readonly variantRadius!: number;
  readonly defaultSpeed!: number;
  readonly variantSpeed!: number;

  constructor({
    color = "rgb(255, 255, 255)",
    amount = 50,
    defaultRadius = 5,
    variantRadius = 5,
    defaultSpeed = 3,
    variantSpeed = 5,
  } = {}) {
    this.color = color;
    this.amount = amount;
    this.defaultRadius = defaultRadius;
    this.variantRadius = variantRadius;
    this.defaultSpeed = defaultSpeed;
    this.variantSpeed = variantSpeed;
  }
}
