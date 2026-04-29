// Sistema de Combate

class Enemy {
    constructor(name, level, type = 'goblin') {
        this.name = name;
        this.level = level;
        this.type = type;
        this.icon = this.getIcon();
        
        // Calcular stats baseado no nível
        const levelMultiplier = 1 + (level - 1) * 0.1;
        this.maxHp = Math.round(50 * levelMultiplier);
        this.hp = this.maxHp;
        this.attack = Math.round(8 * levelMultiplier);
        this.defense = Math.round(3 * levelMultiplier);
        this.speed = randomInt(5, 12);
        this.expReward = level * 25;
        this.goldReward = level * 10;
    }
    
    getIcon() {
        const icons = {
            goblin: '👺',
            orc: '🗣️',
            skeleton: '💀',
            dragon: '🐉',
            wolf: '🐺',
            spider: '🕷️',
            ghost: '👻',
            demon: '😈'
        };
        return icons[this.type] || '👹';
    }
    
    takeDamage(damage) {
        const actualDamage = Math.max(1, damage - Math.floor(this.defense / 2));
        this.hp = Math.max(0, this.hp - actualDamage);
        return actualDamage;
    }
    
    isAlive() {
        return this.hp > 0;
    }
}

class Combat {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        this.turn = 0;
        this.log = [];
        this.isPlayerTurn = player.speed >= enemy.speed;
        this.gameOver = false;
        this.winner = null;
    }
    
    addLog(message, type = 'info') {
        this.log.push({ message, type, timestamp: Date.now() });
    }
    
    playerAttack() {
        if (!this.player.isAlive() || !this.enemy.isAlive()) return false;
        
        let damage = calculateDamage(this.player.attack);
        
        if (isCriticalHit(0.15 + this.player.luck / 100)) {
            damage *= 1.5;
            this.addLog(`⭐ ATAQUE CRÍTICO! ${this.player.name} causou ${Math.round(damage)} de dano!`, 'critical');
        } else {
            this.addLog(`${this.player.name} atacou ${this.enemy.name} com ${Math.round(damage)} de dano!`, 'damage');
        }
        
        const actualDamage = this.enemy.takeDamage(damage);
        
        if (!this.enemy.isAlive()) {
            this.endCombat(true);
        }
        
        return true;
    }
    
    playerDefend() {
        if (!this.player.isAlive()) return false;
        
        this.player.defense += 5;
        this.addLog(`${this.player.name} se defendeu! Defesa aumentada em 5.`, 'info');
        
        return true;
    }
    
    playerUseAbility(abilityIndex) {
        const ability = this.player.useAbility(abilityIndex);
        if (!ability) return false;
        
        let damage = calculateDamage(this.player.attack * 1.2);
        const actualDamage = this.enemy.takeDamage(damage);
        
        this.addLog(`${this.player.name} usou ${ability.name} causando ${actualDamage} de dano!`, 'ability');
        
        if (!this.enemy.isAlive()) {
            this.endCombat(true);
        }
        
        return true;
    }
    
    playerUseItem(itemName) {
        const result = this.player.useItem(itemName);
        if (result) {
            this.addLog(`${this.player.name} usou ${itemName}!`, 'info');
            return true;
        }
        return false;
    }
    
    enemyAttack() {
        if (!this.enemy.isAlive() || !this.player.isAlive()) return false;
        
        let damage = calculateDamage(this.enemy.attack);
        
        if (isCriticalHit(0.1)) {
            damage *= 1.3;
            this.addLog(`⭐ ${this.enemy.name} fez um ataque crítico com ${Math.round(damage)} de dano!`, 'critical');
        } else {
            this.addLog(`${this.enemy.name} atacou ${this.player.name} com ${Math.round(damage)} de dano!`, 'damage');
        }
        
        const actualDamage = this.player.takeDamage(damage);
        
        if (!this.player.isAlive()) {
            this.endCombat(false);
        }
        
        return true;
    }
    
    nextTurn() {
        if (this.gameOver) return;
        
        this.turn++;
        this.isPlayerTurn = !this.isPlayerTurn;
        
        if (!this.isPlayerTurn) {
            this.enemyAttack();
            this.isPlayerTurn = true;
        }
    }
    
    endCombat(playerWon) {
        this.gameOver = true;
        this.winner = playerWon;
        
        if (playerWon) {
            this.player.gainExp(this.enemy.expReward);
            this.player.gainGold(this.enemy.goldReward);
            this.addLog(`🎉 Vitória! ${this.player.name} ganhou ${this.enemy.expReward} EXP e ${this.enemy.goldReward} ouro!`, 'success');
        } else {
            this.addLog(`💀 Derrota! ${this.player.name} foi derrotado por ${this.enemy.name}!`, 'danger');
        }
    }
}

// Variável global de combate
let currentCombat = null;
