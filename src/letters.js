// Sequential Letter Manager: Formal Clean Light Pink Terminal Theme for Kyla & Eljohn
import confetti from 'canvas-confetti';
import { sfx } from './audio.js';

export class LetterManager {
  constructor() {
    this.modalOverlay = document.getElementById('modal-overlay');
    this.modalContent = document.getElementById('modal-content');

    this.currentLetterStep = 1;
    this.totalLetters = 3;

    // NO button state
    this.noClickCount = 0;
    this.maxNoClicks = 5;
    this.noScale = 1.0;
    this.lastZone = -1;

    this.noButtonTexts = [
      'NO',
      'Sure? 🥺',
      'Really? :<',
      'Think again! 🧪',
      'Are you positive? 🤖',
      'No, decline'
    ];

    this.initEvents();
  }

  initEvents() {
    // Prevent modal closing on outside backdrop click
  }

  showLetters() {
    this.currentLetterStep = 1;
    this.noClickCount = 0;
    this.noScale = 1.0;
    this.lastZone = -1;
    this.openModal();
  }

  openModal() {
    sfx.playEnvelopeOpen();
    this.modalOverlay.classList.remove('hidden');
    this.modalOverlay.classList.add('active');
    this.renderCurrentLetter();
  }

  closeModal() {
    this.modalOverlay.classList.remove('active');
    this.modalOverlay.classList.add('hidden');
  }

  nextLetter() {
    if (this.currentLetterStep < this.totalLetters) {
      this.currentLetterStep++;
      sfx.playEnvelopeOpen();
      this.renderCurrentLetter();
    }
  }

  prevLetter() {
    if (this.currentLetterStep > 1) {
      this.currentLetterStep--;
      sfx.playEnvelopeOpen();
      this.renderCurrentLetter();
    }
  }

  renderCurrentLetter() {
    const step = this.currentLetterStep;
    let titlePath = '~ / STATUS';
    if (step === 1) titlePath = '~ / LETTER-FOR-KYLA';
    if (step === 2) titlePath = '~ / RESUME';
    if (step === 3) titlePath = '~ / COFFEE-INVITATION';

    let contentHTML = '';
    if (step === 1) {
      contentHTML = this.getLetter1HTML();
    } else if (step === 2) {
      contentHTML = this.getLetter2HTML();
    } else if (step === 3) {
      contentHTML = this.getLetter3HTML();
    }

    this.modalContent.innerHTML = `
      <div class="light-pink-terminal-window">
        <!-- MacBook Terminal Coral Pink Titlebar -->
        <div class="light-pink-titlebar">
          <div class="mac-traffic-lights">
            <span class="mac-dot red" id="mac-close-btn" title="Close Terminal"></span>
            <span class="mac-dot yellow" title="Minimize"></span>
            <span class="mac-dot green" title="Maximize"></span>
          </div>
          <div class="light-pink-title-text">${titlePath}</div>
          <div class="mac-right-spacer"></div>
        </div>

        <!-- Inner Light Pink Terminal Body -->
        <div class="light-pink-body" id="light-pink-window-body">
          ${contentHTML}
        </div>

        <!-- Terminal Bottom Navigation Bar -->
        <div class="light-pink-nav">
          <button class="pink-term-nav-btn ${step === 1 ? 'disabled' : ''}" id="nav-prev-btn">
            ◀ PREV
          </button>
          <span class="pink-term-step">LETTER ${step} OF ${this.totalLetters}</span>
          <button class="pink-term-nav-btn ${step === this.totalLetters ? 'disabled' : ''}" id="nav-next-btn">
            NEXT ▶
          </button>
        </div>
      </div>
    `;

    // Bind event listeners
    const closeBtn = document.getElementById('mac-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());

    const prevBtn = document.getElementById('nav-prev-btn');
    if (prevBtn && step > 1) {
      prevBtn.addEventListener('click', () => this.prevLetter());
    }

    const nextBtn = document.getElementById('nav-next-btn');
    if (nextBtn && step < this.totalLetters) {
      nextBtn.addEventListener('click', () => this.nextLetter());
    }

    if (step === 3) {
      setTimeout(() => this.bindCoffeeButtons(), 50);
    }
  }

  // --- LETTER 1: FORMAL CLEAN LETTER FOR KYLA ---
  getLetter1HTML() {
    return `
      <div class="term-line prompt">
        <span class="prompt-symbol">$</span> cat ~/letter_for_kyla.txt
      </div>
      <div class="term-output">
        <p class="term-line text">Dear Kyla, 👋</p>
        <br/>
        <p class="term-line text">I hope this letter finds you well.</p>
        <p class="term-line text">Having you in my life is truly wonderful. Thank you for bringing so much happiness, chemistry, and sweetness into my universe! ✨💖</p>
        <br/>
        <p class="term-line prompt-end"><span class="prompt-symbol">$</span> <span class="blinking-cursor">█</span></p>
      </div>
    `;
  }

  // --- LETTER 2: RESUME.JSON (150px x 150px AVATAR IMAGE SIDE-BY-SIDE WITH NAME & COURSE) ---
  getLetter2HTML() {
    return `
      <div class="term-line prompt">
        <span class="prompt-symbol">$</span> cat ~/resume.json
      </div>
      <div class="term-output">
        <!-- Side-by-Side Profile Header with 150px x 150px Avatar -->
        <div class="pink-cv-header-side">
          <div class="cv-avatar-150">
            <img src="/avatar.png" alt="Profile Avatar" class="cv-avatar-img" />
          </div>
          <div class="cv-details-side">
            <h3 class="cv-name-side">Eljohn</h3>
            <p class="cv-title-side">Information Technology 4</p>
          </div>
        </div>

        <!-- 2 COLUMNS x 3 ROWS GRID -->
        <div class="skills-2col-grid">
          <!-- Stat 1: Loyalty -->
          <div class="simple-stat-item">
            <div class="stat-top-line">
              <span class="stat-pill-badge">LOYALTY</span>
              <span class="stat-percent">100%</span>
            </div>
            <div class="simple-bar-track">
              <div class="simple-bar-fill" style="width: 100%;"></div>
            </div>
          </div>

          <!-- Stat 2: Looks -->
          <div class="simple-stat-item">
            <div class="stat-top-line">
              <span class="stat-pill-badge">LOOKS</span>
              <span class="stat-percent">99%</span>
            </div>
            <div class="simple-bar-track">
              <div class="simple-bar-fill" style="width: 99%;"></div>
            </div>
          </div>

          <!-- Stat 3: IT & Tech -->
          <div class="simple-stat-item">
            <div class="stat-top-line">
              <span class="stat-pill-badge">IT & TECH</span>
              <span class="stat-percent">95%</span>
            </div>
            <div class="simple-bar-track">
              <div class="simple-bar-fill" style="width: 95%;"></div>
            </div>
          </div>

          <!-- Stat 4: Patience -->
          <div class="simple-stat-item">
            <div class="stat-top-line">
              <span class="stat-pill-badge">PATIENCE</span>
              <span class="stat-percent">98%</span>
            </div>
            <div class="simple-bar-track">
              <div class="simple-bar-fill" style="width: 98%;"></div>
            </div>
          </div>

          <!-- Stat 5: Caffeine Synthesis -->
          <div class="simple-stat-item">
            <div class="stat-top-line">
              <span class="stat-pill-badge">CAFFEINE</span>
              <span class="stat-percent">100%</span>
            </div>
            <div class="simple-bar-track">
              <div class="simple-bar-fill" style="width: 100%;"></div>
            </div>
          </div>

          <!-- Stat 6: Chemistry -->
          <div class="simple-stat-item">
            <div class="stat-top-line">
              <span class="stat-pill-badge">CHEMISTRY</span>
              <span class="stat-percent">98%</span>
            </div>
            <div class="simple-bar-track">
              <div class="simple-bar-fill" style="width: 98%;"></div>
            </div>
          </div>
        </div>

        <p class="term-line prompt-end"><span class="prompt-symbol">$</span> <span class="blinking-cursor">█</span></p>
      </div>
    `;
  }

  // --- LETTER 3: FORMAL COFFEE INVITATION WITH EQUALLY SPACED SVG DASHED BORDER LAYER ---
  getLetter3HTML() {
    return `
      <div class="term-line prompt">
        <span class="prompt-symbol">$</span> ./propose_coffee_date.py --to="Kyla"
      </div>
      <div class="term-output" id="coffee-term-content">
        <p class="term-line text large">
          Dear Kyla, <br/><br/>
          Would you do me the honor of accompanying me to grab a cup of coffee together? ♡
        </p>
        <br/>

        <!-- Buttons Area with Equalized Gap SVG Dashed Border Wrapper -->
        <div class="term-action-area" id="term-action-area">
          <div class="dashed-btn-wrapper" id="yes-btn-wrapper">
            <svg class="dashed-svg-border" width="100%" height="100%">
              <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="12" ry="12" fill="none" stroke="#e86375" stroke-width="2" stroke-dasharray="14 9" />
            </svg>
            <button class="pink-term-btn yes" id="yes-btn">[ YES ]</button>
          </div>
          <button class="pink-term-btn no" id="no-btn">[ NO ]</button>
        </div>
      </div>
    `;
  }

  bindCoffeeButtons() {
    const yesBtn = document.getElementById('yes-btn');
    const yesWrapper = document.getElementById('yes-btn-wrapper');
    const noBtn = document.getElementById('no-btn');
    const termContent = document.getElementById('coffee-term-content');

    if (!yesBtn || !noBtn) return;

    this.noClickCount = 0;
    this.noScale = 1.0;

    // YES Click Handler (Acceptance Path)
    const triggerVictory = () => {
      sfx.playVictory();
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });

      if (termContent) {
        termContent.innerHTML = `
          <div class="term-victory-box">
            <p class="term-line success">🎉 Yippeee! Coffee date with Kyla is confirmed! ☕💖</p>
            <br/>
            <button class="pink-term-btn yes" id="victory-close-btn">[ DATE CONFIRMED! SEE YOU SOON, KYLA! ☕💖 ]</button>
          </div>
        `;
        document.getElementById('victory-close-btn').addEventListener('click', () => this.closeModal());
      }
    };

    // RESPECTFUL DECLINE PATH (Triggered after 5 NO clicks)
    const triggerDecline = () => {
      sfx.playEnvelopeOpen();

      if (termContent) {
        termContent.innerHTML = `
          <div class="term-victory-box">
            <p class="term-line text">
              Dear Kyla,<br/><br/>
              Thank you so much for taking the time to read through my letters. I completely understand and respect your decision. Wishing you a wonderful day ahead! ✨💖
            </p>
            <br/>
            <button class="pink-term-btn no" id="decline-close-btn">[ CLOSE WINDOW ✨ ]</button>
          </div>
        `;
        document.getElementById('decline-close-btn').addEventListener('click', () => this.closeModal());
      }
    };

    yesBtn.addEventListener('click', triggerVictory);

    // POSITION-ONLY RANDOM DODGING: NO SHRINKS BIT BY BIT, YES WRAPPER GROWS BIT BY BIT
    noBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sfx.playButtonDodge();

      this.noClickCount++;

      if (this.noClickCount >= this.maxNoClicks) {
        triggerDecline();
        return;
      }

      noBtn.innerText = `[ ${this.noButtonTexts[this.noClickCount]} ]`;

      // NO button shrinks bit by bit on each click
      this.noScale = Math.max(0.48, 1.0 - this.noClickCount * 0.11);

      // YES outer dashed wrapper grows bit by bit on each NO click!
      const yesScale = 1.0 + this.noClickCount * 0.16;
      if (yesWrapper) {
        yesWrapper.style.transform = `scale(${yesScale})`;
      } else {
        yesBtn.style.transform = `scale(${yesScale})`;
      }

      const isMobile = window.innerWidth <= 500;
      const spanX = isMobile ? 140 : 240;
      const spanY = isMobile ? 65 : 95;
      const offsetY = isMobile ? -18 : -30;

      const randomX = Math.floor((Math.random() - 0.5) * spanX);
      const randomY = Math.floor((Math.random() - 0.5) * spanY + offsetY);

      noBtn.style.position = 'relative';
      noBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(${this.noScale})`;
      noBtn.style.zIndex = '100';
      noBtn.style.display = 'inline-block';
      noBtn.style.visibility = 'visible';
      noBtn.style.opacity = '1';
    });
  }
}
