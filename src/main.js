// Main Application Entry Coordinator
import { sfx } from './audio.js';
import { ParticleSystem } from './particles.js';
import { BowCanvasEngine } from './bowCanvas.js';
import { LetterManager } from './letters.js';

class App {
  constructor() {
    this.bgCanvas = document.getElementById('bg-canvas');
    this.bowCanvas = document.getElementById('bow-canvas');
    
    this.envelopeWrapper = document.getElementById('envelope-wrapper');
    this.instructionBanner = document.getElementById('instruction-banner');
    this.resetBtn = document.getElementById('reset-btn');

    this.particles = new ParticleSystem(this.bgCanvas);
    this.letterManager = new LetterManager();

    this.bowEngine = new BowCanvasEngine(
      this.bowCanvas,
      this.particles,
      (hitX, hitY) => this.onEnvelopeShotHit(hitX, hitY)
    );

    this.init();
  }

  init() {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Reset lab button
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => {
        this.resetLab();
      });
    }

    // Start frame loop
    this.animate();
  }

  resizeCanvas() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.particles.resize(width, height);
    this.bowEngine.resize(width, height);
    this.updateTargetRect();
  }

  updateTargetRect() {
    if (this.envelopeWrapper) {
      const rect = this.envelopeWrapper.getBoundingClientRect();
      this.bowEngine.setTargetRect({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      });
    }
  }

  onEnvelopeShotHit(x, y) {
    // 1. Play envelope shake animation
    this.envelopeWrapper.classList.add('shake-hit');

    // 2. One-time process: open envelope and auto pop-up letters modal
    setTimeout(() => {
      this.envelopeWrapper.classList.add('opened');
      this.letterManager.showLetters();

      if (this.instructionBanner) {
        this.instructionBanner.innerHTML = `<p>✨ TARGET SHOT! LETTERS UNSEALED! 💖</p>`;
      }
    }, 450);
  }

  resetLab() {
    this.bowEngine.reset();
    this.envelopeWrapper.classList.remove('shake-hit', 'opened');
    this.letterManager.closeModal();

    if (this.instructionBanner) {
      this.instructionBanner.innerHTML = `<p>Aim & release to shoot Cupid's arrow ♥</p>`;
    }

    sfx.playEnvelopeOpen();
    this.updateTargetRect();
  }

  animate() {
    this.particles.update();
    this.bowEngine.update();
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize on DOM ready
window.addEventListener('DOMContentLoaded', () => {
  new App();
});
