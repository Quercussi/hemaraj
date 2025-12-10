export class RandomGen {
  private readonly state: number;

  constructor(seed: number) {
    this.state = seed;
  }

  next(): [number, RandomGen] {
    const a = 1664525;
    const c = 1013904223;
    const m = 4294967296; // 2^32

    const newState = (this.state * a + c) >>> 0; // >>> 0 ensures unsigned 32-bit
    const value = (newState >>> 0) / m; // Normalize to [0, 1)

    return [value, new RandomGen(newState)];
  }

  static generateMany(gen: RandomGen, count: number): [number[], RandomGen] {
    const values: number[] = [];
    let currentGen = gen;

    for (let i = 0; i < count; i++) {
      const [value, newGen] = currentGen.next();
      values.push(value);
      currentGen = newGen;
    }

    return [values, currentGen];
  }

  nextInt(min: number, max: number): [number, RandomGen] {
    const [value, newGen] = this.next();
    return [Math.floor(value * (max - min)) + min, newGen];
  }

  nextBool(): [boolean, RandomGen] {
    const [value, newGen] = this.next();
    return [value < 0.5, newGen];
  }
}
