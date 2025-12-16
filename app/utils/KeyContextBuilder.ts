import type { KeyContextValue } from '@/app/hooks/useKeyContext';

export class KeyContextBuilder {
  private keys: Map<string, string> = new Map();

  with(componentKey: string, renderKey: string | number): this {
    this.keys.set(componentKey, `${componentKey}-${renderKey}`);
    return this;
  }

  build(): KeyContextValue {
    const keysSnapshot = new Map(this.keys);
    return {
      get: (componentKey: string) => keysSnapshot.get(componentKey) ?? componentKey,
    };
  }
}

export const keyContextBuilder = () => new KeyContextBuilder();
