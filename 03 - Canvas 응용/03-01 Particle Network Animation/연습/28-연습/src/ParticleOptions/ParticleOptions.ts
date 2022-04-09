export default class ParticleOptions {
  amount!: number;
  color!: string;
  
  defaultRadius!: number;
  variantRadius!: number;

  defaultSpeed!: number;
  variantSpeed!: number;

  constructor({
    amount,
    color,
    defaultRadius = 5,
    variantRadius = 5,
    defaultSpeed = 3,
    variantSpeed = 5,
  }: {
    amount: number;
    color: string;
    defaultRadius?: number;
    variantRadius?: number;
    defaultSpeed?: number;
    variantSpeed?: number;
  }) {
    this.amount = amount;
    this.color = color;
    this.defaultRadius = defaultRadius;
    this.variantRadius = variantRadius;
    this.defaultSpeed = defaultSpeed;
    this.variantSpeed = variantSpeed;
  }
}