// Sistema de Jogador

class Player {
    constructor(name, className, color) {
        this.name = name;
        this.className = className;
        this.color = color;
        this.level = 1;
        this.exp = 0;
        this.expNeeded = 100;
        this.gold = 0;
        
        // Stats base
        const baseStats = getClassStats(className);
        this.maxHp = baseStats.hp;
        this.hp = this.maxHp;
        this.maxMana = baseStats.mana;
        this.mana = this.maxMana;
        this.maxStamina = baseStats.stamina;
        this.stamina = this.maxStamina;
        this.attack = baseStats.attack;
        this.defense = baseStats.defense;
        this.speed = baseStats.speed;
        this.luck = baseStats.luck;
        
        // Inventário e habilidades
        this.inventory = [];
        this.abilities = getClassAbilities(className).map(ability => ({
            ...ability,
            currentCooldown: 0
        }));
        this.quests = [];
        this.completedQuests = [];
        this.position = 0; // Posição no mapa
    }
    
    // Ganhar experiência
    gainExp(amount) {
        this.exp += amount;
        gameLog(`${this.name} ganhou ${amount} de experiência`);
        
        if (this.exp >= this.expNeeded) {
            this.levelUp();
        }
        
        return this.exp >= this.expNeeded;
    }
    
    // Subir de nível
    levelUp() {
        this.level++;
        this.exp = 0;
        this.expNeeded = Math.round(this.expNeeded * 1.1);
        
        // Aumentar stats
        const increase = 10 + (this.level * 2);
        this.maxHp += increase;
        this.hp = this.maxHp;
        this.maxMana += Math.round(increase * 0.6);
        this.mana = this.maxMana;
        this.maxStamina += Math.round(increase * 0.7);
        this.stamina = this.maxStamina;
        this.attack += 2;
        this.defense += 1;
        this.speed += 1;
        
        gameLog(`${this.name} subiu para o nível ${this.level}!`);
    }
    
    // Tomar dano
    takeDamage(damage) {
        const actualDamage = Math.max(1, damage - Math.floor(this.defense / 2));
        this.hp = Math.max(0, this.hp - actualDamage);
        gameLog(`${this.name} tomou ${actualDamage} de dano`);
        return actualDamage;
    }
    
    // Recuperar HP
    heal(amount) {
        const healed = Math.min(amount, this.maxHp - this.hp);
        this.hp += healed;
        gameLog(`${this.name} recuperou ${healed} de HP`);
        return healed;
    }
    
    // Usar mana
    useMana(amount) {
        if (this.mana >= amount) {
            this.mana -= amount;
            return true;
        }
        return false;
    }
    
    // Recuperar mana
    recoverMana(amount) {
        this.mana = Math.min(this.maxMana, this.mana + amount);
    }
    
    // Usar stamina
    useStamina(amount) {
        if (this.stamina >= amount) {
            this.stamina -= amount;
            return true;
        }
        return false;
    }
    
    // Recuperar stamina
    recoverStamina(amount) {
        this.stamina = Math.min(this.maxStamina, this.stamina + amount);
    }
    
    // Ganhar ouro
    gainGold(amount) {
        this.gold += amount;
        gameLog(`${this.name} ganhou ${amount} de ouro`);
    }
    
    // Gastar ouro
    spendGold(amount) {
        if (this.gold >= amount) {
            this.gold -= amount;
            return true;
        }
        return false;
    }
    
    // Adicionar item ao inventário
    addItem(item) {
        const existingItem = this.inventory.find(i => i.name === item.name);
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + (item.quantity || 1);
        } else {
            this.inventory.push({ ...item, quantity: item.quantity || 1 });
        }
        gameLog(`${this.name} obteve ${item.name}`);
    }
    
    // Remover item do inventário
    removeItem(itemName, quantity = 1) {
        const item = this.inventory.find(i => i.name === itemName);
        if (item) {
            item.quantity -= quantity;
            if (item.quantity <= 0) {
                this.inventory = this.inventory.filter(i => i.name !== itemName);
            }
            return true;
        }
        return false;
    }
    
    // Usar item
    useItem(itemName) {
        const item = this.inventory.find(i => i.name === itemName);
        if (!item) return null;
        
        let result = null;
        switch(item.type) {
            case 'heal':
                result = this.heal(item.value);
                break;
            case 'mana':
                this.recoverMana(item.value);
                result = item.value;
                break;
            case 'stamina':
                this.recoverStamina(item.value);
                result = item.value;
                break;
        }
        
        this.removeItem(itemName);
        return result;
    }
    
    // Atualizar cooldown de habilidades
    updateAbilityCooldowns() {
        this.abilities.forEach(ability => {
            if (ability.currentCooldown > 0) {
                ability.currentCooldown--;
            }
        });
    }
    
    // Usar habilidade
    useAbility(abilityIndex) {
        const ability = this.abilities[abilityIndex];
        if (!ability) return null;
        
        if (ability.currentCooldown > 0) {
            gameLog(`${ability.name} está em cooldown por ${ability.currentCooldown} turno(s)`);
            return null;
        }
        
        if (!this.useMana(ability.cost)) {
            gameLog(`Mana insuficiente para usar ${ability.name}`);
            return null;
        }
        
        ability.currentCooldown = ability.cooldown;
        gameLog(`${this.name} usou ${ability.name}!`);
        
        return ability;
    }
    
    // Verificar se está vivo
    isAlive() {
        return this.hp > 0;
    }
    
    // Descansar e recuperar
    rest() {
        this.hp = this.maxHp;
        this.mana = this.maxMana;
        this.stamina = this.maxStamina;
        gameLog(`${this.name} descansou e recuperou todas as energias!`);
    }
    
    // Serializar para localStorage
    serialize() {
        return {
            name: this.name,
            className: this.className,
            color: this.color,
            level: this.level,
            exp: this.exp,
            expNeeded: this.expNeeded,
            gold: this.gold,
            maxHp: this.maxHp,
            hp: this.hp,
            maxMana: this.maxMana,
            mana: this.mana,
            maxStamina: this.maxStamina,
            stamina: this.stamina,
            attack: this.attack,
            defense: this.defense,
            speed: this.speed,
            luck: this.luck,
            inventory: this.inventory,
            quests: this.quests,
            completedQuests: this.completedQuests,
            position: this.position
        };
    }
    
    // Desserializar do localStorage
    static deserialize(data) {
        const player = new Player(data.name, data.className, data.color);
        Object.assign(player, data);
        return player;
    }
}

// Variável global do jogador
let currentPlayer = null;
