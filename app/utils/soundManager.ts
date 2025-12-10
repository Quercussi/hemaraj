// Sound utility for playing audio effects
type SoundName = 'tick' | 'card-shuffle' | 'pick-up' | 'place-down' | 'success' | 'error';

class SoundManager {
  private sounds: Map<SoundName, HTMLAudioElement> = new Map();
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.preload(['tick', 'card-shuffle', 'success', 'error']);
    }
  }

  private preload(soundNames: SoundName[]) {
    soundNames.forEach((name) => {
      try {
        const audio = new Audio(`/sounds/${name}.mp3`);
        audio.preload = 'auto';
        audio.volume = 0.5; // Default volume
        this.sounds.set(name, audio);
      } catch (error) {
        console.warn(`Failed to preload sound: ${name}`, error);
      }
    });
  }

  play(name: SoundName, volume: number = 0.5): void {
    if (this.isMuted) return;

    try {
      let audio = this.sounds.get(name);

      if (!audio) {
        // Lazy load if not preloaded
        audio = new Audio(`/sounds/${name}.mp3`);
        audio.volume = volume;
        this.sounds.set(name, audio);
      } else {
        audio.volume = volume;
        audio.currentTime = 0; // Reset to start
      }

      // Play with error handling
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Silently fail if autoplay is blocked
          console.debug(`Sound play blocked: ${name}`, error);
        });
      }
    } catch (error) {
      console.warn(`Failed to play sound: ${name}`, error);
    }
  }

  mute(): void {
    this.isMuted = true;
  }

  unmute(): void {
    this.isMuted = false;
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

// Singleton instance
export const soundManager = new SoundManager();

// Convenience function for components
export function playSound(name: SoundName, volume?: number): void {
  soundManager.play(name, volume);
}
