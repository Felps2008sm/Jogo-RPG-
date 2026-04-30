// ==================== CONFIGURAÇÃO DO JOGO ====================

class Game {
    constructor() {
        this.player = null;
        this.gameState = 'creation'; // creation, playing, paused, dead
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.camera = { x: 0, y: 0 };
        this.entities = [];
        this.enemies = [];
        this.items = [];
        this.particles = [];
        this.gameTime = 0;
        this.isPaused = false;
        this.selectedClass = 'warrior';
        
        // World
        this.worldWidth = 3000;
        this.worldHeight = 1500;
        this.blocks = [];
        this.generateWorld();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupCharacterPreview();
        this.animate();
    }

    setupEventListeners() {
        // Character Creation
        document.querySelectorAll('.class-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectClass(e));
        });

        document.getElementById('bodyColor').addEventListener('input', (e) => {
            document.getElementById('bodyColorCode').textContent = e.target.value;
            this.drawCharacterPreview();
        });

        document.getElementById('clothColor').addEventListener('input', (e) => {
            document.getElementById('clothColorCode').textContent = e.target.value;
            this.drawCharacterPreview();
        });

        document.getElementById('hairColor').addEventListener('input', (e) => {
            document.getElementById('hairColorCode').textContent = e.target.value;
            this.drawCharacterPreview();
        });

        document.querySelectorAll('.preset').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.getElementById('bodyColor').value = '#FF6B6B';
                document.getElementById('clothColor').value = '#4ECDC4';
                this.drawCharacterPreview();
            });
        });

        document.getElementById('startGameBtn').addEventListener('click', () => this.startGame());

        // Game Controls
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('click', (e) => this.handleClick(e));

        // UI Buttons
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('resumeBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('inventoryBtn').addEventListener('click', () => this.showInventory());
        document.getElementById('statsBtn').addEventListener('click', () => this.showStats());
        document.getElementById('mainMenuBtn').addEventListener('click', () => this.mainMenu());
        document.getElementById('respawnBtn').addEventListener('click', () => this.respawn());
        document.getElementById('menuBtn').addEventListener('click', () => this.mainMenu());

        // Modal close buttons
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').classList.add('hidden');
            });
        });
    }

    selectClass(e) {
        document.querySelectorAll('.class-card').forEach(c => c.classList.remove('selected'));
        e.currentTarget.classList.add('selected');
        this.selectedClass = e.currentTarget.dataset.class;
        this.updatePreviewStats();
    }

    setupCharacterPreview() {
        this.drawCharacterPreview();
        this.updatePreviewStats();
    }

    drawCharacterPreview() {
        const canvas = document.getElementById('characterCanvas');
        const ctx = canvas.getContext('2d');
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        const bodyColor = document.getElementById('bodyColor').value;
        const clothColor = document.getElementById('clothColor').value;
        const hairColor = document.getElementById('hairColor').value;

        // Cabeça
        ctx.fillStyle = bodyColor;
        ctx.beginPath();
        ctx.arc(centerX, centerY - 40, 20, 0, Math.PI * 2);
        ctx.fill();

        // Cabelo
        ctx.fillStyle = hairColor;
        ctx.fillRect(centerX - 20, centerY - 60, 40, 25);

        // Corpo
        ctx.fillStyle = clothColor;
        ctx.fillRect(centerX - 15, centerY - 20, 30, 40);

        // Braços
        ctx.fillStyle = bodyColor;
        ctx.fillRect(centerX - 25, centerY - 15, 10, 35);
        ctx.fillRect(centerX + 15, centerY - 15, 10, 35);

        // Pernas
        ctx.fillStyle = '#333';
        ctx.fillRect(centerX - 12, centerY + 20, 10, 30);
        ctx.fillRect(centerX + 2, centerY + 20, 10, 30);

        // Olhos
        ctx.fillStyle = '#000';
        ctx.fillRect(centerX - 8, centerY - 45, 4, 4);
        ctx.fillRect(centerX + 4, centerY - 45, 4, 4);
    }

    updatePreviewStats() {
        const stats = {
            warrior: { hp: 150, mana: 30, atk: 15, def: 8, spd: 6 },
            mage: { hp: 80, mana: 150, atk: 10, def: 4, spd: 7 },
            archer: { hp: 100, mana: 50, atk: 13, def: 5, spd: 12 },
            paladin: { hp: 130, mana: 80, atk: 12, def: 10, spd: 8 }
        };

        const s = stats[this.selectedClass];
        document.getElementById('previewHPText').textContent = `${s.hp}/${s.hp}`;
        document.getElementById('previewManaText').textContent = `${s.mana}/${s.mana}`;
        document.getElementById('previewAttack').textContent = s.atk;
        document.getElementById('previewDefense').textContent = s.def;
        document.getElementById('previewSpeed').textContent = s.spd;

        document.getElementById('previewHP').style.width = '100%';
        document.getElementById('previewMana').style.width = '100%';
    }

    startGame() {
        const name = document.getElementById('playerName').value.trim();
        const difficulty = document.querySelector('input[name="difficulty"]:checked').value;

        if (!name) {
            alert('Por favor, digite um nome para seu personagem!');
            return;
        }

        this.player = new Player(
            name,
            this.selectedClass,
            difficulty,
            document.getElementById('bodyColor').value,
            document.getElementById('clothColor').value,
            document.getElementById('hairColor').value
        );

        this.gameState = 'playing';
        document.getElementById('characterScreen').classList.remove('active');
        document.getElementById('gameScreen').classList.add('active');

        this.updatePlayerUI();
        this.spawnInitialEnemies();
        this.addLog(`Bem-vindo, ${this.player.name}! Sua aventura começou.`);
    }

    generateWorld() {
        for (let x = 0; x < this.worldWidth; x += 40) {
            for (let y = 900; y < this.worldHeight; y += 40) {
                this.blocks.push({
                    x: x,
                    y: y,
                    width: 40,
                    height: 40,
                    type: 'dirt'
                });
            }
        }

        for (let i = 0; i < 20; i++) {
            const x = Math.random() * this.worldWidth;
            const y = Math.random() * 600 + 200;
            this.items.push(new Item(x, y, 'wood', '🌳'));
        }
    }

    spawnInitialEnemies() {
        for (let i = 0; i < 5; i++) {
            const x = this.player.x + (Math.random() - 0.5) * 600;
            const y = this.player.y - 200;
            const types = ['goblin', 'skeleton', 'slime', 'bat'];
            const type = types[Math.floor(Math.random() * types.length)];
            this.enemies.push(new Enemy(x, y, type));
        }
    }

    handleKeyDown(e) {
        if (!this.player || this.gameState !== 'playing') return;

        switch(e.key.toLowerCase()) {
            case 'arrowleft':
            case 'a':
                this.player.moveLeft = true;
                break;
            case 'arrowright':
            case 'd':
                this.player.moveRight = true;
                break;
            case ' ':
                e.preventDefault();
                this.player.jump();
                break;
            case 'p':
                this.togglePause();
                break;
            case 'i':
                this.showInventory();
                break;
        }
    }

    handleKeyUp(e) {
        if (!this.player) return;

        switch(e.key.toLowerCase()) {
            case 'arrowleft':
            case 'a':
                this.player.moveLeft = false;
                break;
            case 'arrowright':
            case 'd':
                this.player.moveRight = false;
                break;
        }
    }

    handleMouseMove(e) {
        if (!this.player || this.gameState !== 'playing') return;
        this.player.mouseX = e.clientX;
        this.player.mouseY = e.clientY;
    }

    handleClick(e) {
        if (!this.player || this.gameState !== 'playing') return;
        if (e.target.tagName === 'BUTTON') return;

        this.player.attack();
    }

    togglePause() {
        if (this.gameState !== 'playing') return;
        
        this.isPaused = !this.isPaused;
        document.getElementById('pauseScreen').classList.toggle('active');
    }

    showInventory() {
        document.getElementById('inventoryModal').classList.remove('hidden');
        this.updateInventoryUI();
    }

    showStats() {
        document.getElementById('statsModal').classList.remove('hidden');
        this.updateStatsUI();
    }

    updateInventoryUI() {
        const grid = document.getElementById('inventoryGrid');
        grid.innerHTML = '';

        if (this.player.inventory.length === 0) {
            document.getElementById('emptyInventory').style.display = 'block';
            return;
        }

        document.getElementById('emptyInventory').style.display = 'none';

        this.player.inventory.forEach((item, i) => {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot';
            slot.textContent = item.icon;
            slot.title = item.name;
            grid.appendChild(slot);
        });
    }

    updateStatsUI() {
        const grid = document.getElementById('statsGrid');
        grid.innerHTML = `
            <div class="stat-card">
                <h3>Classe</h3>
                <div class="value">${this.player.class.toUpperCase()}</div>
            </div>
            <div class="stat-card">
                <h3>Nível</h3>
                <div class="value">${this.player.level}</div>
            </div>
            <div class="stat-card">
                <h3>Experiência</h3>
                <div class="value">${this.player.exp}/${this.player.expToNextLevel}</div>
            </div>
            <div class="stat-card">
                <h3>Ouro</h3>
                <div class="value">${this.player.gold}</div>
            </div>
            <div class="stat-card">
                <h3>Ataque</h3>
                <div class="value">${this.player.attack}</div>
            </div>
            <div class="stat-card">
                <h3>Defesa</h3>
                <div class="value">${this.player.defense}</div>
            </div>
            <div class="stat-card">
                <h3>Velocidade</h3>
                <div class="value">${this.player.speed}</div>
            </div>
            <div class="stat-card">
                <h3>Inimigos Derrotados</h3>
                <div class="value">${this.player.enemiesDefeated}</div>
            </div>
        `;
    }

    mainMenu() {
        location.reload();
    }

    respawn() {
        this.player.hp = this.player.maxHp;
        this.player.x = 400;
        this.player.y = 400;
        this.gameState = 'playing';
        document.getElementById('deathScreen').classList.remove('active');
        document.getElementById('gameScreen').classList.add('active');
        this.addLog('Você ressuscitou!');
    }

    addLog(message) {
        const log = document.getElementById('eventsList');
        const item = document.createElement('div');
        item.className = 'event-item';
        item.textContent = message;
        log.insertBefore(item, log.firstChild);
        if (log.children.length > 20) log.removeChild(log.lastChild);
    }

    updatePlayerUI() {
        document.getElementById('playerTitle').textContent = this.player.name;
        this.updateUI();
    }

    updateUI() {
        if (!this.player) return;

        const hpPercent = (this.player.hp / this.player.maxHp) * 100;
        const manaPercent = (this.player.mana / this.player.maxMana) * 100;

        document.getElementById('hpBar').style.width = hpPercent + '%';
        document.getElementById('manaBar').style.width = manaPercent + '%';
        document.getElementById('hpText').textContent = `${Math.ceil(this.player.hp)}/${this.player.maxHp}`;
        document.getElementById('manaText').textContent = `${Math.ceil(this.player.mana)}/${this.player.maxMana}`;

        document.getElementById('displayLevel').textContent = this.player.level;
        document.getElementById('displayExp').textContent = `${this.player.exp}/${this.player.expToNextLevel}`;
        document.getElementById('displayGold').textContent = this.player.gold;

        document.getElementById('attackValue').textContent = this.player.attack;
        document.getElementById('defenseValue').textContent = this.player.defense;
        document.getElementById('speedValue').textContent = this.player.speed;
        document.getElementById('luckValue').textContent = this.player.luck;
    }

    update() {
        if (this.isPaused || !this.player) return;

        this.gameTime++;
        this.player.update();

        this.enemies.forEach((enemy, i) => {
            enemy.update(this.player);
            
            if (enemy.isCollidingWith(this.player)) {
                this.player.takeDamage(2);
            }

            if (this.player.attackRange) {
                if (enemy.isCollidingWith(this.player.attackRange)) {
                    const damage = this.player.attack + Math.random() * 5;
                    enemy.takeDamage(damage);
                    this.createDamageText(enemy.x, enemy.y, damage);

                    if (enemy.hp <= 0) {
                        this.player.gainExp(enemy.expReward);
                        this.player.gold += enemy.goldReward;
                        this.player.enemiesDefeated++;
                        this.enemies.splice(i, 1);
                        this.addLog(`Você derrotou um ${enemy.type}! +${enemy.expReward} EXP`);

                        if (Math.random() < 0.3) {
                            this.items.push(new Item(enemy.x, enemy.y, 'potion', '🧪'));
                        }
                    }
                }
            }
        });

        if (this.enemies.length < 3 && Math.random() < 0.01) {
            const x = this.player.x + (Math.random() - 0.5) * 800;
            const y = Math.max(0, this.player.y - 300);
            const types = ['goblin', 'skeleton', 'slime', 'bat', 'spider'];
            const type = types[Math.floor(Math.random() * types.length)];
            this.enemies.push(new Enemy(x, y, type));
        }

        this.items.forEach((item, i) => {
            if (item.isCollidingWith(this.player)) {
                this.player.addItem(item);
                this.items.splice(i, 1);
                this.addLog(`+${item.name}`);
            }
        });

        this.particles.forEach((p, i) => {
            p.update();
            if (p.life <= 0) this.particles.splice(i, 1);
        });

        this.camera.x = this.player.x - this.canvas.width / 2;
        this.camera.y = this.player.y - this.canvas.height / 2;

        if (this.player.hp <= 0) {
            this.gameState = 'dead';
            document.getElementById('deathScreen').classList.add('active');
            document.getElementById('gameScreen').classList.remove('active');
            this.addLog('Você foi derrotado!');
        }

        this.updateUI();
    }

    draw() {
        this.ctx.fillStyle = '#87ceeb';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        this.ctx.translate(-this.camera.x, -this.camera.y);

        this.blocks.forEach(block => {
            if (block.x - this.camera.x > -50 && block.x - this.camera.x < this.canvas.width + 50) {
                this.ctx.fillStyle = '#8B7355';
                this.ctx.fillRect(block.x, block.y, block.width, block.height);
                this.ctx.strokeStyle = '#654321';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(block.x, block.y, block.width, block.height);
            }
        });

        this.items.forEach(item => {
            this.ctx.fillStyle = '#FFD700';
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(item.icon, item.x, item.y);
        });

        this.enemies.forEach(enemy => enemy.draw(this.ctx));

        if (this.player) this.player.draw(this.ctx);

        this.particles.forEach(p => p.draw(this.ctx));

        this.ctx.restore();
    }

    createDamageText(x, y, damage) {
        this.particles.push(new DamageText(x, y, Math.ceil(damage)));
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// ==================== CLASSE PLAYER ====================

class Player {
    constructor(name, className, difficulty, bodyColor, clothColor, hairColor) {
        this.name = name;
        this.class = className;
        this.difficulty = difficulty;
        this.bodyColor = bodyColor;
        this.clothColor = clothColor;
        this.hairColor = hairColor;

        const stats = {
            warrior: { hp: 150, mana: 30, atk: 15, def: 8, spd: 6 },
            mage: { hp: 80, mana: 150, atk: 10, def: 4, spd: 7 },
            archer: { hp: 100, mana: 50, atk: 13, def: 5, spd: 12 },
            paladin: { hp: 130, mana: 80, atk: 12, def: 10, spd: 8 }
        };

        const s = stats[className];
        this.maxHp = s.hp * (difficulty === 'hard' ? 0.8 : difficulty === 'nightmare' ? 0.6 : 1);
        this.hp = this.maxHp;
        this.maxMana = s.mana;
        this.mana = this.maxMana;
        this.attack = s.atk;
        this.defense = s.def;
        this.speed = s.spd;
        this.luck = 5;

        this.x = 400;
        this.y = 400;
        this.width = 30;
        this.height = 40;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isJumping = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.attackRange = null;
        this.attackCooldown = 0;

        this.level = 1;
        this.exp = 0;
        this.expToNextLevel = 100;
        this.gold = 0;
        this.inventory = [];
        this.enemiesDefeated = 0;
    }

    update() {
        if (this.moveLeft) this.velocityX = -this.speed;
        else if (this.moveRight) this.velocityX = this.speed;
        else this.velocityX *= 0.8;

        this.velocityY += 0.5;
        if (this.y + this.height >= 900) {
            this.y = 900 - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        }

        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.x < 0) this.x = 0;
        if (this.x + this.width > 3000) this.x = 3000 - this.width;

        if (this.hp < this.maxHp) this.hp += 0.1;
        if (this.mana < this.maxMana) this.mana += 0.3;

        if (this.attackCooldown > 0) this.attackCooldown--;
        this.attackRange = null;
    }

    jump() {
        if (!this.isJumping) {
            this.velocityY = -12;
            this.isJumping = true;
        }
    }

    attack() {
        if (this.attackCooldown > 0) return;

        this.attackCooldown = 15;
        const range = { x: this.x - 40, y: this.y - 40, width: 80, height: 80 };
        this.attackRange = range;
    }

    takeDamage(damage) {
        const actualDamage = Math.max(1, damage - (this.defense * 0.5));
        this.hp -= actualDamage;
    }

    gainExp(amount) {
        this.exp += amount;
        if (this.exp >= this.expToNextLevel) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.exp -= this.expToNextLevel;
        this.expToNextLevel = Math.ceil(this.expToNextLevel * 1.2);
        
        this.maxHp += 20;
        this.hp = this.maxHp;
        this.maxMana += 10;
        this.mana = this.maxMana;
        this.attack += 2;
        this.defense += 1;
    }

    addItem(item) {
        this.inventory.push(item);
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.bodyColor;

        ctx.beginPath();
        ctx.arc(this.x + 15, this.y, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = this.hairColor;
        ctx.fillRect(this.x + 3, this.y - 12, 24, 12);

        ctx.fillStyle = this.clothColor;
        ctx.fillRect(this.x + 5, this.y + 12, 20, 18);

        ctx.fillStyle = this.bodyColor;
        ctx.fillRect(this.x - 2, this.y + 10, 6, 15);
        ctx.fillRect(this.x + 26, this.y + 10, 6, 15);

        ctx.fillStyle = '#333';
        ctx.fillRect(this.x + 8, this.y + 30, 5, 10);
        ctx.fillRect(this.x + 17, this.y + 30, 5, 10);

        ctx.restore();

        ctx.fillStyle = '#FF4444';
        ctx.fillRect(this.x - 15, this.y - 25, 30, 4);
        ctx.fillStyle = '#44FF44';
        ctx.fillRect(this.x - 15, this.y - 25, (this.hp / this.maxHp) * 30, 4);
    }
}

// ==================== CLASSE ENEMY ====================

class Enemy {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.width = 25;
        this.height = 30;
        this.velocityX = 0;
        this.velocityY = 0;

        const types = {
            goblin: { hp: 30, atk: 5, spd: 3, exp: 25, gold: 10, color: '#22AA22' },
            skeleton: { hp: 40, atk: 7, spd: 2, exp: 35, gold: 15, color: '#CCCCCC' },
            slime: { hp: 20, atk: 3, spd: 2, exp: 15, gold: 5, color: '#00FF00' },
            bat: { hp: 25, atk: 6, spd: 5, exp: 20, gold: 8, color: '#333333' },
            spider: { hp: 35, atk: 8, spd: 3, exp: 30, gold: 12, color: '#552200' }
        };

        const t = types[type];
        this.maxHp = t.hp;
        this.hp = this.maxHp;
        this.attack = t.atk;
        this.speed = t.spd;
        this.expReward = t.exp;
        this.goldReward = t.gold;
        this.color = t.color;
    }

    update(player) {
        if (player.x < this.x) this.velocityX = -this.speed;
        else this.velocityX = this.speed;

        this.velocityY += 0.5;
        if (this.y + this.height >= 900) {
            this.y = 900 - this.height;
            this.velocityY = 0;
        }

        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    takeDamage(damage) {
        this.hp -= damage;
    }

    isCollidingWith(rect) {
        return this.x < rect.x + rect.width &&
               this.x + this.width > rect.x &&
               this.y < rect.y + rect.height &&
               this.y + this.height > rect.y;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = '#FF4444';
        ctx.fillRect(this.x - 5, this.y - 10, this.width + 10, 3);
        ctx.fillStyle = '#44FF44';
        ctx.fillRect(this.x - 5, this.y - 10, ((this.hp / this.maxHp) * (this.width + 10)), 3);
    }
}

// ==================== CLASSE ITEM ====================

class Item {
    constructor(x, y, type, icon) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.icon = icon;
        this.name = type.charAt(0).toUpperCase() + type.slice(1);
        this.width = 20;
        this.height = 20;
    }

    isCollidingWith(rect) {
        return this.x < rect.x + rect.width &&
               this.x + this.width > rect.x &&
               this.y < rect.y + rect.height &&
               this.y + this.height > rect.y;
    }
}

// ==================== CLASSE DAMAGE TEXT ====================

class DamageText {
    constructor(x, y, damage) {
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.life = 60;
        this.velocityY = -2;
    }

    update() {
        this.y += this.velocityY;
        this.life--;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = `rgba(255, 100, 100, ${this.life / 60})`;
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.damage, this.x, this.y);
        ctx.restore();
    }
}

// ==================== INICIAR JOGO ====================

const game = new Game();
