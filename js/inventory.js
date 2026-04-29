// Sistema de Inventário

class Item {
    constructor(name, type, icon, value, rarity = 'comum') {
        this.name = name;
        this.type = type; // 'heal', 'mana', 'stamina', 'weapon', 'armor', 'quest'
        this.icon = icon;
        this.value = value;
        this.rarity = rarity; // 'comum', 'raro', 'épico', 'lendário'
        this.quantity = 1;
    }
}

// Itens pré-definidos
const ITEMS = {
    // Consumíveis
    potion_health: new Item('Poção de Vida', 'heal', '🧪', 30, 'comum'),
    potion_mana: new Item('Poção de Mana', 'mana', '🔵', 30, 'comum'),
    potion_stamina: new Item('Poção de Stamina', 'stamina', '⚡', 25, 'comum'),
    
    bread: new Item('Pão', 'heal', '🍞', 15, 'comum'),
    meat: new Item('Carne Assada', 'heal', '🍖', 25, 'comum'),
    
    // Componentes
    wolf_fang: new Item('Presa de Lobo', 'component', '🦷', 5, 'raro'),
    dragon_scale: new Item('Escama de Dragão', 'component', '🔶', 50, 'épico'),
    spirit_essence: new Item('Essência do Espírito', 'component', '✨', 100, 'lendário'),
    
    // Moedas especiais
    gold: new Item('Ouro', 'currency', '🪙', 1, 'comum'),
};

class Inventory {
    constructor(player) {
        this.player = player;
        this.maxSlots = 30;
    }
    
    addItem(item) {
        if (this.getItemCount() >= this.maxSlots) {
            gameLog('Inventário cheio!');
            return false;
        }
        
        this.player.addItem(item);
        return true;
    }
    
    removeItem(itemName, quantity = 1) {
        return this.player.removeItem(itemName, quantity);
    }
    
    useItem(itemName) {
        return this.player.useItem(itemName);
    }
    
    getItemCount() {
        return this.player.inventory.reduce((total, item) => total + (item.quantity || 1), 0);
    }
    
    getItems() {
        return this.player.inventory;
    }
    
    hasItem(itemName) {
        return this.player.inventory.some(item => item.name === itemName);
    }
    
    getItemQuantity(itemName) {
        const item = this.player.inventory.find(i => i.name === itemName);
        return item ? item.quantity : 0;
    }
}
