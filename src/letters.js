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
      'Decline'
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
    if (step === 1) titlePath = '~ / LETTER-FOR-U';
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

  // --- LETTER 1: FORMAL CLEAN LETTER FOR U ---
  getLetter1HTML() {
    return `
      <div class="term-line prompt">
        <span class="prompt-symbol">$</span> cat ~/letter_for_u.txt
      </div>
      <div class="term-output">
        <p class="term-line text">Hi Kyla :></p>
        <br/>
        <p class="term-line text">Congrats you have been selected by the owner to be his crush HAHAHAHAH ₍^. .^₎⟆</p>
        <p class="term-line text">I find you really attractive and cute totoo pramis hehehe. So I made this to tell you na den</p>
        <p class="term-line text">And also to get the chance to even get to know you more and magpakilala den HAHAHAH</p>
        <br/>
        <p class="term-line prompt-end"><span class="prompt-symbol">$</span> <span class="blinking-cursor">█</span></p>
      </div>
    `;
  }

  // --- LETTER 2: RESUME.JSON (CURRICULUM VITAE WITH STATS) ---
  getLetter2HTML() {
    return `
      <div class="term-line prompt">
        <span class="prompt-symbol">$</span> cat ~/resume.json
      </div>
      <div class="term-output">
        <!-- Curriculum Vitae Main Header Banner -->
        <div class="cv-main-title-banner">
          <span class="cv-title-icon">📋</span>
          <h2 class="cv-main-title">Curriculum Vitae</h2>
        </div>

        <!-- Side-by-Side Profile Header with 150px x 150px Avatar -->
        <div class="pink-cv-header-side">
          <div class="cv-avatar-150">
            <img src="/avatar.jpg" alt="Profile Avatar" class="cv-avatar-img" />
          </div>
          <div class="cv-details-side">
            <h3 class="cv-name-side">Eljohn</h3>
            <p class="cv-title-side">Information Technology 4</p>
          </div>
        </div>

        <!-- Skills Section Divider Header -->
        <div class="cv-section-divider">
          <span class="cv-section-title">📊 SKILLS</span>
        </div>

        <!-- 2 COLUMNS x 3 ROWS GRID -->
        <div class="skills-2col-grid">
          <!-- Stat 1: Sweetness (Red) -->
          <div class="simple-stat-item stat-item-red">
            <div class="stat-top-line">
              <span class="stat-pill-badge">SWEETNESS</span>
              <span class="stat-percent">95%</span>
            </div>
            <div class="simple-bar-track">
              <div class="simple-bar-fill" style="width: 95%;"></div>
            </div>
          </div>

          <!-- Stat 2: Strength (Orange) -->
          <div class="simple-stat-item stat-item-orange">
            <div class="stat-top-line">
              <span class="stat-pill-badge">STRENGTH</span>
              <span class="stat-percent">90%</span>
            </div>
            <div class="simple-bar-track">
              <div class="simple-bar-fill" style="width: 90%;"></div>
            </div>
          </div>

          <!-- Stat 3: Athleticism (Yellow) -->
          <div class="simple-stat-item stat-item-yellow">
            <div class="stat-top-line">
              <span class="stat-pill-badge">ATHLETICISM</span>
              <span class="stat-percent">96%</span>
            </div>
            <div class="simple-bar-track">
              <div class="simple-bar-fill" style="width: 96%;"></div>
            </div>
          </div>

          <!-- Stat 4: Loyalty (Blue) -->
          <div class="simple-stat-item stat-item-blue">
            <div class="stat-top-line">
              <span class="stat-pill-badge">LOYALTY</span>
              <span class="stat-percent">100%</span>
            </div>
            <div class="simple-bar-track">
              <div class="simple-bar-fill" style="width: 100%;"></div>
            </div>
          </div>

          <!-- Stat 5: Pakikisama (Green) -->
          <div class="simple-stat-item stat-item-green">
            <div class="stat-top-line">
              <span class="stat-pill-badge">PAKIKISAMA</span>
              <span class="stat-percent">99%</span>
            </div>
            <div class="simple-bar-track">
              <div class="simple-bar-fill" style="width: 99%;"></div>
            </div>
          </div>

          <!-- Stat 6: Trippings (Violet) -->
          <div class="simple-stat-item stat-item-violet">
            <div class="stat-top-line">
              <span class="stat-pill-badge">TRIPPINGS</span>
              <span class="stat-percent">99%</span>
            </div>
            <div class="simple-bar-track">
              <div class="simple-bar-fill" style="width: 99%;"></div>
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
        <span class="prompt-symbol">$</span> ./propose_hangout.py>
      </div>
      <div class="term-output" id="coffee-term-content">
        <p class="term-line text large">
          Since you've reached this far I would like to ask you if you want to hangout with me someday? or maybe on thursday or sunday church? =^.^=
        </p>
        <p class="term-line text large">
          No worries the choice is yours no pressure hehe :> (maybe meron slight HAHAHAHAH)
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
            <div class="victory-gif-wrapper">
              <img src="/gif2.gif" alt="Victory GIF" class="victory-gif" />
            </div>
            <p class="term-line success">🎉 Yippeee!</p>
            <br/>
            <button class="pink-term-btn yes" id="victory-close-btn">[ YIPPEEEE CAN'T WAIT TO SEE YOU ]</button>
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
            <div class="victory-gif-wrapper">
              <img src="/gif.gif" alt="GIF" class="victory-gif" />
            </div>
            <p class="term-line text">
              No worries I understand :> .Thank you so much for taking the time to read all these wish you have a great day ahead :>
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
