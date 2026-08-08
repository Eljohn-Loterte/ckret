// Clean Straight Drag & Release Bow Engine (Facing UPWARDS toward Target)

import { sfx } from './audio.js';

export class BowCanvasEngine {
  constructor(canvas, particleSystem, onTargetHit) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = particleSystem;
    this.onTargetHit = onTargetHit;

    // Bow setup position (Bottom Center)
    this.bowPos = { x: 300, y: 520 };
    this.bowWidth = 140;

    // Drag state
    this.isDragging = false;
    this.dragY = 520;
    this.maxPull = 85;
    this.pullTension = 0;

    // Arrow flight state
    this.arrow = null; // { x, y, vy, active }
    this.hasShotHit = false;
    this.isShotComplete = false;

    // Target envelope rect
    this.targetRect = { x: 220, y: 80, width: 160, height: 110 };

    this.initEvents();
  }

  setTargetRect(rect) {
    this.targetRect = rect;
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;

    this.bowPos.x = width * 0.5;
    this.bowPos.y = Math.min(height - 110, height * 0.82);

    if (!this.isDragging && !this.isShotComplete) {
      this.dragY = this.bowPos.y;
    }
  }

  initEvents() {
    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const startDrag = (e) => {
      if (this.isShotComplete || (this.arrow && this.arrow.active)) return;
      const pos = getPos(e);
      const dy = Math.abs(pos.y - this.bowPos.y);
      const dx = Math.abs(pos.x - this.bowPos.x);

      if (dy < 90 && dx < 100) {
        this.isDragging = true;
        this.updateDrag(pos.y);
      }
    };

    const moveDrag = (e) => {
      if (!this.isDragging || this.isShotComplete) return;
      const pos = getPos(e);
      this.updateDrag(pos.y);
    };

    const endDrag = () => {
      if (!this.isDragging || this.isShotComplete) return;
      this.isDragging = false;
      this.shootArrow();
      if (!this.isShotComplete) {
        this.dragY = this.bowPos.y;
      }
    };

    this.canvas.addEventListener('mousedown', startDrag);
    this.canvas.addEventListener('mousemove', moveDrag);
    window.addEventListener('mouseup', endDrag);

    this.canvas.addEventListener('touchstart', (e) => { startDrag(e); e.preventDefault(); }, { passive: false });
    this.canvas.addEventListener('touchmove', (e) => { moveDrag(e); e.preventDefault(); }, { passive: false });
    window.addEventListener('touchend', endDrag);
  }

  updateDrag(clientY) {
    const pullDistance = Math.max(0, clientY - this.bowPos.y);
    const clampedPull = Math.min(pullDistance, this.maxPull);

    this.dragY = this.bowPos.y + clampedPull;
    this.pullTension = clampedPull / this.maxPull;

    sfx.playBowPull(this.pullTension);
  }

  shootArrow() {
    const pullDistance = this.dragY - this.bowPos.y;
    if (pullDistance < 15) return;

    const speed = 16 + pullDistance * 0.15;

    this.arrow = {
      x: this.bowPos.x,
      y: this.dragY - 20,
      vy: -speed,
      active: true
    };

    sfx.playArrowShoot();
  }

  reset() {
    this.arrow = null;
    this.hasShotHit = false;
    this.isShotComplete = false;
    this.isDragging = false;
    this.dragY = this.bowPos.y;
  }

  update() {
    // Clear canvas frame
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.isShotComplete) return;

    this.drawBow();

    if (this.arrow && this.arrow.active) {
      this.updateArrow();
      this.drawArrow(this.arrow.x, this.arrow.y);
    } else {
      // Draw arrow nocked on string
      this.drawArrow(this.bowPos.x, this.dragY - 15);
    }
  }

  drawBow() {
    const ctx = this.ctx;
    ctx.save();

    const bowLeftX = this.bowPos.x - this.bowWidth / 2;
    const bowRightX = this.bowPos.x + this.bowWidth / 2;
    const bowY = this.bowPos.y;

    // Clean Curved Bow FACING UPWARDS towards envelope target
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#d97b73';
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.moveTo(bowLeftX, bowY);
    ctx.quadraticCurveTo(this.bowPos.x, bowY - 24, bowRightX, bowY);
    ctx.stroke();

    // Inner soft pink highlight arch facing UPWARDS
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffb7c5';
    ctx.beginPath();
    ctx.moveTo(bowLeftX + 3, bowY);
    ctx.quadraticCurveTo(this.bowPos.x, bowY - 20, bowRightX - 3, bowY);
    ctx.stroke();

    // Clean String pulled down
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#e23b4e';
    ctx.beginPath();
    ctx.moveTo(bowLeftX, bowY);
    ctx.lineTo(this.bowPos.x, this.dragY);
    ctx.lineTo(bowRightX, bowY);
    ctx.stroke();

    ctx.restore();
  }

  drawArrow(x, y) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);

    // Arrow Shaft
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = '#8b3a42';
    ctx.beginPath();
    ctx.moveTo(0, 32);
    ctx.lineTo(0, -25);
    ctx.stroke();

    // Heart Arrowhead facing UP
    ctx.fillStyle = '#e23b4e';
    ctx.beginPath();
    ctx.moveTo(0, -35);
    ctx.bezierCurveTo(-10, -32, -12, -18, 0, -12);
    ctx.bezierCurveTo(12, -18, 10, -32, 0, -35);
    ctx.fill();

    // Fletching (Feathers at bottom)
    ctx.fillStyle = '#ffb7c5';
    ctx.fillRect(-7, 24, 5, 8);
    ctx.fillRect(2, 24, 5, 8);

    ctx.restore();
  }

  updateArrow() {
    const a = this.arrow;
    a.y += a.vy;

    // Sparkle trail
    this.particles.createTrailSparkle(a.x, a.y + 20);

    // Collision check against envelope target
    const target = this.targetRect;
    if (
      a.y <= target.y + target.height * 0.75 &&
      a.x >= target.x - 30 &&
      a.x <= target.x + target.width + 30
    ) {
      a.active = false;
      if (!this.hasShotHit) {
        this.hasShotHit = true;
        this.isShotComplete = true;
        this.particles.createHitExplosion(target.x + target.width / 2, target.y + target.height / 2);
        sfx.playTargetHit();
        if (this.onTargetHit) this.onTargetHit(a.x, a.y);
      }
    }

    if (a.y < -50) {
      a.active = false;
    }
  }
}
