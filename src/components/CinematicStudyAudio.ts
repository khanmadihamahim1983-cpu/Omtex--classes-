// Web Audio API Ambient Focus Generator for Cinematic Study
class AmbientStudyAudio {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private filterNode: BiquadFilterNode | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  private start() {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate warm brown/pink noise (soft library study ambiance)
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      // Soft low-pass filter to sound like gentle rain or distant library atmosphere
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 320;
      filter.Q.value = 1.0;

      // Master gain
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 2);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noiseSource.start();

      this.noiseNode = noiseSource;
      this.filterNode = filter;
      this.masterGain = gain;
      this.isPlaying = true;
    } catch (e) {
      console.warn('AudioContext not allowed or not supported yet', e);
      this.isPlaying = false;
    }
  }

  private stop() {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        try {
          this.ctx?.close();
        } catch {}
        this.ctx = null;
        this.isPlaying = false;
      }, 900);
    } else {
      this.isPlaying = false;
    }
  }
}

export const studyAudio = new AmbientStudyAudio();
