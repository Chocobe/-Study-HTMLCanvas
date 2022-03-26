export interface ParticleOptionsParams {
  color?: string;
  amount?: number;
  defaultRadius?: number;
  variantRadius?: number;
  defaultSpeed?: number;
  variantSpeed?: number;
}

export default class ParticleOptions {
  _color!: string;
  _amount!: number;
  _defaultRadius!: number;
  _variantRadius!: number;
  _defaultSpeed!: number;
  _variantSpeed!: number;

  constructor({
    color = "rgb(255, 255, 255)",
    amount = 50,
    defaultRadius = 3,
    variantRadius = 5,
    defaultSpeed = 2,
    variantSpeed = 5,
  }: ParticleOptionsParams = {}) {
    this._color = color;
    this._amount = amount;
    this._defaultRadius = defaultRadius;
    this._variantRadius = variantRadius;
    this._defaultSpeed = defaultSpeed;
    this._variantSpeed = variantSpeed;
  }

  toJSON() {
    const {
      _color,
      _amount,
      _defaultRadius,
      _variantRadius,
      _defaultSpeed,
      _variantSpeed,
    } = this;

    return {
      color: _color,
      amount: _amount,
      defaultRadius: _defaultRadius,
      variantRadius: _variantRadius,
      defaultSpeed: _defaultSpeed,
      variantSpeed: _variantSpeed,
    };
  }
}
