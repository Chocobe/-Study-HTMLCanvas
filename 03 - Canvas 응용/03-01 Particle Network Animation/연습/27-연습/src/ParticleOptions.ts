export default class ParticleOptions {
  amount!: number;
  color!: string;

  defaultRadius!: number;
  variantRadius!: number;

  defaultSpeed!: number;
  variantSpeed!: number;

  constructor({
    amount = 50,
    color = "rgb(255, 255, 255)",
    defaultRadius = 3,
    variantRadius = 10,
    defaultSpeed = 3,
    variantSpeed = 5,
  } = {}) {
    this.amount = amount;
    this.color = color;
    this.defaultRadius = defaultRadius;
    this.variantRadius = variantRadius;
    this.defaultSpeed = defaultSpeed;
    this.variantSpeed = variantSpeed;
  }
}