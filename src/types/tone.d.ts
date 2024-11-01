declare module 'tone' {
  export class Synth {
    toDestination(): this;
    triggerAttackRelease(note: string, duration: string): void;
  }

  export function start(): Promise<void>;
} 