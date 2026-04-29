// Sistema de Missões

class Quest {
    constructor(id, title, description, type = 'kill', target, reward) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type; // 'kill', 'collect', 'talk', 'explore'
        this.target = target;
        this.reward = reward; // { exp, gold, items }
        this.progress = 0;
        this.maxProgress = target.quantity || 1;
        this.completed = false;
        this.givenBy = '';
    }
    
    updateProgress(amount = 1) {
        this.progress = Math.min(this.progress + amount, this.maxProgress);
        
        if (this.progress >= this.maxProgress) {
            this.completed = true;
            gameLog(`Missão completada: ${this.title}`);
            return true;
        }
        
        return false;
    }
    
    getProgress() {
        return Math.round((this.progress / this.maxProgress) * 100);
    }
    
    getReward() {
        if (this.completed) {
            return this.reward;
        }
        return null;
    }
}

// Missões pré-definidas
const QUESTS = [
    new Quest(
        'quest_goblin_slayer',
        'Caçador de Goblins',
        'Derrote 5 goblins na floresta',
        'kill',
        { type: 'goblin', quantity: 5 },
        { exp: 250, gold: 100, items: [] }
    ),
    
    new Quest(
        'quest_collect_herbs',
        'Ervas Mágicas',
        'Colete 10 ervas mágicas',
        'collect',
        { type: 'magic_herb', quantity: 10 },
        { exp: 200, gold: 150, items: [] }
    ),
    
    new Quest(
        'quest_dragon_slayer',
        'O Dragão da Montanha',
        'Derrote o dragão que assola a região',
        'kill',
        { type: 'dragon', quantity: 1 },
        { exp: 1000, gold: 500, items: ['dragon_scale'] }
    ),
    
    new Quest(
        'quest_explore_caves',
        'Cavernas Misteriosas',
        'Explore as cavernas antigas',
        'explore',
        { type: 'cave', quantity: 3 },
        { exp: 300, gold: 200, items: [] }
    )
];

class QuestLog {
    constructor(player) {
        this.player = player;
    }
    
    acceptQuest(questId) {
        const quest = QUESTS.find(q => q.id === questId);
        if (quest && !this.player.quests.find(q => q.id === questId)) {
            this.player.quests.push({ ...quest });
            gameLog(`${this.player.name} aceitou a missão: ${quest.title}`);
            return true;
        }
        return false;
    }
    
    completeQuest(questId) {
        const quest = this.player.quests.find(q => q.id === questId);
        if (quest && quest.completed) {
            const reward = quest.getReward();
            this.player.gainExp(reward.exp);
            this.player.gainGold(reward.gold);
            
            reward.items.forEach(itemName => {
                this.player.addItem(new Item(itemName, 'quest_reward', '⭐', 0));
            });
            
            this.player.completedQuests.push(quest);
            this.player.quests = this.player.quests.filter(q => q.id !== questId);
            
            gameLog(`Missão completada: ${quest.title}`);
            return true;
        }
        return false;
    }
    
    getActiveQuests() {
        return this.player.quests;
    }
    
    getCompletedQuests() {
        return this.player.completedQuests;
    }
}
