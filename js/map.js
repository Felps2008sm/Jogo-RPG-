// Sistema de Mapa

class Location {
    constructor(id, name, description, icon, type = 'forest') {
        this.id = id;
        this.name = name;
        this.description = description;
        this.icon = icon;
        this.type = type; // 'forest', 'cave', 'castle', 'town', 'mountain'
        this.enemies = [];
        this.npcs = [];
        this.items = [];
        this.visited = false;
        this.level = 1;
    }
    
    addEnemy(enemy) {
        this.enemies.push(enemy);
    }
    
    addNPC(npc) {
        this.npcs.push(npc);
    }
    
    addItem(item) {
        this.items.push(item);
    }
    
    getRandomEnemy() {
        return this.enemies[Math.floor(Math.random() * this.enemies.length)];
    }
    
    getRandomNPC() {
        return this.npcs[Math.floor(Math.random() * this.npcs.length)];
    }
}

// Mapa do mundo
const LOCATIONS = [
    new Location('forest_start', 'Floresta do Início', 'Uma floresta tranquila e segura', '🌲', 'forest'),
    new Location('dark_forest', 'Floresta Escura', 'Uma floresta densa e perigosa', '🌲', 'forest'),
    new Location('goblin_cave', 'Caverna dos Goblins', 'Lair dos goblins selvagens', '🕳️', 'cave'),
    new Location('ancient_ruins', 'Ruínas Antigas', 'Restos de uma civilização perdida', '🏛️', 'ruins'),
    new Location('dragon_mountain', 'Montanha do Dragão', 'A moradia do lendário dragão', '⛰️', 'mountain'),
    new Location('magic_tower', 'Torre Mágica', 'Torre do velho mago', '🗼', 'tower'),
    new Location('holy_temple', 'Templo Sagrado', 'Local de poder divino', '⛪', 'temple'),
    new Location('dark_castle', 'Castelo Negro', 'Fortaleza das sombras', '🏰', 'castle')
];

// Inicializar locais com inimigos e NPCs
function initializeLocations() {
    // Floresta do Início
    LOCATIONS[0].addEnemy(new Enemy('Lobo Iniciante', 1, 'wolf'));
    LOCATIONS[0].addEnemy(new Enemy('Ratazana', 1, 'rat'));
    
    // Floresta Escura
    LOCATIONS[1].addEnemy(new Enemy('Lobo Selvagem', 3, 'wolf'));
    LOCATIONS[1].addEnemy(new Enemy('Aranha Gigante', 3, 'spider'));
    
    // Caverna dos Goblins
    LOCATIONS[2].addEnemy(new Enemy('Goblin', 2, 'goblin'));
    LOCATIONS[2].addEnemy(new Enemy('Chefe Goblin', 3, 'goblin'));
    LOCATIONS[2].addNPC(NPCS.merchant);
    
    // Ruínas Antigas
    LOCATIONS[3].addEnemy(new Enemy('Esqueleto', 4, 'skeleton'));
    LOCATIONS[3].addEnemy(new Enemy('Fantasma', 4, 'ghost'));
    LOCATIONS[3].addNPC(NPCS.old_wizard);
    
    // Montanha do Dragão
    LOCATIONS[4].addEnemy(new Enemy('Dragão Antigo', 10, 'dragon'));
    LOCATIONS[4].level = 10;
    
    // Torre Mágica
    LOCATIONS[5].addEnemy(new Enemy('Golem Mágico', 5, 'golem'));
    LOCATIONS[5].addNPC(NPCS.healer);
    
    // Templo Sagrado
    LOCATIONS[6].addNPC(NPCS.blacksmith);
    LOCATIONS[6].addNPC(NPCS.guard);
    
    // Castelo Negro
    LOCATIONS[7].addEnemy(new Enemy('Demônio', 8, 'demon'));
    LOCATIONS[7].addEnemy(new Enemy('Senhor das Sombras', 9, 'demon'));
    LOCATIONS[7].level = 9;
}

class GameMap {
    constructor() {
        this.locations = LOCATIONS;
        this.currentLocation = 0;
    }
    
    initialize() {
        initializeLocations();
    }
    
    getCurrentLocation() {
        return this.locations[this.currentLocation];
    }
    
    travel(locationId) {
        const locationIndex = this.locations.findIndex(l => l.id === locationId);
        if (locationIndex !== -1) {
            this.currentLocation = locationIndex;
            this.locations[this.currentLocation].visited = true;
            gameLog(`${currentPlayer.name} viajou para ${this.locations[this.currentLocation].name}`);
            return true;
        }
        return false;
    }
    
    getAvailableLocations() {
        return this.locations;
    }
}

let gameMap = null;
