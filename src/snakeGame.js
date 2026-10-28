/**
 * Minimalist Classic Snake Game ("لعبة التعبان")
 * Hand-crafted with vanilla JS, HTML5 Canvas, HiDPI support, and dual touch/keyboard controls.
 */

export class SnakeGame {
  constructor() {
    this.canvas = document.getElementById('snake-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    // UI elements
    this.scoreEl = document.getElementById('game-current-score');
    this.bestEl = document.getElementById('game-best-score');
    this.startBtn = document.getElementById('game-start-btn');
    this.btnText = document.getElementById('game-btn-text');
    this.overlay = document.getElementById('game-overlay');
    this.overlayTitle = document.getElementById('game-overlay-title');
    this.overlayMsg = document.getElementById('game-overlay-msg');
    this.overlayBtn = document.getElementById('game-overlay-btn');
    this.dpadBtns = document.querySelectorAll('.dpad-btn');

    // Grid configuration
    this.gridSize = 20; // 20x20 cells
    this.tileCount = 20;

    // Game state
    this.state = 'IDLE'; // 'IDLE' | 'PLAYING' | 'PAUSED' | 'GAME_OVER'
    this.score = 0;
    this.bestScore = this.loadBestScore();
    this.snake = [];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.inputQueue = [];
    this.food = { x: 14, y: 10 };
    this.particles = [];
    this.loopId = null;
    this.lastTickTime = 0;
    this.baseSpeed = 115; // ms per step
    this.currentSpeed = 115;

    this.init();
  }

  loadBestScore() {
    try {
      const stored = localStorage.getItem('omar_portfolio_snake_best');
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  }

  saveBestScore(val) {
    try {
      localStorage.setItem('omar_portfolio_snake_best', String(val));
    } catch {}
  }

  init() {
    this.setupCanvasDPI();
    window.addEventListener('resize', () => this.setupCanvasDPI());

    if (this.bestEl) {
      this.bestEl.textContent = String(this.bestScore);
    }

    this.resetGameState();
    this.bindEvents();
    this.render();
  }

  setupCanvasDPI() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const size = Math.min(rect.width || 380, 400);
    this.canvas.width = size * dpr;
    this.canvas.height = size * dpr;
    this.ctx.resetTransform?.();
    this.ctx.scale(dpr, dpr);

    this.displaySize = size;
    this.cellSize = size / this.gridSize;
  }

  resetGameState() {
    const mid = Math.floor(this.gridSize / 2);
    this.snake = [
      { x: mid, y: mid },
      { x: mid - 1, y: mid },
      { x: mid - 2, y: mid }
    ];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.inputQueue = [];
    this.score = 0;
    this.currentSpeed = this.baseSpeed;
    this.particles = [];
    this.spawnFood();

    if (this.scoreEl) this.scoreEl.textContent = '0';
  }

  spawnFood() {
    let newFood;
    let collision;
    do {
      newFood = {
        x: Math.floor(Math.random() * this.gridSize),
        y: Math.floor(Math.random() * this.gridSize)
      };
      collision = this.snake.some(seg => seg.x === newFood.x && seg.y === newFood.y);
    } while (collision);

    this.food = newFood;
  }

  createFoodParticles(x, y) {
    const px = (x + 0.5) * this.cellSize;
    const py = (y + 0.5) * this.cellSize;

    for (let i = 0; i < 10; i++) {
      const angle = (Math.PI * 2 * i) / 10 + Math.random() * 0.5;
      const speed = 1.5 + Math.random() * 2.5;
      this.particles.push({
        x: px,
        y: py,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 2 + Math.random() * 2,
        alpha: 1,
        color: Math.random() > 0.4 ? '#EAAA00' : '#3A0F34'
      });
    }
  }

  bindEvents() {
    // Keyboard controls (Arrow keys + WASD)
    window.addEventListener('keydown', (e) => {
      // If user is playing or in the game section, prevent arrow keys scrolling the page
      const gameSec = document.getElementById('game');
      const inGameView = gameSec && gameSec.getBoundingClientRect().top < window.innerHeight && gameSec.getBoundingClientRect().bottom > 0;

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code) && inGameView) {
        if (this.state === 'PLAYING') {
          e.preventDefault();
        }
      }

      if (e.code === 'Space' && inGameView) {
        e.preventDefault();
        this.togglePlayPause();
        return;
      }

      let reqDir = null;
      if (e.code === 'ArrowUp' || e.code === 'KeyW') reqDir = { x: 0, y: -1 };
      else if (e.code === 'ArrowDown' || e.code === 'KeyS') reqDir = { x: 0, y: 1 };
      else if (e.code === 'ArrowLeft' || e.code === 'KeyA') reqDir = { x: -1, y: 0 };
      else if (e.code === 'ArrowRight' || e.code === 'KeyD') reqDir = { x: 1, y: 0 };

      if (reqDir) {
        if (this.state === 'IDLE' || this.state === 'GAME_OVER') {
          this.startGame();
        }
        this.queueDirection(reqDir);
      }
    });

    // Touch D-Pad buttons
    this.dpadBtns.forEach((btn) => {
      const handlePress = (e) => {
        e.preventDefault();
        if (navigator.vibrate) {
          try { navigator.vibrate(12); } catch {}
        }
        const dirAttr = btn.dataset.dir;
        let reqDir = null;
        if (dirAttr === 'UP') reqDir = { x: 0, y: -1 };
        else if (dirAttr === 'DOWN') reqDir = { x: 0, y: 1 };
        else if (dirAttr === 'LEFT') reqDir = { x: -1, y: 0 };
        else if (dirAttr === 'RIGHT') reqDir = { x: 1, y: 0 };

        if (reqDir) {
          if (this.state === 'IDLE' || this.state === 'GAME_OVER') {
            this.startGame();
          }
          this.queueDirection(reqDir);
        }
      };

      btn.addEventListener('touchstart', handlePress, { passive: false });
      btn.addEventListener('mousedown', handlePress);
    });

    // Touch Swipe gestures directly on the canvas
    let touchStartX = 0;
    let touchStartY = 0;

    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    this.canvas.addEventListener('touchend', (e) => {
      if (e.changedTouches.length > 0) {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);

        if (Math.max(absX, absY) > 25) {
          let reqDir = null;
          if (absX > absY) {
            reqDir = dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 };
          } else {
            reqDir = dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 };
          }

          if (reqDir) {
            if (this.state === 'IDLE' || this.state === 'GAME_OVER') {
              this.startGame();
            }
            this.queueDirection(reqDir);
          }
        }
      }
    }, { passive: true });

    // Buttons
    if (this.startBtn) {
      this.startBtn.addEventListener('click', () => {
        this.togglePlayPause();
      });
    }

    if (this.overlayBtn) {
      this.overlayBtn.addEventListener('click', () => {
        this.startGame();
      });
    }
  }

  queueDirection(newDir) {
    // Prevent immediate 180-degree reverse turns
    const last = this.inputQueue.length > 0 ? this.inputQueue[this.inputQueue.length - 1] : this.direction;
    if (newDir.x === -last.x && newDir.y === -last.y) return;
    if (newDir.x === last.x && newDir.y === last.y) return;

    if (this.inputQueue.length < 3) {
      this.inputQueue.push(newDir);
    }
  }

  togglePlayPause() {
    if (this.state === 'PLAYING') {
      this.pauseGame();
    } else if (this.state === 'PAUSED') {
      this.resumeGame();
    } else {
      this.startGame();
    }
  }

  startGame() {
    this.resetGameState();
    this.state = 'PLAYING';
    this.hideOverlay();
    this.updateControlsUI();
    this.lastTickTime = performance.now();
    this.runLoop();
  }

  pauseGame() {
    this.state = 'PAUSED';
    if (this.loopId) cancelAnimationFrame(this.loopId);
    this.showOverlay('pause');
    this.updateControlsUI();
  }

  resumeGame() {
    this.state = 'PLAYING';
    this.hideOverlay();
    this.updateControlsUI();
    this.lastTickTime = performance.now();
    this.runLoop();
  }

  gameOver() {
    this.state = 'GAME_OVER';
    if (this.loopId) cancelAnimationFrame(this.loopId);

    if (this.score > this.bestScore) {
      this.bestScore = this.score;
      this.saveBestScore(this.bestScore);
      if (this.bestEl) this.bestEl.textContent = String(this.bestScore);
    }

    if (navigator.vibrate) {
      try { navigator.vibrate([40, 60, 40]); } catch {}
    }

    this.showOverlay('gameOver');
    this.updateControlsUI();
  }

  showOverlay(type) {
    if (!this.overlay) return;
    const isEn = document.documentElement.lang === 'en';

    if (type === 'pause') {
      if (this.overlayTitle) this.overlayTitle.textContent = isEn ? 'Game Paused ⏸' : 'اللعبة متوقفة مؤقتاً ⏸';
      if (this.overlayMsg) this.overlayMsg.textContent = isEn ? 'Hit resume or press Spacebar to keep playing.' : 'اضغط عشان تكمل اللعب أو دوس مسافة.';
      if (this.overlayBtn) this.overlayBtn.textContent = isEn ? 'Resume Playing ▶' : 'كمّل اللعب ▶';
    } else if (type === 'gameOver') {
      if (this.overlayTitle) this.overlayTitle.textContent = isEn ? 'Game Over! 💥' : 'يا خسارة! خبطت 💥';
      if (this.overlayMsg) this.overlayMsg.textContent = isEn 
        ? `You scored ${this.score} pts! Best: ${this.bestScore}` 
        : `جبت ${this.score} نقطة! (أعلى سكور: ${this.bestScore})`;
      if (this.overlayBtn) this.overlayBtn.textContent = isEn ? 'Play Again 🔄' : 'العب تاني 🔄';
    } else {
      if (this.overlayTitle) this.overlayTitle.textContent = isEn ? 'Ready to Play?' : 'جاهز تلعب؟';
      if (this.overlayMsg) this.overlayMsg.textContent = isEn 
        ? 'Guide the snake to collect golden treats without hitting walls.' 
        : 'وجه التعبان ياكل النقط الدهبي وماتخبطش في الحيطة أو في نفسك.';
      if (this.overlayBtn) this.overlayBtn.textContent = isEn ? 'Start Game ▶' : 'ابدأ اللعب ▶';
    }

    this.overlay.classList.add('is-visible');
  }

  hideOverlay() {
    if (this.overlay) {
      this.overlay.classList.remove('is-visible');
    }
  }

  updateControlsUI() {
    const isEn = document.documentElement.lang === 'en';
    if (!this.btnText) return;

    if (this.state === 'PLAYING') {
      this.btnText.textContent = isEn ? 'Pause ⏸' : 'إيقاف مؤقت ⏸';
    } else if (this.state === 'PAUSED') {
      this.btnText.textContent = isEn ? 'Resume ▶' : 'استئناف ▶';
    } else if (this.state === 'GAME_OVER') {
      this.btnText.textContent = isEn ? 'Play Again 🔄' : 'العب تاني 🔄';
    } else {
      this.btnText.textContent = isEn ? 'Start Game ▶' : 'ابدأ اللعب ▶';
    }
  }

  runLoop() {
    if (this.state !== 'PLAYING') return;

    const now = performance.now();
    const elapsed = now - this.lastTickTime;

    if (elapsed >= this.currentSpeed) {
      this.tick();
      this.lastTickTime = now;
    }

    this.updateParticles();
    this.render();

    if (this.state === 'PLAYING') {
      this.loopId = requestAnimationFrame(() => this.runLoop());
    }
  }

  tick() {
    // Process input queue
    if (this.inputQueue.length > 0) {
      this.direction = this.inputQueue.shift();
    }

    // New head position
    const head = {
      x: this.snake[0].x + this.direction.x,
      y: this.snake[0].y + this.direction.y
    };

    // Check Wall Collision
    if (head.x < 0 || head.x >= this.gridSize || head.y < 0 || head.y >= this.gridSize) {
      this.gameOver();
      return;
    }

    // Check Self Collision
    for (let i = 0; i < this.snake.length; i++) {
      if (this.snake[i].x === head.x && this.snake[i].y === head.y) {
        this.gameOver();
        return;
      }
    }

    this.snake.unshift(head);

    // Check Food Consumption
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      if (this.scoreEl) this.scoreEl.textContent = String(this.score);

      // Accelerate slightly
      this.currentSpeed = Math.max(70, this.baseSpeed - Math.floor(this.score / 30) * 5);

      this.createFoodParticles(this.food.x, this.food.y);
      if (navigator.vibrate) {
        try { navigator.vibrate(18); } catch {}
      }

      this.spawnFood();
    } else {
      this.snake.pop();
    }
  }

  updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.035;
      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  render() {
    if (!this.ctx || !this.cellSize) return;
    const ctx = this.ctx;
    const size = this.displaySize;
    const cs = this.cellSize;

    // Background
    ctx.fillStyle = '#ECEFF2';
    ctx.fillRect(0, 0, size, size);

    // Draw subtle grid dots
    ctx.fillStyle = 'rgba(58, 15, 52, 0.07)';
    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        ctx.fillRect(x * cs + cs / 2 - 1, y * cs + cs / 2 - 1, 2, 2);
      }
    }

    // Draw Food (Pulsing Marigold Gem)
    const fx = this.food.x * cs;
    const fy = this.food.y * cs;
    const pad = cs * 0.18;
    const pulse = 1 + Math.sin(performance.now() * 0.008) * 0.08;
    const fSize = (cs - pad * 2) * pulse;
    const fOffset = (cs - fSize) / 2;

    // Food glow
    ctx.fillStyle = 'rgba(234, 170, 0, 0.35)';
    ctx.beginPath();
    ctx.arc(fx + cs / 2, fy + cs / 2, cs * 0.55 * pulse, 0, Math.PI * 2);
    ctx.fill();

    // Food body
    ctx.fillStyle = '#EAAA00';
    this.roundRect(ctx, fx + fOffset, fy + fOffset, fSize, fSize, fSize * 0.45);
    ctx.fill();

    // Food highlight dot
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(fx + cs * 0.4, fy + cs * 0.38, cs * 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Draw Snake Segments
    this.snake.forEach((seg, i) => {
      const isHead = i === 0;
      const sx = seg.x * cs;
      const sy = seg.y * cs;
      const sPad = isHead ? cs * 0.08 : cs * 0.12;
      const sSize = cs - sPad * 2;
      const rad = isHead ? sSize * 0.38 : sSize * 0.28;

      // Color: Head is deep aubergine, body softens slightly down the tail
      const alpha = Math.max(0.75, 1 - (i / this.snake.length) * 0.22);
      ctx.fillStyle = `rgba(58, 15, 52, ${alpha})`;
      this.roundRect(ctx, sx + sPad, sy + sPad, sSize, sSize, rad);
      ctx.fill();

      // Eyes on the head
      if (isHead) {
        ctx.fillStyle = '#FFFFFF';
        let e1 = { x: 0, y: 0 };
        let e2 = { x: 0, y: 0 };

        if (this.direction.x === 1) { // Right
          e1 = { x: sx + cs * 0.7, y: sy + cs * 0.3 };
          e2 = { x: sx + cs * 0.7, y: sy + cs * 0.7 };
        } else if (this.direction.x === -1) { // Left
          e1 = { x: sx + cs * 0.3, y: sy + cs * 0.3 };
          e2 = { x: sx + cs * 0.3, y: sy + cs * 0.7 };
        } else if (this.direction.y === 1) { // Down
          e1 = { x: sx + cs * 0.3, y: sy + cs * 0.7 };
          e2 = { x: sx + cs * 0.7, y: sy + cs * 0.7 };
        } else { // Up
          e1 = { x: sx + cs * 0.3, y: sy + cs * 0.3 };
          e2 = { x: sx + cs * 0.7, y: sy + cs * 0.3 };
        }

        ctx.beginPath();
        ctx.arc(e1.x, e1.y, cs * 0.12, 0, Math.PI * 2);
        ctx.arc(e2.x, e2.y, cs * 0.12, 0, Math.PI * 2);
        ctx.fill();

        // Marigold Pupils
        ctx.fillStyle = '#EAAA00';
        ctx.beginPath();
        ctx.arc(e1.x, e1.y, cs * 0.06, 0, Math.PI * 2);
        ctx.arc(e2.x, e2.y, cs * 0.06, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw Particles
    this.particles.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1.0;
    });
  }

  roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
}
