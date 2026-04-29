// Jogo Principal

class Game {
    constructor() {
        this.state = 'menu'; // 'menu', 'character_creation', 'playing', 'combat', 'dialog'
        this.gameMap = null;
        this.inventory = null;
        this.questLog = null;
    }
    
    startNewGame(name, className, color, difficulty) {
        currentPlayer = new Player(name, className, color);
        this.gameMap = new GameMap();
        this.gameMap.initialize();
        this.inventory = new Inventory(currentPlayer);
        this.questLog = new QuestLog(currentPlayer);
        
        // Adicionar itens iniciais
        this.inventory.addItem(new Item('Poção de Vida', 'heal', '🧪', 30, 'comum'));
        this.inventory.addItem(new Item('Pão', 'heal', '🍞', 15, 'comum'));
        
        this.state = 'playing';
        gameLog(`Novo jogo iniciado com ${name} (${classToPortuguese(className)})`);
        this.updateUI();
    }
    
    loadGame() {
        const savedData = loadData('game_save');
        if (savedData) {
            currentPlayer = Player.deserialize(savedData.player);
            this.gameMap = new GameMap();
            this.gameMap.initialize();
            this.inventory = new Inventory(currentPlayer);
            this.questLog = new QuestLog(currentPlayer);
            
            this.state = 'playing';
            gameLog(`Jogo carregado: ${currentPlayer.name}`);
            this.updateUI();
            return true;
        }
        return false;
    }
    
    saveGame() {
        if (currentPlayer) {
            saveData('game_save', {
                player: currentPlayer.serialize()
            });
            gameLog('Jogo salvo com sucesso!');
            return true;
        }
        return false;
    }
    
    updateUI() {
        this.updatePlayerDisplay();
        this.updateStats();
        this.updateAbilities();
        this.updateLocation();
        this.updateEventLog();
    }
    
    updatePlayerDisplay() {
        if (!currentPlayer) return;
        
        document.getElementById('playerNameDisplay').textContent = currentPlayer.name;
        document.getElementById('playerLevel').textContent = currentPlayer.level;
        document.getElementById('playerExp').textContent = `${currentPlayer.exp}/${currentPlayer.expNeeded}`;
        document.getElementById('playerGold').textContent = formatNumber(currentPlayer.gold);
        document.getElementById('characterDisplay').textContent = classToEmoji(currentPlayer.className);
        
        // Atualizar barras
        const hpPercent = (currentPlayer.hp / currentPlayer.maxHp) * 100;
        const manaPercent = (currentPlayer.mana / currentPlayer.maxMana) * 100;
        const staminaPercent = (currentPlayer.stamina / currentPlayer.maxStamina) * 100;
        
        document.getElementById('hpBar').style.width = hpPercent + '%';
        document.getElementById('manaBar').style.width = manaPercent + '%';
        document.getElementById('staminaBar').style.width = staminaPercent + '%';
        
        document.getElementById('hpText').textContent = `${currentPlayer.hp}/${currentPlayer.maxHp}`;
        document.getElementById('manaText').textContent = `${currentPlayer.mana}/${currentPlayer.maxMana}`;
        document.getElementById('staminaText').textContent = `${currentPlayer.stamina}/${currentPlayer.maxStamina}`;
    }
    
    updateStats() {
        if (!currentPlayer) return;
        
        document.getElementById('statAttack').textContent = currentPlayer.attack;
        document.getElementById('statDefense').textContent = currentPlayer.defense;
        document.getElementById('statSpeed').textContent = currentPlayer.speed;
        document.getElementById('statLuck').textContent = currentPlayer.luck;
    }
    
    updateAbilities() {
        if (!currentPlayer) return;
        
        const abilitiesList = document.getElementById('abilitiesList');
        abilitiesList.innerHTML = '';
        
        currentPlayer.abilities.forEach((ability, index) => {
            const btn = document.createElement('button');
            btn.className = 'ability-btn';
            if (ability.currentCooldown > 0) btn.classList.add('cooldown');
            btn.innerHTML = `${ability.icon}<br>${ability.name}`;
            btn.title = `Custo: ${ability.cost} Mana\nCooldown: ${ability.cooldown}`;
            btn.onclick = () => this.useAbility(index);
            abilitiesList.appendChild(btn);
        });
    }
    
    updateLocation() {
        if (!this.gameMap) return;
        
        const location = this.gameMap.getCurrentLocation();
        document.getElementById('areaName').textContent = location.name;
        document.getElementById('areaDescription').textContent = location.description;
    }
    
    updateEventLog() {
        // Implementar log de eventos
    }
    
    explore() {
        if (!this.gameMap || !currentPlayer) return;
        
        const location = this.gameMap.getCurrentLocation();
        
        if (Math.random() < 0.6 && location.enemies.length > 0) {
            const enemy = location.getRandomEnemy();
            const actualEnemy = new Enemy(enemy.name, enemy.level, enemy.type);
            this.startCombat(actualEnemy);
        } else if (location.npcs.length > 0) {
            const npc = location.getRandomNPC();
            this.showDialog(npc);
        } else {
            this.addEventLog(`${currentPlayer.name} explorou ${location.name} mas não encontrou nada interessante.`);
        }
    }
    
    startCombat(enemy) {
        currentCombat = new Combat(currentPlayer, enemy);
        this.state = 'combat';
        
        this.showCombatArea();
        this.updateCombatDisplay();
        
        const actionBtn = document.getElementById('combatActions');
        actionBtn.style.display = 'grid';
    }
    
    showCombatArea() {
        document.getElementById('explorationArea').classList.add('hidden');
        document.getElementById('combatArea').classList.remove('hidden');
    }
    
    hideCombatArea() {
        document.getElementById('explorationArea').classList.remove('hidden');
        document.getElementById('combatArea').classList.add('hidden');
    }
    
    updateCombatDisplay() {
        if (!currentCombat) return;
        
        document.getElementById('enemyName').textContent = currentCombat.enemy.name;
        
        const playerHpPercent = (currentCombat.player.hp / currentCombat.player.maxHp) * 100;
        const enemyHpPercent = (currentCombat.enemy.hp / currentCombat.enemy.maxHp) * 100;
        
        document.querySelector('#playerCombatHP .bar-fill').style.width = playerHpPercent + '%';
        document.querySelector('#enemyCombatHP .bar-fill').style.width = enemyHpPercent + '%';
        
        this.updateCombatLog();
    }
    
    updateCombatLog() {
        if (!currentCombat) return;
        
        const logElement = document.getElementById('combatLog');
        logElement.innerHTML = '';
        
        currentCombat.log.slice(-10).forEach(entry => {
            const div = document.createElement('div');
            div.className = `log-entry ${entry.type}`;
            div.textContent = entry.message;
            logElement.appendChild(div);
        });
        
        logElement.scrollTop = logElement.scrollHeight;
    }
    
    combatAttack() {
        if (!currentCombat) return;
        
        currentCombat.playerAttack();
        this.updateCombatDisplay();
        
        if (currentCombat.gameOver) {
            this.endCombat();
            return;
        }
        
        setTimeout(() => {
            currentCombat.nextTurn();
            this.updateCombatDisplay();
            
            if (currentCombat.gameOver) {
                this.endCombat();
            }
        }, 1000);
    }
    
    combatDefend() {
        if (!currentCombat) return;
        
        currentCombat.playerDefend();
        this.updateCombatDisplay();
        
        setTimeout(() => {
            currentCombat.nextTurn();
            this.updateCombatDisplay();
            
            if (currentCombat.gameOver) {
                this.endCombat();
            }
        }, 1000);
    }
    
    endCombat() {
        if (!currentCombat) return;
        
        setTimeout(() => {
            this.hideCombatArea();
            this.updatePlayerDisplay();
            this.state = 'playing';
            currentCombat = null;
        }, 1500);
    }
    
    showDialog(npc) {
        this.state = 'dialog';
        document.getElementById('explorationArea').classList.add('hidden');
        document.getElementById('dialogArea').classList.remove('hidden');
        
        document.getElementById('npcName').textContent = npc.name;
        document.getElementById('npcDisplay').textContent = npc.icon;
        document.getElementById('npcDialog').textContent = npc.dialog;
        
        document.getElementById('dialogChoices').innerHTML = '';
    }
    
    hideDialog() {
        document.getElementById('explorationArea').classList.remove('hidden');
        document.getElementById('dialogArea').classList.add('hidden');
        this.state = 'playing';
    }
    
    addEventLog(message) {
        const logElement = document.getElementById('eventLog');
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.textContent = message;
        logElement.appendChild(entry);
        logElement.scrollTop = logElement.scrollHeight;
    }
    
    useAbility(index) {
        if (this.state !== 'combat' || !currentCombat) return;
        
        currentCombat.playerUseAbility(index);
        this.updateCombatDisplay();
        this.updatePlayerDisplay();
        
        if (currentCombat.gameOver) {
            this.endCombat();
            return;
        }
        
        setTimeout(() => {
            currentCombat.nextTurn();
            this.updateCombatDisplay();
            
            if (currentCombat.gameOver) {
                this.endCombat();
            }
        }, 1000);
    }
    
    rest() {
        if (!currentPlayer) return;
        
        currentPlayer.rest();
        this.updatePlayerDisplay();
        this.addEventLog(`${currentPlayer.name} descansou e se recuperou!`);
    }
}

let game = null;

// Inicializar quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    game = new Game();
    setupEventListeners();
});

function setupEventListeners() {
    // Menu Principal
    document.getElementById('newGameBtn').addEventListener('click', showCharacterCreation);
    document.getElementById('loadGameBtn').addEventListener('click', () => {
        if (game.loadGame()) {
            showGameContainer();
        } else {
            alert('Nenhum jogo salvo encontrado!');
        }
    });
    
    // Criação de Personagem
    document.getElementById('confirmCharBtn').addEventListener('click', createCharacter);
    document.getElementById('backToMenuBtn').addEventListener('click', () => {
        hideCharacterCreation();
        showMainMenu();
    });
    
    // Exploração
    document.getElementById('exploreBtn').addEventListener('click', () => game.explore());
    document.getElementById('restBtn').addEventListener('click', () => game.rest());
    
    // Combate
    document.getElementById('attackBtn').addEventListener('click', () => game.combatAttack());
    document.getElementById('defendBtn').addEventListener('click', () => game.combatDefend());
    
    // Modais
    document.getElementById('inventoryBtn').addEventListener('click', showInventoryModal);
    document.getElementById('mapBtn').addEventListener('click', showMapModal);
    document.getElementById('questsBtn').addEventListener('click', showQuestsModal);
    
    // Fechar modais
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
}

// Funções de UI
function showMainMenu() {
    document.getElementById('mainMenu').classList.add('active');
}

function hideMainMenu() {
    document.getElementById('mainMenu').classList.remove('active');
}

function showCharacterCreation() {
    hideMainMenu();
    document.getElementById('characterCreation').classList.add('active');
}

function hideCharacterCreation() {
    document.getElementById('characterCreation').classList.remove('active');
}

function showGameContainer() {
    hideMainMenu();
    hideCharacterCreation();
    document.getElementById('gameContainer').classList.add('active');
}

function hideGameContainer() {
    document.getElementById('gameContainer').classList.remove('active');
}

function createCharacter() {
    const name = document.getElementById('playerName').value;
    const className = document.getElementById('playerClass').value;
    const color = document.getElementById('playerColor').value;
    const difficulty = document.getElementById('difficulty').value;
    
    if (!name.trim()) {
        alert('Digite um nome para seu personagem!');
        return;
    }
    
    game.startNewGame(name, className, color, difficulty);
    showGameContainer();
}

function showInventoryModal() {
    const modal = document.getElementById('inventoryModal');
    const grid = document.getElementById('inventoryGrid');
    grid.innerHTML = '';
    
    if (game.inventory && game.inventory.getItems().length > 0) {
        document.getElementById('emptyInventory').style.display = 'none';
        
        game.inventory.getItems().forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'inventory-item';
            itemDiv.innerHTML = `
                <div class="item-icon">${item.icon}</div>
                <div class="item-name">${item.name}</div>
                <div class="item-quantity">x${item.quantity}</div>
            `;
            itemDiv.addEventListener('click', () => {
                if (item.type === 'heal' || item.type === 'mana') {
                    game.inventory.useItem(item.name);
                    game.updateUI();
                    showInventoryModal();
                }
            });
            grid.appendChild(itemDiv);
        });
    } else {
        document.getElementById('emptyInventory').style.display = 'block';
    }
    
    modal.classList.add('active');
}

function showMapModal() {
    const modal = document.getElementById('mapModal');
    const mapDiv = document.getElementById('gameMap');
    mapDiv.innerHTML = '';
    
    if (game.gameMap) {
        game.gameMap.getAvailableLocations().forEach(location => {
            const tile = document.createElement('div');
            tile.className = 'map-tile';
            if (location.visited) tile.classList.add('visited');
            
            tile.innerHTML = `
                <div class="map-tile-icon">${location.icon}</div>
                <div class="map-tile-name">${location.name}</div>
            `;
            
            tile.addEventListener('click', () => {
                game.gameMap.travel(location.id);
                game.updateLocation();
                closeModal();
            });
            
            mapDiv.appendChild(tile);
        });
    }
    
    modal.classList.add('active');
}

function showQuestsModal() {
    const modal = document.getElementById('questsModal');
    const activeDiv = document.getElementById('activeQuests');
    const completedDiv = document.getElementById('completedQuests');
    
    activeDiv.innerHTML = '';
    completedDiv.innerHTML = '';
    
    if (game.questLog) {
        const activeQuests = game.questLog.getActiveQuests();
        const completedQuests = game.questLog.getCompletedQuests();
        
        if (activeQuests.length > 0) {
            activeQuests.forEach(quest => {
                const questDiv = document.createElement('div');
                questDiv.className = 'quest-item';
                questDiv.innerHTML = `
                    <h4>${quest.title}</h4>
                    <p>${quest.description}</p>
                    <div class="quest-progress">
                        <div class="bar-fill" style="width: ${quest.getProgress()}%"></div>
                    </div>
                    <p style="font-size: 0.8rem; margin-top: 0.5rem;">${quest.progress}/${quest.maxProgress}</p>
                `;
                activeDiv.appendChild(questDiv);
            });
        } else {
            activeDiv.innerHTML = '<p style="text-align: center; color: var(--secondary-color);">Nenhuma missão ativa</p>';
        }
        
        if (completedQuests.length > 0) {
            completedQuests.forEach(quest => {
                const questDiv = document.createElement('div');
                questDiv.className = 'quest-item';
                questDiv.style.opacity = '0.7';
                questDiv.innerHTML = `
                    <h4>✓ ${quest.title}</h4>
                    <p>Recompensa: ${quest.reward.exp} EXP, ${quest.reward.gold} Ouro</p>
                `;
                completedDiv.appendChild(questDiv);
            });
        } else {
            completedDiv.innerHTML = '<p style="text-align: center; color: var(--secondary-color);">Nenhuma missão completada</p>';
        }
    }
    
    modal.classList.add('active');
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// Tabs de missões
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-btn')) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        e.target.classList.add('active');
        const tabId = e.target.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    }
});

// Teclado de atalhos
document.addEventListener('keydown', (e) => {
    if (game.state === 'playing') {
        switch(e.key.toLowerCase()) {
            case 'i':
                showInventoryModal();
                break;
            case 'm':
                showMapModal();
                break;
            case 'q':
                showQuestsModal();
                break;
        }
    }
});
