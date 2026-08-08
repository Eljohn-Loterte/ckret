// Cute Warm Hearts & Chemistry Particles System

export class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.chemElements = [
      '💖', '🧪', 'H₂O', 'C₈H₁₀N₄O₂', '✨', '⚛️', '🧬'
    ];
    this.initBackgroundParticles();
  }

  initBackgroundParticles() {
    // Persistent floating cute background particles
    for (let i = 0; i < 28; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.2 - Math.random() * 0.4,
        size: 14 + Math.random() * 12,
        text: this.chemElements[Math.floor(Math.random() * this.chemElements.length)],
        color: Math.random() > 0.5 ? '#e23b4e' : '#d97b73',
        alpha: 0.25 + Math.random() * 0.4,
        type: 'float'
      });
    }
  }

  createHitExplosion(x, y) {
    const colors = ['#e23b4e', '#d97b73', '#ffb7c5', '#ffd700', '#ffffff'];
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 7;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 1,
        decay: 0.02 + Math.random() * 0.02,
        type: 'spark'
      });
    }

    // Floating reaction text
    this.particles.push({
      x: x,
      y: y - 20,
      vx: 0,
      vy: -1.5,
      size: 16,
      text: 'REACTION SUCCESSFUL! 🧪💖',
      color: '#e23b4e',
      alpha: 1,
      life: 1,
      decay: 0.01,
      type: 'text'
    });
  }

  createTrailSparkle(x, y) {
    if (Math.random() > 0.3) return;
    this.particles.push({
      x: x + (Math.random() - 0.5) * 8,
      y: y,
      vx: (Math.random() - 0.5) * 0.8,
      vy: 1 + Math.random() * 1.5,
      size: 3 + Math.random() * 3,
      color: '#ffb7c5',
      alpha: 0.8,
      life: 1,
      decay: 0.06,
      type: 'spark'
    });
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.type === 'float') {
        if (p.y < -20) {
          p.y = this.canvas.height + 20;
          p.x = Math.random() * this.canvas.width;
        }
        this.ctx.save();
        this.ctx.globalAlpha = p.alpha;
        this.ctx.font = `${p.size}px "Pixelify Sans", sans-serif`;
        this.ctx.fillStyle = p.color;
        this.ctx.fillText(p.text, p.x, p.y);
        this.ctx.restore();
      } else if (p.type === 'spark') {
        p.life -= p.decay;
        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
        this.ctx.save();
        this.ctx.globalAlpha = p.life;
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        this.ctx.restore();
      } else if (p.type === 'text') {
        p.life -= p.decay;
        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
        this.ctx.save();
        this.ctx.globalAlpha = p.life;
        this.ctx.font = '13px "Press Start 2P", monospace';
        this.ctx.fillStyle = p.color;
        this.ctx.shadowColor = '#fff';
        this.ctx.shadowBlur = 4;
        this.ctx.fillText(p.text, p.x - 100, p.y);
        this.ctx.restore();
      }
    }
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }
}
